import { daysAreEqual } from './sharedUtils';
import { CalendarEvent, Month, Day } from '../types';
import { msInAnHour } from '../data';

const getMonthEvents = <E>(
  events: CalendarEvent<E>[],
  month: Month,
  year: number
) => {
  const eventMonth = (event: CalendarEvent<E>) => event.startDate.getMonth();

  const eventYear = (event: CalendarEvent<E>) => event.startDate.getFullYear();

  return events.filter(
    (event) => eventMonth(event) === month.id && eventYear(event) === year
  );
};

const getDayEvents = <E>(events: CalendarEvent<E>[], day: Day) => {
  return events.filter((event) => daysAreEqual(event.startDate, day.date));
};

const getHourEvents = <E>(events: CalendarEvent<E>[], start: Date) => {
  return events.filter((event) => {
    const eventStartH = Math.floor(Number(event.startDate) / msInAnHour);
    const startH = Math.floor(Number(start) / msInAnHour);
    return eventStartH === startH;
  });
};

export { getMonthEvents, getHourEvents, getDayEvents };
