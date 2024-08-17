ALTER TABLE "bu_account" DROP CONSTRAINT "bu_account_userId_bu_user_id_fk";
--> statement-breakpoint
ALTER TABLE "bu_items" DROP CONSTRAINT "bu_items_userId_bu_user_id_fk";
--> statement-breakpoint
ALTER TABLE "bu_session" DROP CONSTRAINT "bu_session_userId_bu_user_id_fk";
--> statement-breakpoint
ALTER TABLE "bu_account" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bu_items" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "bu_session" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bu_account" ADD CONSTRAINT "bu_account_user_id_bu_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bu_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bu_items" ADD CONSTRAINT "bu_items_user_id_bu_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bu_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bu_session" ADD CONSTRAINT "bu_session_user_id_bu_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bu_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bu_account" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "bu_items" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "bu_session" DROP COLUMN IF EXISTS "userId";