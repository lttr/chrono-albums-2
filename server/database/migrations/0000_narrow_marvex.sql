CREATE TABLE `album` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`month` integer NOT NULL,
	`year` integer NOT NULL,
	`category` text NOT NULL,
	`createdAt` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_album_year` ON `album` (`year`);--> statement-breakpoint
CREATE INDEX `idx_album_category` ON `album` (`category`);--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`album` text,
	`createdAt` text NOT NULL,
	`dateTaken` text,
	`fileName` text,
	`fileSize` integer,
	`height` integer,
	`width` integer,
	`kind` text NOT NULL,
	`locationLat` text,
	`locationLng` text,
	`locationAlt` text,
	`mimeType` text,
	`updatedAt` text NOT NULL,
	FOREIGN KEY (`album`) REFERENCES `album`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_media_kind` ON `media` (`kind`);--> statement-breakpoint
CREATE INDEX `idx_media_album` ON `media` (`album`);--> statement-breakpoint
CREATE INDEX `idx_media_dateTaken` ON `media` (`dateTaken`);