"use client";

import { getCurrentDayClass } from "@/lib/calendar";
import { useDisclosure } from "@nextui-org/react";
import { format } from "date-fns";
import { FunctionComponent } from "react";
import ModalTask from "./ModalTask";

interface DayProps {
  day: string;
}

const Day: FunctionComponent<DayProps> = ({ day }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="border-[0.5px] border-gray-700 flex flex-col h-full w-full">
        <header className="flex flex-col w-full rounded ">
          <div className="flex justify-between items-center px-2">
            <span
              className={`text-sm my-1 text-start  ${getCurrentDayClass(day)}`}
            >
              {format(day, "dd")}
            </span>

            <span className="text-gray-700 text-sm">{format(day, "eee")}</span>
          </div>
        </header>
        <div className="flex-1 cursor-pointer" onClick={onOpen}>
          <ModalTask day={day} isOpen={isOpen} onOpenChange={onOpenChange} />
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
