import React from 'react';
import {
  UseCalendar,
  UseEvents,
  defaultCalendar,
  defaultEvents,
} from 'use-events-calendar-react';
import { CustomEventProps } from './App';

type UseEventsType = UseEvents<CustomEventProps>;

type ProvidersProps = {
  events: UseEventsType;
  calendar: UseCalendar;
};

export const Providers: React.FC<ProvidersProps> = ({
  events,
  calendar,
  children,
}) => {
  return (
    <EventsProvider events={events}>
      <CalendarProvider calendar={calendar}>{children}</CalendarProvider>
    </EventsProvider>
  );
};

export const EventsContext = React.createContext<{
  events: UseEventsType;
}>({ events: defaultEvents });

export const EventsProvider: React.FC<{
  events: UseEventsType;
}> = ({ events, children }) => {
  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
};

export const CalendarContext = React.createContext<{
  calendar: UseCalendar;
}>({ calendar: defaultCalendar });

export const CalendarProvider: React.FC<{
  calendar: UseCalendar;
}> = ({ calendar, children }) => {
  return (
    <CalendarContext.Provider value={{ calendar }}>
      {children}
    </CalendarContext.Provider>
  );
};
