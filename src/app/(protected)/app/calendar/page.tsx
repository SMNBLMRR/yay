import { FunctionComponent, Suspense } from "react";
import CalendarComponent from "./(ui)/calendar-component";

interface CalendarProps {}

const Calendar: FunctionComponent<CalendarProps> = () => {
  return (
    <>
      <Suspense fallback="loading...">
        <CalendarComponent />
      </Suspense>
    </>
  );
};

export default Calendar;
