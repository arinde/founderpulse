"use client"

import { useState, useEffect, useRef  } from "react"
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { metricData } from "@/app/dashboard/data/chartData"
import gsap from "gsap"
import { useChartStore } from "@/app/store/ChartStore"

const metricColors: Record<string, string> = {
  Users: "#2563eb",      // blue
  Revenue: "#16a34a",    // green
  Retention: "#f59e0b",  // orange
  Churn: "#dc2626",      // red
};

export default function ChartSection(){
    type MetricKey = "Users" | "Revenue" | "Retention" | "Churn";
    const [activeMetric, setActiveMetric] = useState<MetricKey>("Users");
    const [timeRange, setTimeRange] = useState("1W")
    const chartRef = useRef(null);
    const lineRef = useRef<SVGPathElement | null>(null);

    function filterDataByTimeRange(data: any[], range: string) {
        if (range === "ALL") return data;
        if (range === "1W") return data.slice(-7)
        if (range === "1M") return data.slice(-30)
        if (range === "3M") return data.slice(-90)
        if (range === "6M") return data.slice(-180)
        return data;
    }

    useEffect(() => {
       if (chartRef.current) {
        gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
  }
    }, [activeMetric, timeRange]);
    useEffect(() => {
        if (lineRef.current) {
            gsap.to(lineRef.current, {
            stroke: metricColors[activeMetric],
            duration: 0.4,
            ease: "power1.inOut",
            });
        }
        }, [activeMetric]);
    const metrics: MetricKey[] = ["Users", "Revenue", "Retention", "Churn"];
    const timeRanges = ["1W", "1M", "3M", "6M", "ALL"];
    const dataToDisplay = filterDataByTimeRange(metricData[activeMetric], timeRange);
    const chartData = useChartStore((state) => state.chartData)
    
    return(
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6" >
            <div className="flex gap-4 mb-4">
                {metrics.map((metric) => (
                    <button key={metric}
                        onClick={() => setActiveMetric(metric)}
                        className= {`px-3 py-1 rounded-md ${
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
                    <LineChart data={chartData.length > 0 ? chartData : metricData[activeMetric]}>
                        <XAxis dataKey="date" tick={{ fontSize: 12}} />
                        <Tooltip />
                        <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={metricColors[activeMetric]} 
                        strokeWidth={2} 
                        dot={true}
                         />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Time Range*/}

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
    )
}