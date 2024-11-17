ALTER TABLE "transactions" ADD COLUMN "expense" varchar(256);--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "expenses";