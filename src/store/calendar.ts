import { getMonth } from "@/lib/calendar";
import { create } from "zustand";

interface CalendarStore {
  trackerMonth: number;
  month: string[][];
  prev: () => void;
  next: () => void;
}

export const useCalendarStore = create<CalendarStore>()((set) => ({
  trackerMonth: new Date().getMonth(),
  month: getMonth(),
  prev: () =>
    set((state) => {
      const newTrackerMonth = --state.trackerMonth;
      return {
        ...state,
        trackerMonth: newTrackerMonth,
        month: getMonth(newTrackerMonth),
      };
    }),
  next: () =>
    set((state) => {
      const newTrackerMonth = ++state.trackerMonth;
      return {
        ...state,
        trackerMonth: newTrackerMonth,
        month: getMonth(newTrackerMonth),
      };
    }),
}));
