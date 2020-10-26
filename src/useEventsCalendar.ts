import { CalendarEvent, UseEventsCalendar } from "./types"
import useCalendar from "./useCalendar"
import useEvents from "./useEvents"

const useEventsCalendar = (initialEvents: CalendarEvent[], selectedDate?: Date): UseEventsCalendar => {
  const calendar = useCalendar(selectedDate)

  const calendarEvents = useEvents(initialEvents)

  return {calendar, calendarEvents}

}

export default useEventsCalendar;
