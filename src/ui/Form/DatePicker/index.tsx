"use client";
import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/store/calendar";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { format, getYear, startOfMonth } from "date-fns";
import React, { FunctionComponent, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { GoDot } from "react-icons/go";

interface DatePickerProps {
  register: any;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({ register }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [datePickValue, setDatePickValue] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const { month, trackerMonth, prev, next, today } = useCalendarStore();
  let days = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <>
      <Popover
        placement="bottom"
        radius="sm"
        showArrow={true}
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
        classNames={{
          base: ["h-[30px]", "dark:w-full", "w-full"],
          trigger: [
            "h-auto",
            "dark:h-auto",
            "min-h-[30px]",
            "bg-[#0f0e0e]",
            "hover:bg-[#0f0e0e]",
            "hover:!bg-[#0f0e0e]",
            "dark:hover:!bg-[#0f0e0e]",
          ],
        }}
      >
        <PopoverTrigger className="">
          <Button radius="sm" className="text-[#B9B4FF]" endContent={<IoCalendarOutline />}>{datePickValue}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <span className="text-start w-full pt-2">
            {format(
              startOfMonth(new Date(getYear(new Date()), trackerMonth)),
              "MMMM yyyy"
            )}
          </span>
          <div className="flex justify-center items-center w-full py-3">
            <div onClick={prev}>
              <FaCaretLeft size={25} />
            </div>
            <div onClick={today} className="hover:opacity-[0.5] cursor-pointer">
              <GoDot size={30} />
            </div>
            <div onClick={next}>
              <FaCaretRight size={25} />
            </div>
          </div>
          <div className="bg-black rounded-md py-2 flex justify-around items-center w-full my-2 mt-0">
            {days.map((e, i) => (
              <React.Fragment key={i}>
                <span>{e}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="cursor-pointer flex-1 grid grid-cols-7 grid-rows-5 gap-1">
            {month.map((row: any, i: any) => (
              <React.Fragment key={i}>
                {row.map((day: any, idx: any) => (
                  <div
                    key={idx}
                    className=" rounded flex flex-col h-full w-full hover:opacity-[0.5]"
                  >
                    <header className="flex flex-col w-full rounded">
                      <div className="flex justify-between items-center px-2 h-fit">
                        <input
                          {...register("date")}
                          type="hidden"
                          value={day}
                          name="date"
                        />
                        <span
                          onClick={() => {
                            setIsOpen(false);
                            setDatePickValue(day);
                          }}
                          className={cn(
                            "text-sm my-1 text-start",
                            datePickValue === day && "text-[#00ffff]"
                          )}
                        >
                          {format(day, "dd")}
                        </span>
                      </div>
                    </header>
                    <div className="flex-1 cursor-pointer"></div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;
