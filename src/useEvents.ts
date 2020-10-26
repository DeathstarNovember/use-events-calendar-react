import { useState } from "react"

import { CalendarEvent, NewCalendarEvent, UseEvents } from "./types"
import { getDayEvents, getHourEvents, getMonthEvents} from "./utils/eventsUtils"

const useEvents = (initialEvents?: CalendarEvent[]): UseEvents => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents || []);

  const addEvent = (newEvent: NewCalendarEvent): void => {
    setEvents(
      [...events, {...newEvent, id: Date.now().toString()}]
    )
  }

  const updateEvent = (event: CalendarEvent): void => {
    const eventToReplace = events.find(e => e.id === event.id);

    if (!eventToReplace) throw new Error(`event with id ${event.id} does not exist.`)

    setEvents([...events.filter(e => e.id !== event.id), event])
  }

  const deleteEvent = (event: CalendarEvent): void => {
    const newEvents = events.filter(e => e.id !== event.id)

    setEvents(newEvents);
  } 

  const calendarEvents: UseEvents = {
    events,
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getHourEvents,
    getDayEvents,
    getMonthEvents
  }

  return calendarEvents
}

export default useEvents;
