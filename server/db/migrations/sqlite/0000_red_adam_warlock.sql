CREATE TABLE `album` (
	`categoryId` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`month` integer NOT NULL,
	`projectId` text NOT NULL,
	`title` text NOT NULL,
	`year` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_album_year` ON `album` (`year`);--> statement-breakpoint
CREATE TABLE `category` (
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`projectId` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media` (
	`albumId` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`dateTaken` text,
	`fileName` text NOT NULL,
	`fileSize` integer,
	`height` integer,
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`locationAlt` real,
	`locationLat` real,
	`locationLon` real,
	`mimeType` text NOT NULL,
	`originalName` text,
	`width` integer
);
--> statement-breakpoint
CREATE INDEX `idx_media_kind` ON `media` (`kind`);--> statement-breakpoint
CREATE INDEX `idx_media_albumId` ON `media` (`albumId`);--> statement-breakpoint
CREATE TABLE `project` (
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
