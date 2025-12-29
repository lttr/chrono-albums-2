import { sql } from "drizzle-orm"
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { media } from "./media"

export const job = sqliteTable(
  "job",
  {
    id: text("id").primaryKey(),
    mediaId: text("media_id")
      .notNull()
      .references(() => media.id, { onDelete: "cascade" }),
    type: text("type", { enum: ["video_transcode"] }).notNull(),
    status: text("status", {
      enum: ["pending", "processing", "completed", "failed"],
    })
      .notNull()
      .default("pending"),
    sourcePath: text("source_path").notNull(),
    targetPath: text("target_path").notNull(),
    error: text("error"),
    attempts: integer("attempts").notNull().default(0),
    maxAttempts: integer("max_attempts").notNull().default(3),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(unixepoch())`),
    startedAt: integer("started_at", { mode: "timestamp" }),
    completedAt: integer("completed_at", { mode: "timestamp" }),
  },
  (table) => [
    index("idx_job_status").on(table.status),
    index("idx_job_media_id").on(table.mediaId),
  ],
)

export const jobSelectSchema = createSelectSchema(job)
export const jobInsertSchema = createInsertSchema(job)
