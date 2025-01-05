"use server";

import {db} from "@/lib/db";
import {
	type Kpi,
	kpis,
	kpiStats,
	questions as questionsSchema,
	tags as tagsSchema
} from "@/lib/db/schema";
import {eq} from 'drizzle-orm';
import {revalidatePath} from 'next/cache';

type CreateKpiInput = {
  kpi: Omit<Kpi, 'id' | 'createdAt' | 'favorite'>;
  tags?: string[];
  questions?: string[];
}

export const createKpi = async ({ kpi, tags = [], questions = [] }: CreateKpiInput) => {
  const [newKpi] = await db.insert(kpis).values(kpi).returning();
  
  await db.insert(kpiStats)
    .values({
      kpiId: newKpi.id,
      commits: 0,
      type: 'commit',
      pages: 0
    });

  if (tags.length > 0) {
    await db.insert(tagsSchema)
      .values(
        tags.map(name => ({
          kpiId: newKpi.id,
          name
        }))
      );
  }

  if (questions.length > 0) {
    await db.insert(questionsSchema)
      .values(
        questions.map(text => ({
          kpiId: newKpi.id,
          text
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
      tags: {
        columns: {
          name: true
        }
      },
      questions: {
        columns: {
          text: true
        }
      }
    }
  });
};

export const getKpis = async () => {
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
      tags: {
        columns: {
          name: true
        }
      },
      questions: {
        columns: {
          text: true
        }
      }
    },
  });

  return kpis.map(kpi => ({
    ...kpi,
    tags: kpi.tags.map(tag => tag.name),
    questions: kpi.questions.map(question => question.text)
  }))	;
};

export const getTags = async () => {
  return await db.query.tags.findMany();
};

export const getQuestions = async () => {
  return await db.query.questions.findMany();
};