# Data Model

```
┌─────────────┐
│   Project   │
│─────────────│
│ id          │
│ name        │
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
                        │ id          │
                        │ albumId     │
                        │ fileName    │
                        │ kind        │  ← "image" | "video"
                        │ EXIF data   │  ← dimensions, GPS, date
                        └─────────────┘
```

## Relationships

- **Project** is top-level container
- **Category** groups albums within a project (optional)
- **Album** has year/month + belongs to project (directly) and optionally a category
- **Media** stores files with metadata (EXIF, GPS, dimensions)
