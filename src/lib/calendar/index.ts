import { startOfMonth, startOfWeek, addDays, getYear, format, isToday } from "date-fns";

export function getMonth(month:number = new Date().getMonth()) {
  //return current month in number es. JAN -> 0
  month = Math.floor(month);
  //return current year es. 2024
  const year = getYear(new Date());
  //return the first day of the month es. Mon. Jan 01 2024
  const firstDayOfTheMonth = startOfMonth(new Date(year, month, 1));
  const startOfTheWeek = startOfWeek(firstDayOfTheMonth);
  let currentMonthCount = 0 - startOfTheWeek.getDay();

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      const currentDate = addDays(startOfTheWeek, currentMonthCount++);
      return format(currentDate, "yyyy-MM-dd"); // Adjust the format as needed
    });
  });

  return daysMatrix;
}

export function getCurrentDayClass(day:string) {
  const formattedDay = format(day, "dd-MM-yy");
  const isTodayFormatted = isToday(day) ? format(new Date(), "dd-MM-yy") : "";
  return formattedDay === isTodayFormatted
    ? "bg-[#b8b4ff] text-black rounded-full w-6 h-6 flex items-center justify-center"
    : "text-[#b8b4ff]";
}
