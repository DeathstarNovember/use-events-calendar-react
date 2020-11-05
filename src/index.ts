import {
  months,
  weekdays,
  msInASecond,
  msInAMinute,
  msInAnHour,
  msInADay,
  msInAWeek,
} from './data';

import {
  CSS,
  Month,
  Week,
  Day,
  DayOfWeek,
  CalendarEvent,
  NewCalendarEvent,
  DayStyleOptions,
  DisplayMode,
  UseCalendar,
  UseEvents,
  UseEventsCalendar,
  ExclusionRule,
  InclusionRule,
  NewRecurringCalendarEvent,
  RecurringCalendarEvent,
  Schedule,
  UseRecurringEvent,
  RecurranceFrequency,
} from './types';

import { defaultCalendar } from './useCalendar';
import { defaultEvents } from './useEvents';

import useEventsCalendar from './useEventsCalendar';

export default useEventsCalendar;

export {
  months,
  weekdays,
  msInASecond,
  msInAMinute,
  msInAnHour,
  msInADay,
  msInAWeek,
  defaultCalendar,
  defaultEvents,
};

export type {
  CSS,
  Month,
  Week,
  Day,
  DayOfWeek,
  CalendarEvent,
  RecurringCalendarEvent,
  NewCalendarEvent,
  NewRecurringCalendarEvent,
  Schedule,
  InclusionRule,
  ExclusionRule,
  DayStyleOptions,
  UseCalendar,
  UseEvents,
  UseRecurringEvent,
  UseEventsCalendar,
};

export { DisplayMode, RecurranceFrequency };
