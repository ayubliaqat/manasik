DROP INDEX "posts_status_idx";--> statement-breakpoint
DROP INDEX "posts_published_at_idx";--> statement-breakpoint
CREATE INDEX "posts_status_published_at_idx" ON "posts" USING btree ("status","published_at");