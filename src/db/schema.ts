import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("bu_user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // UUIDs as primary keys
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "bu_account",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Correct FK reference to users.id
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId), // Composite primary key
  }),
);

export const sessions = pgTable("bu_session", {
  sessionToken: text("session_token").primaryKey(), // Single primary key on session_token
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // FK to users.id
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "bu_verification_token",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey(
      verificationToken.identifier,
      verificationToken.token,
    ), // Composite primary key on identifier and token
  }),
);

export const bids = pgTable("bu_bids", {
  id: serial("id").primaryKey(), // Auto-increment primary key
});

export const items = pgTable("bu_items", {
  id: serial("id").primaryKey(), // Auto-increment primary key
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // FK to users.id
  name: text("name").notNull(),
});
