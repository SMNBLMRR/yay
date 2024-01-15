"use client";
import { getMonth } from "@/lib/calendar";
import { FunctionComponent, useState } from "react";
import Month from "./Month";

interface CalendarComponentProps {}

const CalendarComponent: FunctionComponent<CalendarComponentProps> = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  return (
    <>
      <div className="flex flex-1 p-7">
        <Month month={currenMonth} />
      </div>
    </>
  );
};

export default CalendarComponent;
