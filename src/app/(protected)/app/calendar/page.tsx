import { FunctionComponent, Suspense } from "react";
import CalendarComponent from "./(ui)/CalendarComponent";
import HeaderCalendar from "./(ui)/HeaderCalendar";

interface CalendarProps {
  
}
 
const Calendar: FunctionComponent<CalendarProps> = () => {
  return ( 
    <>
    <Suspense fallback="loading...">
      <CalendarComponent />
    </Suspense>
    </>
   );
}
 
export default Calendar;