'use server';

import { db } from '@/lib/db';
import {
  type Kpi,
  kpis,
  kpiStats,
  kpiToQuestions,
  kpiToTags,
  questions as questionsSchema,
  tags as tagsSchema,
} from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath, unstable_noStore } from 'next/cache';

type CreateKpiInput = {
  kpi: Omit<Kpi, 'id' | 'createdAt' | 'favorite'>;
  tags?: string[];
  questions?: string[];
};

export const createKpi = async ({
  kpi,
  tags = [],
  questions = [],
}: CreateKpiInput) => {
  const [newKpi] = await db.insert(kpis).values(kpi).returning();

  await db.insert(kpiStats).values({
    kpiId: newKpi.id,
    commits: 0,
    type: 'commit',
    pages: 0,
  });

  if (tags.length > 0) {
    const insertedTags = await db
      .insert(tagsSchema)
      .values(tags.map((name) => ({ name })))
      .returning();

    await db.insert(kpiToTags).values(
      insertedTags.map((tag) => ({
        kpiId: newKpi.id,
        tagId: tag.id,
      }))
    );
  }

  if (questions.length > 0) {
    const insertedQuestions = await db
      .insert(questionsSchema)
      .values(questions.map((text) => ({ text })))
      .returning();

    await db.insert(kpiToQuestions).values(
      insertedQuestions.map((question) => ({
        kpiId: newKpi.id,
        questionId: question.id,
      }))
    );
  }

  revalidatePath('/');
  return getKpiById(newKpi.id);
};

export const getKpiById = async (id: string) => {
  return await db.query.kpis.findFirst({
    where: eq(kpis.id, id),
    with: {
      stats: true,
      kpiToTags: {
        with: {
          tag: {
            columns: {
              name: true,
            },
          },
        },
      },
      kpiToQuestions: {
        with: {
          question: {
            columns: {
              text: true,
            },
          },
        },
      },
    },
  });
};

export const getKpis = async () => {
  unstable_noStore();
  const kpis = await db.query.kpis.findMany({
    with: {
      stats: {
        columns: {
          commits: true,
          type: true,
          pages: true,
          lastUpdated: true,
        },
      },
      kpiToTags: {
        with: {
          tag: {
            columns: {
              name: true,
            },
          },
        },
      },
      kpiToQuestions: {
        with: {
          question: {
            columns: {
              text: true,
            },
          },
        },
      },
    },
  });

  return kpis.map((kpi) => ({
    ...kpi,
    tags: kpi.kpiToTags.map((kt) => kt.tag.name),
    questions: kpi.kpiToQuestions.map((kq) => kq.question.text),
  }));
};

export const toggleKpiFavorite = async (id: string, favorite: boolean) => {
  unstable_noStore();
  await db.update(kpis).set({ favorite }).where(eq(kpis.id, id));
  revalidatePath('/');
};

export const searchKpis = async (query: string) => {
  if (!query) return getKpis();

  const kpis = await db.query.kpis.findMany({
    where: (kpis, { or, like }) =>
      or(like(kpis.title, `%${query}%`), like(kpis.description, `%${query}%`)),
    with: {
      stats: {
        columns: {
          commits: true,
          type: true,
          pages: true,
          lastUpdated: true,
        },
      },
      kpiToTags: {
        with: {
          tag: {
            columns: {
              name: true,
            },
          },
        },
      },
      kpiToQuestions: {
        with: {
          question: {
            columns: {
              text: true,
            },
          },
        },
      },
    },
  });

  return kpis.map((kpi) => ({
    ...kpi,
    tags: kpi.kpiToTags.map((kt) => kt.tag.name),
    questions: kpi.kpiToQuestions.map((kq) => kq.question.text),
  }));
};
