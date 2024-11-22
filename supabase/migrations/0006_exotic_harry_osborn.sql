ALTER TABLE "transactions" ADD COLUMN "amount" varchar(256);--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN IF EXISTS "income";