"use client";

import { useState, useEffect, useRef } from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { metricData } from "@/app/dashboard/data/chartData";
import gsap from "gsap";
import { useChartStore } from "@/app/store/ChartStore";

type ChartDataPoint = {
  date: string;
  value: number;
  category?: string;
};

const metricColors: Record<string, string> = {
  Users: "#2563eb", // blue
  Revenue: "#16a34a", // green
  Retention: "#f59e0b", // orange
  Churn: "#dc2626", // red
  value: "#2563eb", // default
};

export default function ChartSection() {
  const [activeMetric, setActiveMetric] = useState<string>("value");
  const [timeRange, setTimeRange] = useState("1W");
  const chartRef = useRef(null);

  const chartData = useChartStore((state) => state.chartData);

  function filterDataByTimeRange(data: ChartDataPoint[], range: string) {
    if (range === "ALL") return data;
    if (range === "1W") return data.slice(-7);
    if (range === "1M") return data.slice(-30);
    if (range === "3M") return data.slice(-90);
    if (range === "6M") return data.slice(-180);
    return data;
  }

  // Animate chart container fade-in
  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeMetric, timeRange]);

  // Animate line color change via CSS selector
  useEffect(() => {
    gsap.to(".chart-line path", {
      stroke: metricColors[activeMetric] || "#2563eb",
      duration: 0.4,
      ease: "power1.inOut",
    });
  }, [activeMetric]);

  // Determine metrics dynamically from uploaded data
  let metrics: string[] = [];
  if (chartData.length > 0) {
    const hasCategory = chartData[0]?.category;
    metrics = hasCategory
      ? [...new Set(chartData.map((item) => item.category as string))]
      : ["value"];
  } else {
    metrics = ["Users", "Revenue", "Retention", "Churn"];
  }

  const timeRanges = ["1W", "1M", "3M", "6M", "ALL"];

  const dataToDisplay =
    chartData.length > 0
      ? filterDataByTimeRange(
          activeMetric === "value"
            ? chartData
            : chartData.filter((item) => item.category === activeMetric),
          timeRange
        )
      : filterDataByTimeRange(
          metricData[activeMetric as keyof typeof metricData] as ChartDataPoint[],
          timeRange
        );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      {/* Metric Buttons */}
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

      {/* Time Range Buttons */}
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
