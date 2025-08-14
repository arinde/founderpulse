"use client"
import { useChartStore } from "@/app/store/ChartStore";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type DataPoint = {
  value: number;
  category?: string;
  // add other properties if needed
};

export default function KPITable() {
  const chartData = useChartStore((state) => state.chartData) as DataPoint[];
  const previousChartData = useChartStore((state) => state.previousChartData) as DataPoint[];

  const formatChange = (current: number, previous: number) => {
    const diff = current - previous;
    const percentage = previous !== 0 ? ((diff / previous) * 100).toFixed(1) : "0.0";
    const isPositive = diff >= 0;
    return (
      <span className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {percentage}%
      </span>
    );
  };

  // 🔹 Default placeholder rows before any file is uploaded
  let kpis = [
    { name: "Total Value", current: 0, previous: 0, unit: "" },
    { name: "Data Points", current: 0, previous: 0, unit: "" },
    { name: "Average Value", current: 0, previous: 0, unit: "" },
  ];

  // 🔹 If data exists, calculate real KPIs
  if (chartData.length > 0) {
    // Check if category exists
    if (chartData[0]?.category) {
      const groupByCategory = (data: typeof chartData) => {
        const result: Record<string, number> = {};
        data.forEach((item) => {
          result[item.category!] = (result[item.category!] || 0) + item.value;
        });
        return result;
      };

      const currentCategories = groupByCategory(chartData);
      const previousCategories = groupByCategory(previousChartData);

      kpis = Object.keys(currentCategories).map((cat) => ({
        name: cat,
        current: currentCategories[cat],
        previous: previousCategories?.[cat] || 0,
        unit: "",
      }));
    } else {
      const currentTotal = chartData.reduce((sum, item) => sum + item.value, 0);
      const previousTotal = previousChartData.reduce((sum, item) => sum + item.value, 0);

      kpis = [
        { name: "Total Value", current: currentTotal, previous: previousTotal, unit: "" },
        { name: "Data Points", current: chartData.length, previous: previousChartData.length, unit: "" },
        { name: "Average Value", current: currentTotal / chartData.length, previous: previousTotal / (previousChartData.length || 1), unit: "" },
      ];
    }
  }

  return (
    <div id="kpi-table" className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Recent KPI Trends</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left p-2">KPI</th>
              <th className="text-right p-2">Current</th>
              <th className="text-right p-2">Previous</th>
              <th className="text-right p-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {kpis.map((kpi, idx) => (
              <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                <td className="p-2">{kpi.name}</td>
                <td className="text-right p-2">{kpi.unit}{kpi.current.toLocaleString()}</td>
                <td className="text-right p-2">{kpi.unit}{kpi.previous.toLocaleString()}</td>
                <td className="text-right p-2">{formatChange(kpi.current, kpi.previous)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
