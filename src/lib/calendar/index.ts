import { startOfMonth, startOfWeek, addDays, getYear, format } from 'date-fns';

export function getMonth(month = new Date().getMonth()) {
  month = Math.floor(month);
  const year = getYear(new Date());
  const firstDayOfTheMonth = startOfMonth(new Date(year, month, 1));
  const startOfTheWeek = startOfWeek(firstDayOfTheMonth);
  let currentMonthCount = 0 - startOfTheWeek.getDay();

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      const currentDate = addDays(startOfTheWeek, currentMonthCount++);
      return format(currentDate, 'yyyy-MM-dd'); // Adjust the format as needed
    });
  });

  return daysMatrix;
}
