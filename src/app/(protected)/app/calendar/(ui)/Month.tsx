"use client";
import React, { FunctionComponent } from "react";
import Day from "./day-component";

interface MonthProps {
  month:string[][]
}

const Month: FunctionComponent<MonthProps> = ({ month }) => {
  //quì va fatta la chiamata per ricevere tutti gli eventi del mese
  // const value = use(fetch("/api/task"));
  // console.log(value);
  
  return (
    <>
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {month.map((row: any, i: any) => (
          <React.Fragment key={i}>
              {row.map((day: any, idx: any) => (
                <Day day={day} key={idx}/>
              ))}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Month;
