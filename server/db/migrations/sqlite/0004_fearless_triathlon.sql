CREATE TABLE `job` (
	`id` text PRIMARY KEY NOT NULL,
	`media_id` text NOT NULL,
	`type` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`source_path` text NOT NULL,
	`target_path` text NOT NULL,
	`error` text,
	`attempts` integer DEFAULT 0 NOT NULL,
	`max_attempts` integer DEFAULT 3 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`started_at` integer,
	`completed_at` integer,
	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_job_status` ON `job` (`status`);--> statement-breakpoint
CREATE INDEX `idx_job_media_id` ON `job` (`media_id`);