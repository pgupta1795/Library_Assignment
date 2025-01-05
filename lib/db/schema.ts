import {relations,sql} from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text
} from "drizzle-orm/sqlite-core";

// Helper function to generate a unique ID
const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2);

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey().$defaultFn(() => generateId()),
  name: text("name").notNull(),
});

export const questions = sqliteTable("questions", {
  id: text("id").primaryKey().$defaultFn(() => generateId()),
  text: text("text").notNull(),
});

export const kpis = sqliteTable("kpis", {
  id: text("id").primaryKey().$defaultFn(() => generateId()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  favorite: integer("favorite", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const kpiStats = sqliteTable("kpi_stats", {
  id: text("id").primaryKey().$defaultFn(() => generateId()),
  kpiId: text("kpi_id")
    .notNull()
    .references(() => kpis.id),
  commits: integer("commits").notNull(),
  type: text("type").notNull(),
  pages: integer("pages").notNull(),
  lastUpdated: integer("last_updated", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const kpiRelations = relations(kpis, ({one, many}) => ({
  stats: one(kpiStats),
  tags: many(tags),
  questions: many(questions),
}));

export const kpiStatsRelations = relations(kpiStats, ({ one }) => ({
  kpi: one(kpis, {
    fields: [kpiStats.kpiId],
    references: [kpis.id],
  }),
}));

export const tagRelations = relations(tags, ({many}) => ({
  kpis: many(kpis),
}));

export const questionRelations = relations(questions, ({many}) => ({
  kpis: many(kpis),
}));

export type Tag = typeof tags.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type Kpi = typeof kpis.$inferSelect;
export type KpiStats = typeof kpiStats.$inferSelect;

