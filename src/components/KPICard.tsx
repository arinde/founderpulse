import Card from "./Card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function KPICard(){

    const KPI= [
        {
            title: "MRR",
            value: "$12,000",
            trend: "+4.6%",
            isPositive: true
        },
        {
            title: "Active Users",
            value: "1,200",
            trend: "-1.2%",
            isPositive: false
        },
        {
            title: "Retention",
            value: "%85",
            trend: "+2.1%",
            isPositive: true
        },
        {
            title: "Churn",
            value: "%5",
            trend: "-0.4%",
            isPositive: false
        }
    ]
    return(
        <div id="line-chart" className="border border-blue-400 rounded-lg shadow-md mx-3 p-4 mt-4 bg-yellow-100">
            <p className="font-serif font-bold tracking-wide text-yellow-1 text-xl">KPI Cards Row</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {KPI.map((kpis) => (
                    <Card key={kpis.title}>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{kpis.title}</span>
                        <span className="text-2xl font-semibold mt-2">{kpis.value}</span>
                        <div className="flex items-center mt-1 space-x-1">
                            {kpis.isPositive ? 
                            <ArrowUpRight size={16} className="text-green-500" /> : 
                            <ArrowDownRight size={16} className="text-red-500" />}
                            <span>{kpis.trend}</span>
                        </div>
                    </Card>
                ))}
                
            </div>
        </div>
    )
}