import {
  CalendarEvent,
  RecurringCalendarEvent,
  UseEventsCalendar,
} from './types';
import useCalendar from './useCalendar';
import useEvents from './useEvents';
import useSchedule from './useRecurringEvents';

const useEventsCalendar = <E>(
  initialEvents: (CalendarEvent<E> | RecurringCalendarEvent<E>)[],
  selectedDate?: Date
): UseEventsCalendar<E> => {
  const calendar = useCalendar(selectedDate);

  const calendarEvents = useEvents<E>(initialEvents);

  const useRecurringEvent = <E>(event: RecurringCalendarEvent<E>) =>
    useSchedule<E>(event);

  return { calendar, calendarEvents, useRecurringEvent };
};

export default useEventsCalendar;
