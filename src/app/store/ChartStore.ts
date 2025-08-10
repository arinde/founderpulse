import { create } from "zustand";

type DataPoint ={
    date: string;
    value: number;
}

interface ChartState {
    chartData: DataPoint[];
    setChartData: (data: DataPoint[]) => void;
}

export const useChartStore = create<ChartState>((set) => ({
    chartData: [],
    setChartData: (data) => set({ chartData: data }),
}));