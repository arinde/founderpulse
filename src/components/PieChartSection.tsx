"use client"

import { useChartStore } from "@/app/store/ChartStore"
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"

export default function PieChartSection() {
    const pieChartData = useChartStore((state) => state.pieChartData);
    const COLORS = ["#2563eb", "#f97316", "#22c55e", "#eab308", "#ec4899"]
    return(
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Top Metrics Breakdown</h2>
            <div className="h-68 w-100">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                    >
                    {pieChartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend className="flex" />
                </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}