import { pgTable, serial } from "drizzle-orm/pg-core";

export const bidsSchema = pgTable("bu_bids", {
  id: serial("id").primaryKey(),
});
