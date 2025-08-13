import ActivityFeed from "@/components/ActivityFeed";
import BarChartSection from "@/components/BarChartSection";
import ChartSection from "@/components/ChartSection";
import KPICard from "@/components/KPICard";
import PieChartSection from "@/components/PieChartSection";
import QuickActions from "@/components/QuickActions";

export default function Dashboard() {
    return(
        <>
        <div>
            <h1 className="text-black font-bold font-sans mt-4 mx-4 text-3xl">Dashboard</h1>
            <KPICard />
            <ChartSection />
            <QuickActions />
            <ActivityFeed />
            <div className="flex items-center justify-evenly my-6 md:flex-row flex-col">
                <BarChartSection />
                <PieChartSection />
            </div>
            
        </div>

        
        </>
    )
}