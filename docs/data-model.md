# Data Model

## Content

```
┌─────────────┐
│   Project   │
│─────────────│
│ id          │
│ name        │
│ slug        │
│ createdAt   │
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────┐         ┌─────────────┐
│  Category   │◄────────│    Album    │
│─────────────│  N:1    │─────────────│
│ id          │ (opt)   │ id          │
│ name        │         │ title       │
│ slug        │         │ slug        │
│ projectId ──┼─────────│ projectId ──┼──► Project (1:N)
└──────┬──────┘         │ categoryId  │
       │                │ year, month │
       │ 1:N            └──────┬──────┘
       ▼                       │
   (albums)                    │ 1:N
                               ▼
                        ┌─────────────┐
                        │    Media    │
                        │─────────────│
                        │ id, slug    │
                        │ albumId     │
                        │ fileName    │
                        │ kind        │  ← "image" | "video"
                        │ mimeType    │
                        │ width/height│
                        │ dateTaken   │
                        │ GPS coords  │  ← lat, lon, alt
                        │ lqip        │  ← base64 blur placeholder
                        │ *Path       │  ← thumbnail, full, original
                        │ (video)     │  ← posterPath, webPath, duration
                        │ processing  │  ← 0=ready, 1=transcoding, -1=failed
                        └──────┬──────┘
                               │
                               │ 1:N (video only)
                               ▼
                        ┌─────────────┐
                        │     Job     │
                        │─────────────│
                        │ id          │
                        │ mediaId     │
                        │ type        │  ← "video_transcode"
                        │ status      │  ← pending/processing/completed/failed
                        │ source/target│
                        │ attempts    │
                        └─────────────┘
```

## Auth & Access

```
┌─────────────┐          ┌───────────────────┐          ┌─────────────┐
│    User     │          │ ProjectMembership │          │   Project   │
│─────────────│          │───────────────────│          │─────────────│
│ id          │◄─────────│ userId            │          │ id          │
│ name        │          │ projectId ────────┼─────────►│ name        │
│ email       │          │ role              │          │ ...         │
│ image       │          └───────────────────┘          └─────────────┘
└──────┬──────┘
       │                   role: "owner" | "member"
       │ 1:N
       ▼
┌─────────────┐          ┌─────────────┐
│   Session   │          │   Account   │
│─────────────│          │─────────────│
│ id          │          │ id          │
│ userId      │          │ userId      │
│ token       │          │ providerId  │  ← "google"
│ expiresAt   │          │ accountId   │
│ ipAddress   │          │ tokens...   │
│ userAgent   │          └─────────────┘
└─────────────┘
```

## Relationships

- **Project** is top-level container
- **Category** groups albums within a project (optional)
- **Album** has year/month + belongs to project (directly) and optionally a category
- **Media** stores files with metadata (EXIF, GPS, dimensions, variant paths)
- **Job** tracks async processing tasks (video transcoding)
- **User** authenticates via Google OAuth
- **Session** tracks active logins with device info
- **Account** links OAuth providers to users
- **ProjectMembership** links users to projects with a role
