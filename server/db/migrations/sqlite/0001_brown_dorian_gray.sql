-- Add slug columns (nullable first for SQLite compatibility)
ALTER TABLE `album` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `category` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `media` ADD `slug` text;--> statement-breakpoint
ALTER TABLE `project` ADD `slug` text;--> statement-breakpoint

-- Backfill slugs with UUIDs (without dashes)
UPDATE `album` SET `slug` = lower(hex(randomblob(16))) WHERE `slug` IS NULL;--> statement-breakpoint
UPDATE `category` SET `slug` = lower(hex(randomblob(16))) WHERE `slug` IS NULL;--> statement-breakpoint
UPDATE `media` SET `slug` = lower(hex(randomblob(16))) WHERE `slug` IS NULL;--> statement-breakpoint
UPDATE `project` SET `slug` = lower(hex(randomblob(16))) WHERE `slug` IS NULL;--> statement-breakpoint

-- Create unique indexes
CREATE UNIQUE INDEX `album_slug_unique` ON `album` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `category_slug_unique` ON `category` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `media_slug_unique` ON `media` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `project_slug_unique` ON `project` (`slug`);
