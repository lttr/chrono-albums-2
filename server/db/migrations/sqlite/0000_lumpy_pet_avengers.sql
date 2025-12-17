CREATE TABLE `auth_account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `auth_account` (`user_id`);--> statement-breakpoint
CREATE TABLE `album` (
	`categoryId` text,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`month` integer NOT NULL,
	`slug` text NOT NULL,
	`projectId` text NOT NULL,
	`title` text NOT NULL,
	`year` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `album_slug_unique` ON `album` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_album_year` ON `album` (`year`);--> statement-breakpoint
CREATE TABLE `category` (
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`projectId` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_slug_unique` ON `category` (`slug`);--> statement-breakpoint
CREATE TABLE `media` (
	`albumId` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`dateTaken` text,
	`fileName` text NOT NULL,
	`fileSize` integer,
	`height` integer,
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`slug` text NOT NULL,
	`locationAlt` real,
	`locationLat` real,
	`locationLon` real,
	`mimeType` text NOT NULL,
	`originalName` text,
	`width` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `media_slug_unique` ON `media` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_media_kind` ON `media` (`kind`);--> statement-breakpoint
CREATE INDEX `idx_media_albumId` ON `media` (`albumId`);--> statement-breakpoint
CREATE TABLE `project` (
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `project_slug_unique` ON `project` (`slug`);--> statement-breakpoint
CREATE TABLE `project_membership` (
	`user_id` text NOT NULL,
	`project_id` text NOT NULL,
	`role` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL,
	PRIMARY KEY(`user_id`, `project_id`),
	FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `auth_session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_session_token_unique` ON `auth_session` (`token`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `auth_session` (`user_id`);--> statement-breakpoint
CREATE TABLE `auth_user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_user_email_unique` ON `auth_user` (`email`);--> statement-breakpoint
CREATE TABLE `auth_verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsec') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `verification_identifier_idx` ON `auth_verification` (`identifier`);