"use client"
import { useActivityStore } from "@/app/store/ActivityStore"
import { Clock } from "lucide-react"

export default function ActivityFeed () {
    const activities = useActivityStore((state) => state.activities);
    return(
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            {activities.length === 0 ? (
                <p className="text-gray-500">No recent activity yet.</p>
            ) : (
                <ul className="space-y-4">
                {activities.map((activity) => (
                    <li
                    key={activity.id}
                    className="flex items-start gap-3 border-b border-gray-200 dark:border-gray-700 pb-2"
                    >
                    <Clock className="text-blue-500 mt-1" size={18} />
                    <div>
                        <p>{activity.message}</p>
                        <span className="text-sm text-gray-500">{activity.timeStamp}</span>
                    </div>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}