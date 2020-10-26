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
import useEventsCalendar from "./useEventsCalendar";

export default useEventsCalendar;

export {
  months,
  weekdays,
  msInAMinute,
  msInAnHour,
  msInADay,
  msInAWeek,
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
  DisplayMode, 
  UseCalendar,
  UseEvents,
  UseEventsCalendar
}
