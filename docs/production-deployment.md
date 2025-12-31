# Production Deployment

Coolify-managed Node.js server running in Docker on VPS.

## Storage Architecture

### Host (VPS)

```
/data/coolify/applications/<app-id>/
├── docker-compose.yaml
├── README.md
└── data/                    ← persistent storage
    ├── db/sqlite.db         ← SQLite database
    ├── blob/                ← uploaded media
    └── temp/
```

### Container (Docker)

```
/app/                        ← Nuxt app root
├── .output/                 ← built app
└── .data/                   ← mounted from host
    ├── db/sqlite.db
    ├── blob/
    └── temp/
```

## Coolify Directory Mount

|                        | Path                                       |
| ---------------------- | ------------------------------------------ |
| **Source** (host)      | `/data/coolify/applications/<app-id>/data` |
| **Target** (container) | `/app/.data`                               |

## Setup

1. Create data directory on host:

   ```bash
   mkdir -p /data/coolify/applications/<app-id>/data
   ```

2. In Coolify: Service → Storages → Add → Directory Mount
   - Source: `/data/coolify/applications/<app-id>/data`
   - Target: `/app/.data`

3. Redeploy

## Result

- App writes to `/app/.data` inside container
- Data persists at `/data/coolify/applications/<app-id>/data` on host
- Survives redeployments

## Backup

Coolify doesn't backup volumes automatically. Options:

- `rsync` the host data directory to remote storage
- Cron job with `tar` + S3 upload
- Duplicati container
