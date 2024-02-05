"use client";
import { cn } from "@/lib/utils";
import { useCalendarStore } from "@/store/calendar";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { format, getYear, isSameMonth, startOfMonth } from "date-fns";
import React, { FunctionComponent, useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import { IoCalendarOutline } from "react-icons/io5";

interface DatePickerProps {
  name:string;
  register?:any;
}

const DatePicker: FunctionComponent<DatePickerProps> = ({ name, register }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [datePickValue, setDatePickValue] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const { month, trackerMonth, prev, next, today } = useCalendarStore();
  let days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return (
    <>
    {/* background: #b7b7b7;
    color: black; */}
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
            "min-h-[30px]" ,
            "bg-[#b7b7b7]",
            "hover:bg-[#b7b7b7]",
            "hover:!bg-[#b7b7b7]",
            "dark:hover:!bg-[#b7b7b7]",
          ],
        }}
      >
        <PopoverTrigger className="">
          <Button className="text-black rounded-[5px] bg-[#b7b7b7]" endContent={<IoCalendarOutline />}>{datePickValue}</Button>
        </PopoverTrigger>
        <PopoverContent className="bg-[#b7b7b7] text-black">

          <div className="flex justify-between items-center w-full py-2 px-1 select-none">
          <span className="text-start w-full">
            {format(
              startOfMonth(new Date(getYear(new Date()), trackerMonth)),
              "MMMM yyyy"
            )}
          </span>

          <div className="flex items-center w-full justify-end">
            <div onClick={prev}>
              <FaCaretLeft size={20} className="hover:opacity-[0.5] cursor-pointer" />
            </div>
            <div onClick={today} className="hover:opacity-[0.5] cursor-pointer">
              <GoDot size={20} />
            </div>
            <div onClick={next} className="hover:opacity-[0.5] cursor-pointer">
              <FaCaretRight size={20} />
            </div>
          </div>
          </div>


          <div className="border border-black rounded-md py-2 flex justify-around items-center w-full my-2 mt-0 select-none text-black">
            {days.map((e, i) => (
              <React.Fragment key={i}>
                <span>{e}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="cursor-pointer flex-1 grid grid-cols-7 grid-rows-5 gap-1 select-none">
            {month.map((row: any, i: any) => (
              <React.Fragment key={i}>
                {row.map((day: any, idx: any) => {
                  return (
                  <div
                    key={idx}
                    className="flex flex-col h-full w-full hover:bg-[#ff006e] rounded-full"
                  >
                    <header className="flex flex-col w-full rounded">
                      <div  onClick={() => {
                            setIsOpen(false);
                            setDatePickValue(day);
                          }} className="flex justify-center items-center px-2 py-0.5 h-fit">
                        <input
                          {...register(name)}
                          type="hidden"
                          value={day}
                          name="date"
                        />
                        <span
                          className={cn(
                            "text-sm my-1 text-start",
                            datePickValue === day && "text-[#e34e0d]",
                            !isSameMonth(day,startOfMonth(new Date(getYear(new Date()), trackerMonth))) && "text-gray-600"
                          )}
                        >
                          {format(day, "d")}
                        </span>
                      </div>
                    </header>
                    <div className="flex-1 cursor-pointer"></div>
                  </div>
                )})}
              </React.Fragment>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DatePicker;
