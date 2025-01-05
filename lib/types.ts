import { Kpi } from './db/schema';

export type KpiWithDetails = Kpi & {
  tags: string[];
  questions: string[];
  stats: {
    commits: number;
    type: string;
    pages: number;
    lastUpdated: Date;
  } | null;
};
