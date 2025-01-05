import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

const generateId = () =>
  Date.now().toString() + Math.random().toString(36).substring(2);

export const tags = sqliteTable('tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  name: text('name').notNull(),
});

export const questions = sqliteTable('questions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  text: text('text').notNull(),
});

export const kpis = sqliteTable('kpis', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  title: text('title').notNull(),
  description: text('description').notNull(),
  favorite: integer('favorite', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const kpiStats = sqliteTable('kpi_stats', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  kpiId: text('kpi_id')
    .notNull()
    .references(() => kpis.id),
  commits: integer('commits').notNull(),
  type: text('type').notNull(),
  pages: integer('pages').notNull(),
  lastUpdated: integer('last_updated', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const kpiToTags = sqliteTable('kpi_to_tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  kpiId: text('kpi_id')
    .notNull()
    .references(() => kpis.id),
  tagId: text('tag_id')
    .notNull()
    .references(() => tags.id),
});

export const kpiToQuestions = sqliteTable('kpi_to_questions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  kpiId: text('kpi_id')
    .notNull()
    .references(() => kpis.id),
  questionId: text('question_id')
    .notNull()
    .references(() => questions.id),
});

export const kpiRelations = relations(kpis, ({ one, many }) => ({
  stats: one(kpiStats),
  kpiToTags: many(kpiToTags),
  kpiToQuestions: many(kpiToQuestions),
}));

export const kpiStatsRelations = relations(kpiStats, ({ one }) => ({
  kpi: one(kpis, {
    fields: [kpiStats.kpiId],
    references: [kpis.id],
  }),
}));

export const tagRelations = relations(tags, ({ many }) => ({
  kpiToTags: many(kpiToTags),
}));

export const questionRelations = relations(questions, ({ many }) => ({
  kpiToQuestions: many(kpiToQuestions),
}));

export const kpiToTagsRelations = relations(kpiToTags, ({ one }) => ({
  kpi: one(kpis, {
    fields: [kpiToTags.kpiId],
    references: [kpis.id],
  }),
  tag: one(tags, {
    fields: [kpiToTags.tagId],
    references: [tags.id],
  }),
}));

export const kpiToQuestionsRelations = relations(kpiToQuestions, ({ one }) => ({
  kpi: one(kpis, {
    fields: [kpiToQuestions.kpiId],
    references: [kpis.id],
  }),
  question: one(questions, {
    fields: [kpiToQuestions.questionId],
    references: [questions.id],
  }),
}));

export type Tag = typeof tags.$inferSelect;
export type Question = typeof questions.$inferSelect;
export type Kpi = typeof kpis.$inferSelect;
export type KpiStats = typeof kpiStats.$inferSelect;
export type KpiToTag = typeof kpiToTags.$inferSelect;
export type KpiToQuestion = typeof kpiToQuestions.$inferSelect;
