import { daysAreEqual } from "./sharedUtils"
import { CalendarEvent, Month, Day } from "../types"

const getMonthEvents = (events: CalendarEvent[], month: Month, year: number) => {
  const eventMonth = (event: CalendarEvent) => event.startDate.getMonth()

  const eventYear = (event: CalendarEvent) => event.startDate.getFullYear()

  return events.filter(
    (event) => eventMonth(event) === month.id && eventYear(event) === year,
  )
}

const getDayEvents = (events: CalendarEvent[], day: Day) => {
  return events.filter((event) => daysAreEqual(event.startDate, day.date))
}

const getHourEvents = (events: CalendarEvent[], start: Date) => {
  return events.filter((event) => {
    return daysAreEqual(event.startDate, start) && event.startTimeHours === start.getHours()
  })
}

export {getMonthEvents, getHourEvents, getDayEvents}
