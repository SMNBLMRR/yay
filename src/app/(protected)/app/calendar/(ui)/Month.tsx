"use client";
import React from "react";
import { FunctionComponent } from "react";
import Day from "./Day";

interface MonthProps {
  month: any;
}

const Month: FunctionComponent<MonthProps> = ({ month }) => {
  return (
    <>
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {month.map((row: any, i: any) => (
          <React.Fragment key={i}>
            {row.map((day: any, idx: any) => (
              <Day day={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Month;
