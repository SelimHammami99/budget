CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"income" varchar(256),
	"expenses" varchar(256)
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;