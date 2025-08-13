import { create } from "zustand";

interface Activity  {
    id: string;
    message: string;
    timeStamp: string;
}

interface ActivityState {
    activities: Activity[];
    addActivity: (message: string) => void;
}

export const useActivityStore = create<ActivityState>((set) => ({
    activities: [],
    addActivity: (message) => set((state) => ({
        activities: [
            {
                id: Date.now().toString(),
                message,
                timeStamp: new Date().toLocaleString(),
            },
            ...state.activities,
        ],
    }))
}));