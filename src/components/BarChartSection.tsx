"use client";

import { useChartStore } from "@/app/store/ChartStore";
import { BarChart, XAxis, Bar, Tooltip, ResponsiveContainer } from "recharts";

export default function BarChartSection() {
    const barChartData = useChartStore((state) => state.barChartData);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
            <div className="h-68 w-100">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                    <XAxis dataKey="date" />
                    {/*<Tooltip />*/}
                    <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}