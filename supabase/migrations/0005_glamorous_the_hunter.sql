ALTER TABLE "transactions" ADD COLUMN "type" text;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "expense";