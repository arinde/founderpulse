"use client";

import { create } from "zustand";

export type DataPoint = { date: string; value: number; category?: string };
export type WeeklyPoint = { date: string; value: number };
export type PieData = { name: string; value: number };

type ChartState = {
  chartData: DataPoint[];
  previousChartData: DataPoint[];
  barChartData: WeeklyPoint[];
  pieChartData: PieData[];
  insights: string;

  setChartData: (data: DataPoint[]) => void;
  setPreviousChartData: (data: DataPoint[]) => void;
  setBarChartData: (data: WeeklyPoint[]) => void;
  setPieChartData: (data: PieData[]) => void;
  setInsights: (text: string) => void;
  resetAll: () => void;
};

export const useChartStore = create<ChartState>((set) => ({
  chartData: [],
  previousChartData: [],
  barChartData: [
        { date: "week 1", value: 120 },
        { date: "Week 2", value: 200 },
        { date: "Week 3", value: 150 },
        { date: "Week 4", value: 250 },
        { date: "Week 5", value: 100 },
        { date: "Week 6", value: 50 },
        { date: "Week 7", value: 200 },
        { date: "Week 8", value: 150 },
        { date: "Week 9", value: 250 },
    ],
    pieChartData: [
    { name: "Product A", value: 400 },
    { name: "Product B", value: 300 },
    { name: "Product C", value: 300 },
    { name: "Product D", value: 100 },
    { name: "Product E", value: 150 },
    { name: "Product F", value: 300 },
  ],
  insights: "",

  setChartData: (data) => set({ chartData: data }),
  setPreviousChartData: (data) => set({ previousChartData: data }),
  setBarChartData: (data) => set({ barChartData: data }),
  setPieChartData: (data) => set({ pieChartData: data }),
  setInsights: (text) => set({ insights: text }),

  resetAll: () =>
    set({
      chartData: [],
      previousChartData: [],
      barChartData: [],
      pieChartData: [],
      insights: "",
    }),
}));

    