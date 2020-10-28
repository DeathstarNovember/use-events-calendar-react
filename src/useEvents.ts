import { useState } from 'react';

import {
  CalendarEvent,
  NewCalendarEvent,
  NewRecurringCalendarEvent,
  RecurringCalendarEvent,
  UseEvents,
} from './types';

import {
  getDayEvents,
  getHourEvents,
  getMonthEvents,
} from './utils/eventsUtils';

const useEvents = <E>(
  initialEvents?: (CalendarEvent<E> | RecurringCalendarEvent<E>)[]
): UseEvents<E> => {
  const [events, setEvents] = useState<CalendarEvent<E>[]>(initialEvents || []);

  const addEvent = (
    newEvent: NewCalendarEvent<E> | NewRecurringCalendarEvent<E>
  ): void => {
    const newUCE = {
      ...newEvent,
      id: Date.now().toString(),
    } as CalendarEvent<E> | RecurringCalendarEvent<E>;
    setEvents([...events, newUCE]);
  };

  const updateEvent = (event: CalendarEvent<E>): void => {
    if (!events.find((e) => e.id === event.id))
      throw new Error(`event with id ${event.id} does not exist.`);

    setEvents([...events.filter((e) => e.id !== event.id), event]);
  };

  const deleteEvent = (event: CalendarEvent<E>): void => {
    const newEvents = events.filter((e) => e.id !== event.id);

    setEvents(newEvents);
  };

  const calendarEvents: UseEvents<E> = {
    events,
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getHourEvents,
    getDayEvents,
    getMonthEvents,
  };

  return calendarEvents;
};

export default useEvents;

export const defaultEvents: UseEvents<{}> = {
  events: [],
  setEvents: () => {},
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
  getHourEvents,
  getDayEvents,
  getMonthEvents,
};
