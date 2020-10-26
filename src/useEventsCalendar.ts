import { CalendarEvent, UseEventsCalendar } from "./types"
import useCalendar from "./useCalendar"
import useEvents from "./useEvents"

const useEventsCalendar = (initialEvents: CalendarEvent[], selectedDate?: Date): UseEventsCalendar => {
  const calendar = useCalendar(selectedDate)

  const events = useEvents(initialEvents)

  return {...calendar, ...events}

}

export default useEventsCalendar;
