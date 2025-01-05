CREATE TABLE `kpi_stats` (
	`id` text PRIMARY KEY NOT NULL,
	`kpi_id` text NOT NULL,
	`commits` integer NOT NULL,
	`type` text NOT NULL,
	`pages` integer NOT NULL,
	`last_updated` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`kpi_id`) REFERENCES `kpis`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `kpis` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`tags` text NOT NULL,
	`questions` text NOT NULL,
	`favorite` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
