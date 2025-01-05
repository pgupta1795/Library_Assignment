CREATE TABLE `kpi_to_questions` (
	`id` text PRIMARY KEY NOT NULL,
	`kpi_id` text NOT NULL,
	`question_id` text NOT NULL,
	FOREIGN KEY (`kpi_id`) REFERENCES `kpis`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `kpi_to_tags` (
	`id` text PRIMARY KEY NOT NULL,
	`kpi_id` text NOT NULL,
	`tag_id` text NOT NULL,
	FOREIGN KEY (`kpi_id`) REFERENCES `kpis`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
