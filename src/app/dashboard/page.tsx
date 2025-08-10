import ChartSection from "@/components/ChartSection";
import KPICard from "@/components/KPICard";
import QuickActions from "@/components/QuickActions";

export default function Dashboard() {
    return(
        <>
        <div>
            <h1 className="text-black font-bold font-sans mt-4 mx-4 text-3xl">Dashboard</h1>
            <KPICard />
            <ChartSection />
            <QuickActions />
        </div>

        
        </>
    )
}