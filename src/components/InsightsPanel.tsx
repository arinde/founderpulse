"use client";

import { useState } from "react";
import { useChartStore } from "@/app/store/ChartStore";

export default function InsightsPanel() {
  const chartData = useChartStore((s) => s.chartData);
  const insights = useChartStore((s) => s.insights);
  const setInsights = useChartStore((s) => s.setInsights);

  const [loading, setLoading] = useState(false);

  const generateInsights = async () => {
    if (!chartData || chartData.length === 0) {
      alert("Please upload data before generating insights.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generateInsights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chartData }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error:", data.error);
        alert(`Error: ${data.error}`);
      } else {
        setInsights(data.insights || "No insights generated.");
      }
    } catch (err) {
      console.error("Error fetching insights:", err);
      alert("Error fetching insights. Please check your connection or API setup.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">AI-Powered Insights</h2>
      <p className="text-gray-500 mb-4">
        Generate recommendations based on your uploaded KPI data.
      </p>

      <button
        onClick={generateInsights}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Insights"}
      </button>

      {insights && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-md font-semibold mb-2">Insights:</h3>
          <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-200">
            {insights}
          </p>
        </div>
      )}
    </div>
  );
}
