# Background Job Architecture

## Problem

Media processing (image variant generation, video transcoding) is CPU-intensive and slow. Current implementation processes synchronously during upload, blocking the HTTP response until all variants are generated.

**Issues with sync processing:**

- Upload latency increases with image size (2-10s per image)
- Batch uploads timeout or feel sluggish
- Server resources tied up during request lifecycle
- No retry mechanism if processing fails
- No visibility into processing status

## Usage Pattern

Burst uploads followed by quiet periods with reads:

- User uploads many images at once (10-100+)
- Then no uploads for days/weeks
- Frequent read traffic during quiet periods

This pattern favors aggressive processing during bursts and minimal overhead during quiet periods.

## Requirements

| Requirement                            | Priority                    |
| -------------------------------------- | --------------------------- |
| Fast upload response                   | High                        |
| Jobs survive server restart            | High                        |
| Retry failed jobs                      | Medium                      |
| Job status visibility                  | Medium                      |
| No external dependencies (Redis, etc.) | Nice-to-have                |
| Scalable to multiple workers           | Low (single server for now) |

## Options

### 1. Synchronous Processing (Current)

Process during upload request.

```
Client → Upload → [Generate variants] → Response
                  ↑ blocks 2-10s
```

**Pros:**

- Simple, no moving parts
- Response includes all variant URLs immediately
- No job state to manage

**Cons:**

- Slow uploads (2-10s per image)
- Batch uploads painful
- No retry on failure
- Resources tied to request

**When appropriate:** Small-scale apps, <10 uploads/day, simple requirements.

---

### 2. Nitro Tasks (In-Process)

Defer processing to scheduled Nitro task. No persistence.

```
Client → Upload → Store original → Response (fast)
                         ↓
              Nitro Task (scheduled) → Generate variants
```

**Pros:**

- Built into Nitro/Nuxt
- No external dependencies
- Fast upload response

**Cons:**

- **Jobs lost on restart** - no persistence
- Single instance per task name
- Experimental API (stable in Nuxt 5, Q4 2025)
- No retry logic built-in
- Limited platform support (no Vercel, no Netlify)

**When appropriate:** Non-critical background work where losing jobs is acceptable (cache warming, cleanup tasks).

---

### 3. SQLite-Backed Queue (Recommended)

Store job state in database. Process via polling task.

```
Client → Upload → Store original → Insert job row → Response (fast)
                                          ↓
                         Nitro Task (polls DB) → Process job → Update row
```

**Pros:**

- Jobs survive restart (state in SQLite)
- Built-in retry (track attempts)
- Job visibility (query the table)
- No external dependencies
- Works with existing stack

**Cons:**

- Polling adds slight latency (job waits for next poll cycle)
- Must handle "stuck" jobs (processing but worker died)
- Single worker (no distributed locking)

**Schema:**

```sql
CREATE TABLE media_job (
  id TEXT PRIMARY KEY,
  media_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, processing, completed, failed
  source_path TEXT NOT NULL,
  error TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  started_at INTEGER,
  completed_at INTEGER
);
CREATE INDEX idx_media_job_status ON media_job(status);
```

**Handling stuck jobs:**

```sql
-- Reset jobs stuck in "processing" for >2 minutes
UPDATE media_job
SET status = 'pending', started_at = NULL
WHERE status = 'processing'
  AND started_at < unixepoch() - 120;
```

**When appropriate:** Projects using SQLite where job persistence matters but external services are undesirable.

---

### 4. BullMQ + Redis

Production-grade job queue with Redis backend.

```
Client → Upload → Store original → Add to Redis queue → Response (fast)
                                           ↓
                              Worker process → Process job → Update DB
```

**Pros:**

- Battle-tested, production-ready
- Persistent (Redis persistence)
- Retries, delays, priorities, rate limiting
- Job visibility (Bull Board UI)
- Scales to multiple workers
- Handles distributed locking

**Cons:**

- Requires Redis (new infrastructure)
- More operational complexity
- Overkill for small-scale use
- Memory usage for large queues

**Dependencies:**

```bash
pnpm add bullmq ioredis
# Redis server required
```

**When appropriate:** Production apps with high throughput, multiple workers, or existing Redis infrastructure.

---

### 5. Cloudflare Queues (NuxtHub)

Native queue service on Cloudflare Workers.

```
Client → Upload → Store in R2 → Send to Queue → Response (fast)
                                       ↓
                          Queue consumer → Process → Store variants
```

**Pros:**

- Native to Cloudflare (if using NuxtHub)
- Persistent, reliable
- Scales automatically
- Batching and retries built-in
- No Redis required

**Cons:**

- Cloudflare-only (vendor lock-in)
- Must deploy to Workers
- Queue consumer runs in Workers context (CPU limits)

**When appropriate:** Projects deployed on NuxtHub/Cloudflare Workers.

---

## Comparison Matrix

| Feature          | Sync | Nitro Tasks | SQLite Queue | BullMQ     | CF Queues    |
| ---------------- | ---- | ----------- | ------------ | ---------- | ------------ |
| Fast upload      | No   | Yes         | Yes          | Yes        | Yes          |
| Survives restart | N/A  | No          | Yes          | Yes        | Yes          |
| Retries          | No   | No          | Manual       | Built-in   | Built-in     |
| Job visibility   | No   | No          | Query DB     | Bull Board | CF Dashboard |
| External deps    | None | None        | None         | Redis      | Cloudflare   |
| Multi-worker     | N/A  | No          | No\*         | Yes        | Yes          |
| Complexity       | Low  | Low         | Medium       | High       | Medium       |

\*SQLite queue can support multiple workers with row-level locking, but requires careful implementation.

## Recommendation

**For this project: SQLite-backed queue (#3)**

Rationale:

- Already using SQLite via Drizzle
- No external dependencies to manage
- Jobs persist across deploys
- Matches project's "keep it simple" philosophy
- Can migrate to BullMQ later if needed

## Design Decisions

| Parameter     | Value    | Rationale                                                                                                 |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| Poll interval | 10s      | Fast enough for bursts. One cheap `SELECT ... LIMIT 10` per 10s is negligible. Empty queue = fast return. |
| Batch size    | 10 jobs  | Image processing ~2-5s each → 20-50s per batch. Clears bursts quickly. Stays under 2min task timeout.     |
| Stuck timeout | 2 min    | Image processing should finish in <30s. 2 min covers edge cases.                                          |
| Max attempts  | 3        | Fail permanently after 3 tries. Prevents infinite retry loops.                                            |
| Job retention | 7 days   | Delete completed jobs after 7 days. Keeps DB small, allows debugging recent issues.                       |
| Video queue   | Separate | Video transcoding takes minutes vs seconds for images. Different timeouts, won't block image processing.  |

## Architecture

### Trigger-on-Upload Pattern

Don't rely solely on polling. Trigger processing immediately on upload, with polling as fallback.

```
Upload → Store blob → Insert job → runTask('media:process') → Response (fast)
                                           ↓
                              Task processes batch of 10
                                           ↓
                              More pending? → runTask again (self-chain)
                              Empty? → done, wait for next poll/upload
```

Benefits:

- Burst uploads start processing immediately
- Self-chaining clears queue without waiting for poll cycles
- Scheduled polling catches missed jobs (restart recovery)
- Quiet periods = polling finds nothing, returns instantly

### Separate Queues

```
media_job         → image variants (seconds per job)
video_job         → video transcoding (minutes per job)
```

Different tables, different tasks, different timeouts:

| Queue       | Task              | Batch | Timeout | Poll |
| ----------- | ----------------- | ----- | ------- | ---- |
| `media_job` | `media:process`   | 10    | 2 min   | 10s  |
| `video_job` | `video:transcode` | 1     | 30 min  | 60s  |

## Implementation Outline

### Phase 1: Image Queue

1. Add `media_job` table with Drizzle schema
2. Modify upload to store original blob + insert pending job
3. Upload triggers `runTask('media:process')` immediately
4. Create `server/tasks/media/process.ts`:
   - Fetch batch of 10 pending jobs
   - Process each (generate variants, update media record)
   - Mark completed or failed
   - If more pending, chain `runTask('media:process')`
5. Schedule task every 10s as fallback
6. Frontend shows "processing" indicator for pending media

### Phase 2: Error Handling

1. Track attempts, cap at 3
2. Stuck job recovery task (reset jobs in "processing" >2 min)
3. Failed job visibility in admin UI
4. Cleanup task: delete completed jobs older than 7 days

### Phase 3: Video Queue (Later)

1. Add `video_job` table
2. Separate `video:transcode` task with 30 min timeout
3. Video upload inserts job, triggers task
4. Process one video at a time (CPU intensive)

### Phase 4: Status API (Optional)

1. `GET /api/jobs/:mediaId` returns job status
2. Frontend polls during "processing" state
3. SSE for real-time updates (future enhancement)
