CREATE TABLE "post_slug_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"old_slug" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "is_featured" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "keyphrase_density" real DEFAULT 0;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "seo_score" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "readability_score" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "post_slug_history" ADD CONSTRAINT "post_slug_history_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "post_slug_history_old_slug_idx" ON "post_slug_history" USING btree ("old_slug");--> statement-breakpoint
CREATE INDEX "post_slug_history_post_id_idx" ON "post_slug_history" USING btree ("post_id");--> statement-breakpoint
CREATE INDEX "posts_is_featured_idx" ON "posts" USING btree ("is_featured");