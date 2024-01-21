"use client";
import { FunctionComponent } from "react";
import Month from "./Month";
import HeaderCalendar from "./HeaderCalendar";
import { useCalendarStore } from "@/store/calendar";

interface CalendarComponentProps {}

const CalendarComponent: FunctionComponent<CalendarComponentProps> = () => {
  const { month } = useCalendarStore();
  return (
    <>
      <div className="flex flex-col flex-1 p-7 h-[90%] m-auto">
        <HeaderCalendar />
        <Month month={month} />
      </div>
    </>
  );
};

export default CalendarComponent;
