"use client";

import { format, isSameMonth, isThisMonth, isToday } from "date-fns";
import { FunctionComponent } from "react";

interface DayProps {
  day: any;
  rowIdx: any;
}

const Day: FunctionComponent<DayProps> = ({ day, rowIdx }) => {
  function getCurrentDayClass() {
    const formattedDay = format(day, "dd-MM-yy");
    const isTodayFormatted = isToday(day) ? format(new Date(), "dd-MM-yy") : "";
    return formattedDay === isTodayFormatted
      ? "bg-[#b8b4ff] text-black rounded-full w-7 flex items-center justify-center"
      : "text-[#b8b4ff]";
  }

  function isThisMonthHelper() {
    return isThisMonth(day)
      ? "border-[0.5px] border-[#b8b4ff] flex flex-col h-full w-full m-1 "
      : "border border-gray-700 flex flex-col h-full w-full rounded m-1";
  }

  return (
    <>
      <div className={isThisMonthHelper()}>
        <header className="flex flex-col items-center w-full rounded">
          {/* {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {format(day,"ddd").toUpperCase()}
          </p>
        )} */}
          <p
            className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
          >
            {format(day, "dd")}
          </p>
        </header>
        <div
          className="flex-1 cursor-pointer"
          // onClick={() => {
          //   setDaySelected(day);
          //   setShowEventModal(true);
          // }}
        >
          {/* {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            // onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))} */}
        </div>
      </div>
    </>
  );
};

export default Day;
