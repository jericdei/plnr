CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`weekId` text,
	`from` integer,
	`to` integer,
	`createdAt` integer,
	`updatedAt` integer
);
