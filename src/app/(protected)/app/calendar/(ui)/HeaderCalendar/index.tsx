"use client";
import { useCalendarStore } from "@/store/calendar";
import { FunctionComponent } from "react";
import { format, getYear } from "date-fns";
import { startOfMonth } from "date-fns/startOfMonth";
interface HeaderCalendarProps {}

const HeaderCalendar: FunctionComponent<HeaderCalendarProps> = () => {
  const { trackerMonth } = useCalendarStore();
  return (
    <div className="w-full h-[50px] border border-gray-700 bg-black flex items-center rounded-tl-xl rounded-tr-xl">
      <span className="ml-2 text-[#b8b4ff]">
      {format(
        startOfMonth(new Date(getYear(new Date()), trackerMonth)),
        "MMMM yyyy"
      )}
      </span>
    </div>
  );
};

export default HeaderCalendar;
