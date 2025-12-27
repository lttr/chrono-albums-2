# Phase 1: Image Pipeline Foundation - Detailed Implementation Plan

## Overview

Phase 1 establishes server-side image variant generation and enhanced media API.

**Current state:**

- Client-side only: HEIC→JPEG, compression (3000px max, 0.85 quality)
- Single file stored as `{id}.jpeg` in blob
- No variant columns in DB schema
- No cache headers on serving routes

**Target state:**

- Server-side Sharp processing generates 4 variants
- DB stores LQIP and paths for each variant
- API returns variant URLs with proper cache headers

---

## 1. Image Variant Pipeline

### 1.1 Add Sharp Dependency

```bash
pnpm add sharp
```

- [ ] Install sharp
- [ ] Verify Sharp works in local dev (`nr dev`)
- [ ] Test Sharp in NuxtHub preview deployment (Workers compatibility check)

**Risk:** Cloudflare Workers may not support native Sharp binaries. Fallback: IPX provider via `@nuxt/image`.

---

### 1.2 Create Variant Generation Service

**File:** `server/utils/image-variants.ts`

```typescript
import sharp from "sharp"

export interface ImageVariants {
  original: Buffer // 3500px max, JPEG 92
  full: Buffer // 2000px, progressive JPEG (mozjpeg)
  thumbnail: Buffer // 600px, WebP
  lqip: string // 20px, base64 data URI
}

export interface VariantMetadata {
  width: number
  height: number
}

export async function generateVariants(input: Buffer): Promise<{
  variants: ImageVariants
  metadata: VariantMetadata
}>
```

**Tasks:**

- [ ] Create `server/utils/image-variants.ts`
- [ ] Implement `generateVariants()` function:
  - [ ] Original: resize 3500px max, JPEG quality 92
  - [ ] Full: resize 2000px, progressive JPEG with mozjpeg
  - [ ] Thumbnail: resize 600px, WebP quality 75
  - [ ] LQIP: resize 20px, JPEG quality 60, convert to base64 data URI
- [ ] Extract and return final dimensions from Sharp metadata
- [ ] Add error handling for corrupt/unsupported images
- [ ] Write unit tests for variant generation

**Sharp API reference:**

```typescript
// Original
sharp(buffer)
  .resize(3500, 3500, { fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 92 })

// Full (progressive mozjpeg)
sharp(buffer)
  .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 85, progressive: true, mozjpeg: true })

// Thumbnail (WebP)
sharp(buffer)
  .resize(600, 600, { fit: "inside", withoutEnlargement: true })
  .webp({ quality: 75 })

// LQIP
const lqipBuffer = await sharp(buffer)
  .resize(20)
  .jpeg({ quality: 60 })
  .toBuffer()
const lqip = `data:image/jpeg;base64,${lqipBuffer.toString("base64")}`
```

---

### 1.3 Update Database Schema

**File:** `server/db/schema/media.ts`

Add columns:

| Column          | Type | Purpose                              |
| --------------- | ---- | ------------------------------------ |
| `lqip`          | text | Base64 data URI for blur placeholder |
| `thumbnailPath` | text | Blob path to WebP thumbnail          |
| `fullPath`      | text | Blob path to progressive JPEG        |

**Tasks:**

- [ ] Add `lqip`, `thumbnailPath`, `fullPath` columns to media schema
- [ ] Run `nr db:generate` to create migration
- [ ] Run `nr db:migrate` to apply migration
- [ ] Update `mediaInsertSchema` Zod schema to include new fields
- [ ] Update `shared/types/media.ts` if needed

**Schema addition:**

```typescript
lqip: text("lqip"),
thumbnailPath: text("thumbnail_path"),
fullPath: text("full_path"),
```

---

### 1.4 Update Upload Endpoint

**File:** `server/api/upload.post.ts`

Current flow: Receive file → validate → store as `{id}.jpeg`

New flow: Receive file → validate → generate variants → store 3 files → return paths

**Tasks:**

- [ ] Import `generateVariants` from `server/utils/image-variants.ts`
- [ ] After validation, call `generateVariants(buffer)` for images
- [ ] Store variants to blob with naming convention:
  - Original: `photos/{id}-original.jpg`
  - Full: `photos/{id}-full.jpg`
  - Thumbnail: `photos/{id}-thumb.webp`
- [ ] Return variant paths and LQIP in response
- [ ] Update response type to include `lqip`, `thumbnailPath`, `fullPath`
- [ ] Handle videos separately (skip variant generation for now)
- [ ] Update client `MediaUploader.vue` to use new response fields when posting metadata

**Blob storage pattern:**

```typescript
await Promise.all([
  blob.put(`photos/${id}-original.jpg`, variants.original, {
    addRandomSuffix: false,
  }),
  blob.put(`photos/${id}-full.jpg`, variants.full, { addRandomSuffix: false }),
  blob.put(`photos/${id}-thumb.webp`, variants.thumbnail, {
    addRandomSuffix: false,
  }),
])
```

---

## 2. Media API Enhancement

### 2.1 Update Album API Response

**File:** `server/api/albums/by-slug/[slug].get.ts`

Add variant URLs to media response shape.

**Tasks:**

- [ ] Add `lqip`, `thumbnailPath`, `fullPath` to media select query
- [ ] Transform paths to full URLs in response:
  ```typescript
  thumbnailUrl: `/photos/${media.id}-thumb.webp`
  fullUrl: `/photos/${media.id}-full.jpg`
  ```
- [ ] Update response type documentation

**Target response shape:**

```typescript
interface MediaItem {
  id: string
  slug: string
  kind: "image" | "video"
  width: number
  height: number
  lqip: string // base64 data URI
  thumbnailUrl: string // /photos/{id}-thumb.webp
  fullUrl: string // /photos/{id}-full.jpg
  dateTaken: string | null
}
```

---

### 2.2 Add Variant Serving Route

**File:** `server/routes/photos/[...path].ts`

Serve variant files from blob with immutable cache headers.

**Tasks:**

- [ ] Create `server/routes/photos/[...path].ts`
- [ ] Implement blob.serve() with cache headers
- [ ] Set `Cache-Control: public, max-age=31536000, immutable`
- [ ] Handle 404 for missing files

**Implementation:**

```typescript
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, "path")

  setHeader(event, "Cache-Control", "public, max-age=31536000, immutable")

  return hubBlob().serve(event, `photos/${path}`)
})
```

---

### 2.3 Update Existing Media Route

**File:** `server/routes/m/[slug].ts`

- [ ] Add cache headers to existing route
- [ ] Consider deprecating in favor of direct `/photos/` paths

---

## Files to Modify/Create

| File                                            | Action |
| ----------------------------------------------- | ------ |
| `server/utils/image-variants.ts`                | Create |
| `server/db/schema/media.ts`                     | Modify |
| `server/api/upload.post.ts`                     | Modify |
| `server/api/albums/by-slug/[slug].get.ts`       | Modify |
| `server/routes/photos/[...path].ts`             | Create |
| `server/routes/m/[slug].ts`                     | Modify |
| `app/components/media-upload/MediaUploader.vue` | Modify |
| `shared/types/media.ts`                         | Modify |

---

## Testing Checklist

- [ ] Unit test: variant generation produces correct sizes
- [ ] Unit test: LQIP is valid base64 data URI
- [ ] Integration test: upload creates 3 blob files
- [ ] Integration test: API returns variant URLs
- [ ] E2E test: variant URLs return images with correct cache headers
- [ ] Manual test: verify in NuxtHub preview deployment

---

## Verification

After Phase 1 completion:

```bash
nr verify        # Lint, format, typecheck
nr test          # Run tests
nr dev           # Test upload flow locally
```

Deploy to NuxtHub preview to verify Sharp compatibility.

---

## Decisions

1. **Sharp fallback** → Yes, use IPX on-demand processing if Sharp fails in Workers
2. **Storage path** → `photos/{id}-original.jpg` (all variants in same folder)
3. **Existing media** → No migration needed (no existing media)
