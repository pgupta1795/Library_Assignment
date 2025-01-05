PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_kpi_stats` (
	`id` text PRIMARY KEY NOT NULL,
	`kpi_id` text NOT NULL,
	`commits` integer NOT NULL,
	`type` text NOT NULL,
	`pages` integer NOT NULL,
	`last_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`kpi_id`) REFERENCES `kpis`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_kpi_stats`("id", "kpi_id", "commits", "type", "pages", "last_updated") SELECT "id", "kpi_id", "commits", "type", "pages", "last_updated" FROM `kpi_stats`;--> statement-breakpoint
DROP TABLE `kpi_stats`;--> statement-breakpoint
ALTER TABLE `__new_kpi_stats` RENAME TO `kpi_stats`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_kpis` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`favorite` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_kpis`("id", "title", "description", "favorite", "created_at") SELECT "id", "title", "description", "favorite", "created_at" FROM `kpis`;--> statement-breakpoint
DROP TABLE `kpis`;--> statement-breakpoint
ALTER TABLE `__new_kpis` RENAME TO `kpis`;--> statement-breakpoint
CREATE TABLE `__new_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_questions`("id", "text") SELECT "id", "text" FROM `questions`;--> statement-breakpoint
DROP TABLE `questions`;--> statement-breakpoint
ALTER TABLE `__new_questions` RENAME TO `questions`;--> statement-breakpoint
CREATE TABLE `__new_tags` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tags`("id", "name") SELECT "id", "name" FROM `tags`;--> statement-breakpoint
DROP TABLE `tags`;--> statement-breakpoint
ALTER TABLE `__new_tags` RENAME TO `tags`;