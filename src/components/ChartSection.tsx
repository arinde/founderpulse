"use client";

import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { metricData } from "@/app/dashboard/data/chartData";
import gsap from "gsap";
import { useChartStore } from "@/app/store/ChartStore";

// Type for our data points
type ChartDataPoint = {
  date: string;
  value: number;
  category?: string;
};

// Define colors for metrics
const metricColors: Record<string, string> = {
  Users: "#2563eb",      // blue
  Revenue: "#16a34a",    // green
  Retention: "#f59e0b",  // orange
  Churn: "#dc2626",      // red
  value: "#2563eb",      // default for uploaded data
};

export default function ChartSection() {
  const [activeMetric, setActiveMetric] = useState<string>("value");
  const [timeRange, setTimeRange] = useState("1W");
  const chartRef = useRef<HTMLDivElement | null>(null);

  // Zustand store data
  const chartData = useChartStore((state) => state.chartData);

  // Safe filter function that avoids build-time slice errors
  function filterDataByTimeRange(data: ChartDataPoint[] | undefined, range: string) {
    if (!data || data.length === 0) return []; // ✅ Prevents undefined.slice()
    if (range === "ALL") return data;
    if (range === "1W") return data.slice(-7);
    if (range === "1M") return data.slice(-30);
    if (range === "3M") return data.slice(-90);
    if (range === "6M") return data.slice(-180);
    return data;
  }

  // Fade-in animation for chart container
  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeMetric, timeRange]);

  // Animate line color when activeMetric changes
  useEffect(() => {
    gsap.to(".chart-line path", {
      stroke: metricColors[activeMetric] || "#2563eb",
      duration: 0.4,
      ease: "power1.inOut",
    });
  }, [activeMetric]);

  // Determine available metrics dynamically
  let metrics: string[] = [];
  if (chartData.length > 0) {
    const hasCategory = "category" in chartData[0];
    metrics = hasCategory
      ? [...new Set(chartData.map((item) => item.category as string))]
      : ["value"];
  } else {
    metrics = ["Users", "Revenue", "Retention", "Churn"];
  }

  const timeRanges = ["1W", "1M", "3M", "6M", "ALL"];

  // Decide which data to show in chart
  const dataToDisplay =
    chartData.length > 0
      ? filterDataByTimeRange(
          activeMetric === "value"
            ? chartData
            : chartData.filter((item) => item.category === activeMetric),
          timeRange
        )
      : filterDataByTimeRange(
          (metricData[activeMetric as keyof typeof metricData] as ChartDataPoint[]) || [],
          timeRange
        );

  return (
    <div className="bg-gray-800 rounded-sm shadow-md p-6 mt-4 mx-2">
      {/* Metric Selector */}
      <div className="flex gap-4 mb-4">
        {metrics.map((metric) => (
          <button
            key={metric}
            onClick={() => setActiveMetric(metric)}
            className={`px-3 py-1 rounded-md ${
              activeMetric === metric
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            }`}
          >
            {metric}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-64" ref={chartRef}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataToDisplay}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              className="chart-line"
              type="monotone"
              dataKey="value"
              stroke={metricColors[activeMetric] || "#2563eb"}
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-3 mt-4">
        {timeRanges.map((r) => (
          <button
            key={r}
            onClick={() => setTimeRange(r)}
            className={`px-3 py-1 rounded-md ${
              timeRange === r
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
