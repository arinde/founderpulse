import { create } from "zustand";

type DataPoint ={
    date: string;
    value: number;
}
type PieData = {
    name: string;
    value: number;
}

interface ChartState {
    chartData: DataPoint[];
    setChartData: (data: DataPoint[]) => void;
    barChartData: DataPoint[];
    setBarChartData: (data: DataPoint[]) => void;
    pieChartData: PieData[];
    setPieChartData: (data: PieData[]) => void;
}

export const useChartStore = create<ChartState>((set) => ({
    chartData: [],
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
    setBarChartData: (data) => set({ barChartData: data }),
    setChartData: (data) => set({ chartData: data }),
    setPieChartData: (data) => set({pieChartData : data}),
}));