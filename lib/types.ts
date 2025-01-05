export type KpiData = {
  favorite?: boolean;
  id: string;
  title: string;
  description: string;
  tags: string[];
  stats: {
    commits: number;
    type: string;
    pages: number;
    lastUpdated: string;
  };
  questions: string[];
};

export type KpiWithoutStats = Pick<
  KpiData,
  'title' | 'description' | 'tags' | 'questions'
>;
