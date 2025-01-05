"use client";

import { KpiData, KpiWithoutStats } from "@/lib/types";
import { create } from "zustand";

// Add a utility function to generate unique IDs
const generateId = () => `${Date.now()}_${Math.random() * 1000000}`;

interface KpiStore {
  kpiData: (KpiData & { id: string })[];
  addKpiData: (data: KpiWithoutStats[]) => void;
}

export const useKpiStore = create<KpiStore>((set) => ({
  kpiData: [
    {
      title: "KPI1",
      description: "This is a dev env",
      tags: ["test", "development", "software"],
      questions: ["What is your name?"],
      id: "1735984329364_335280.4867155168",
      stats: {
        commits: 987,
        type: "business",
        pages: 6,
        lastUpdated: "3:22:09 pm",
      },
    },
    {
      title: "KPI2",
      description: "This is a dev env",
      tags: ["test", "development", "software"],
      questions: ["What is your name?"],
      id: "17",
      stats: {
        commits: 987,
        type: "business",
        pages: 6,
        lastUpdated: "3:22:09 pm",
      },
    },
  ],
  addKpiData: (data) =>
    set((state) => ({
      kpiData: [
        ...state.kpiData,
        ...data.map((item) => ({
          ...item,
          id: generateId(),
          stats: {
            commits: 987,
            type: "business",
            pages: 6,
            lastUpdated: new Date().toLocaleTimeString(),
          },
        })),
      ],
    })),
}));

export const useKpiData = () => useKpiStore((state) => state.kpiData);
export const useAddKpiData = () => useKpiStore((state) => state.addKpiData);
