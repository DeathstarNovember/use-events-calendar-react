import {
  months,
  weekdays,
  msInAMinute,
  msInAnHour,
  msInADay,
  msInAWeek,
} from "./data"

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
  UseEventsCalendar
} from "./types"

import {defaultCalendar} from "./useCalendar"
import {defaultEvents} from "./useEvents"

import useEventsCalendar from "./useEventsCalendar";

export default useEventsCalendar;

export {
  months,
  weekdays,
  msInAMinute,
  msInAnHour,
  msInADay,
  msInAWeek,
  defaultCalendar,
  defaultEvents
}
  
export type {
  CSS,
  Month,
  Week,
  Day,
  DayOfWeek,
  CalendarEvent,
  NewCalendarEvent,
  DayStyleOptions, 
  UseCalendar,
  UseEvents,
  UseEventsCalendar
}

export { DisplayMode }
