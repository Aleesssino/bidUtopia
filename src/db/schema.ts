import { pgTable, serial } from "drizzle-orm/pg-core";

export const bids = pgTable("bu_bids", {
  id: serial("id").primaryKey(),
});
