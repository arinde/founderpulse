"use client"

import ActivityFeed from "@/components/ActivityFeed";
import BarChartSection from "@/components/BarChartSection";
import ChartSection from "@/components/ChartSection";
import InsightsPanel from "@/components/InsightsPanel";
import KPICard from "@/components/KPICard";
import KPITable from "@/components/KPITable";
import PieChartSection from "@/components/PieChartSection";
import QuickActions from "@/components/QuickActions";
import ReportGenerator from "@/components/ReportsGenerator";

export default function Dashboard() {

    return(
        <>
        <div>
            <h1 className="text-black font-bold font-sans-serif mt-4 mx-4 text-3xl">Dashboard</h1>
            <KPICard />
            <ChartSection />
            <QuickActions />
            <ActivityFeed />
            <div className="flex items-center justify-evenly my-6 md:flex-row flex-col">
                <BarChartSection />
                <PieChartSection />
            </div>
            <KPITable />
            <InsightsPanel />
            <ReportGenerator />
        </div>

        
        </>
    )
}