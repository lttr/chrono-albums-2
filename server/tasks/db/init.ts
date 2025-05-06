export default defineTask({
  meta: {
    name: "db:init",
    description: "Run database initialization",
  },
  async run({ payload, context }) {
    const db = useDatabase()
    // Drop existing table if needed for clean initialization
    // await db.sql`DROP TABLE IF EXISTS media`

    // Create the media table with proper constraints
    await db.sql`
      CREATE TABLE IF NOT EXISTS media (
        album TEXT,
        createdAt DATETIME NOT NULL DEFAULT (datetime('now')),
        dateTaken DATETIME,
        fileName TEXT,
        fileSize INTEGER,
        height INTEGER,
        id TEXT PRIMARY KEY NOT NULL,
        kind TEXT CHECK(kind IN ('video', 'image')),
        locationAlt REAL,
        locationLat REAL,
        locationLng REAL,
        mimeType TEXT,
        updatedAt DATETIME NOT NULL DEFAULT (datetime('now')),
        width INTEGER
      )
    `

    // Create the album table based on the ZodSchema
    await db.sql`
      CREATE TABLE IF NOT EXISTS album (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL CHECK(length(title) >= 3 AND length(title) <= 70),
        month INTEGER NOT NULL CHECK(month >= 1 AND month <= 12),
        year INTEGER NOT NULL,
        category TEXT NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT (datetime('now'))
      )
    `

    // Create indexes for common query patterns
    await db.sql`CREATE INDEX IF NOT EXISTS idx_media_kind ON media(kind)`
    await db.sql`CREATE INDEX IF NOT EXISTS idx_media_album ON media(album)`
    await db.sql`CREATE INDEX IF NOT EXISTS idx_media_dateTaken ON media(dateTaken)`
    await db.sql`CREATE INDEX IF NOT EXISTS idx_album_year ON album(year)`
    await db.sql`CREATE INDEX IF NOT EXISTS idx_album_category ON album(category)`

    // Add trigger to update the updatedAt timestamp automatically
    await db.sql`
      CREATE TRIGGER IF NOT EXISTS update_media_timestamp 
      AFTER UPDATE ON media
      BEGIN
        UPDATE media SET updatedAt = datetime('now') WHERE id = NEW.id;
      END
    `

    return { result: "Success" }
  },
})
