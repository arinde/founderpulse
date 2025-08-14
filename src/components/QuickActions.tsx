"use client";
import { useChartStore } from "@/app/store/ChartStore";
import { useActivityStore } from "@/app/store/ActivityStore";
import { Upload, UserPlus, FileDown, Send } from "lucide-react";
import { aggregateWeekly } from "@/app/utils/aggregateWeekly";
import { aggregateCategories } from "@/app/utils/aggregateCategories";
import { toast } from "react-toastify";


export default function QuickActions() {
  const setChartData = useChartStore((state) => state.setChartData);
  const addActivity = useActivityStore((state) => state.addActivity);
  const setBarChartData = useChartStore((state) => state.setBarChartData);
  const setPieChartData = useChartStore((state) => state.setPieChartData);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;

        // JSON upload
        if (file.name.endsWith(".json")) {
          const jsonData = JSON.parse(text);
          setChartData(jsonData);
        }
        // CSV upload
        else if (file.name.endsWith(".csv")) {
          const rows = text.split("\n").map((row) => row.split(","));
          const headers = rows[0];
          const hasCategory = headers.includes("category");

          type DataItem = { date: string; value: number; category?: string };
          const formattedData: DataItem[] = rows.slice(1).map((row) => {
            const data: DataItem = {
              date: row[0],
              value: parseFloat(row[1]),
            };
            if (hasCategory && row[2]) {
              data.category = row[2];
            }
            return data;
          });

          // ✅ Store the full dataset (date, value, category if available)
          setChartData(formattedData);

          // Bar chart data
          const weeklyData = aggregateWeekly(
            formattedData.map((item) => ({
              date: item.date,
              value: item.value,
            }))
          );
          setBarChartData(weeklyData);

          // Pie chart data
          if (hasCategory) {
            const categoryData = aggregateCategories(
              formattedData.filter(
                (item): item is { date: string; value: number; category: string } =>
                  typeof item.category === "string"
              )
            );
            setPieChartData(categoryData);
          }

          // Add to activity log
          addActivity(
            `Uploaded new data (${file.name}) — ${formattedData.length} records`
          );

          toast.success("Data Successfully Uploaded");
        } else {
          toast.error("Please upload a CSV or JSON file.");
        }
      } catch (error) {
        console.error("Error reading file:", error);
        toast.error(
          "Error reading file! Please ensure it is a valid CSV or JSON file."
        );
      }
    };

    reader.readAsText(file);
  };

  const actions = [
    {
      label: "Upload Data",
      label2: "Uploading Data...",
      icon: <Upload size={20} />,
      onClick: () => document.getElementById("fileInput")?.click(),
    },
    {
      label: "Invite Team",
      icon: <UserPlus size={20} />,
      onClick: () => toast.success("Invite Team"),
    },
    {
      label: "Export Report",
      icon: <FileDown size={20} />,
      onClick: () => alert("Export Report"),
    },
    {
      label: "Send Update",
      icon: <Send size={20} />,
      onClick: () => alert("Send Update"),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <input
        id="fileInput"
        type="file"
        accept=".csv, .json"
        onChange={handleFileUpload}
        className="hidden"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition"
          >
            {action.icon}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
