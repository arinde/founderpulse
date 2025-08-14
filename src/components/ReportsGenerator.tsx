"use client";

import { useChartStore } from "@/app/store/ChartStore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useState } from "react";

export default function ReportGenerator() {
  const chartData = useChartStore((state) => state.chartData);
  const previousChartData = useChartStore((state) => state.previousChartData);
  const insights: string | undefined = useChartStore((state) => state.insights); // we'll store AI insights in Zustand
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);

    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("FounderPulse Report", 14, 20);

    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // KPI Table Screenshot
    const kpiTable = document.getElementById("kpi-table");
    if (kpiTable) {
      const canvas = await html2canvas(kpiTable);
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 14, 40, 180, 60);
    }

    // Line Chart Screenshot
    const lineChart = document.getElementById("line-chart");
    if (lineChart) {
      const canvas = await html2canvas(lineChart);
      const imgData = canvas.toDataURL("image/png");
      pdf.addPage();
      pdf.text("Charts", 14, 20);
      pdf.addImage(imgData, "PNG", 14, 30, 180, 100);
    }

    // AI Insights Section
    if (insights && insights.trim() !== "") {
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text("AI Insights & Recommendations", 14, 20);

      // Wrap text for better formatting
      const splitText = pdf.splitTextToSize(insights, 180);
      pdf.setFontSize(12);
      pdf.text(splitText, 14, 35);
    }

    pdf.save("founderpulse_report.pdf");
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Generate Custom Report</h2>
      <p className="text-gray-500 mb-4">Export your KPIs, charts, and AI insights as a PDF.</p>
      <button
        onClick={generatePDF}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Download PDF"}
      </button>
    </div>
  );
}
