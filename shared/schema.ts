import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  preferredLanguage: text("preferred_language").default("ro").notNull(), // Romanian as default
  isSubscribed: boolean("is_subscribed").default(false).notNull(),
  subscriptionEndDate: timestamp("subscription_end_date"),
});

export const languages = pgTable("languages", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  isPremium: boolean("is_premium").default(true).notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  startDate: timestamp("start_date").notNull().defaultNow(),
  endDate: timestamp("end_date").notNull(),
  paymentMethod: text("payment_method").notNull(), // "cheque"
  amount: integer("amount").notNull(), // 900000 (in GBP)
  isCancelled: boolean("is_cancelled").default(false).notNull(),
  cancelDate: timestamp("cancel_date"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  preferredLanguage: true,
});

export const insertLanguageSchema = createInsertSchema(languages);

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  endDate: true,
  paymentMethod: true,
  amount: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = {
  id: number;
  username: string;
  password: string;
  preferredLanguage: string;
  isSubscribed: boolean;
  subscriptionEndDate: Date | null;
};

export type InsertLanguage = z.infer<typeof insertLanguageSchema>;
export type Language = {
  id: number;
  code: string;
  name: string;
  isDefault: boolean;
  isPremium: boolean;
};

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = {
  id: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  paymentMethod: string;
  amount: number;
  isCancelled: boolean;
  cancelDate: Date | null;
};
