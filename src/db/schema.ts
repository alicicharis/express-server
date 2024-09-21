import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  serial,
  varchar,
  primaryKey,
  integer,
  date,
  boolean,
  uuid,
  unique,
  time,
  bigint,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  username: text("name").notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  image: text("image"),
});

export const usersRelations = relations(users, ({ many }) => ({
  books: many(books, { relationName: "books" }),
}));

export const books = pgTable("books", {
  id: serial("id").notNull().primaryKey(),
  title: text("title").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const booksRelations = relations(books, ({ one }) => ({
  users: one(users, {
    fields: [books.userId],
    references: [users.id],
    relationName: "books",
  }),
}));

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expiresAt", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type CreateUser = typeof users.$inferInsert;

export type CreateBook = typeof books.$inferInsert;
