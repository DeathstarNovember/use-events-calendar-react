# use-events-calendar-react

install:
`yarn add use-events-calendar-react`

demo:
[https://github.com/DeathstarNovember/scheduler]

## Basic Usage

```
import React, {createContext, useContext} from "react";

import useEventsCalendar, {UseCalendar, UseEvents, defaultCalendar, defaultEvents} from "use-events-calendar-react";

const initialEvents = [];

const initialSelectedDate = new Date();

cosnt EventsCalendarContext = createContext<{calendar: UseCalendar, calendarEvents: UseEvents}>(
  {calendar: defaultCalendar, calendarEvents: defaultEvents}
)

const App = () => {

  const {calendar, calendarEvents} = useEventsCalendar(initialSelectedDate, initialEvents);

  const {
    today,
    months,
    weekdays,
    currentDay,
    currentWeek,
    currentYear,
    currentMonth,
    monthDisplayDays,
    weekDisplayDays,
    msInAMinute,
    msInAnHour,
    msInADay,
    msInAWeek,
    selectDay,
    getDayStyle,
    getFirstDayOfWeek,
    getWeekByDate,
    getNextWeek,
    getLastWeek,
    getDaysInMonth,
    getLastMonth,
    getNextMonth,
    getMonthFromDate,
    getFirstDayOfYear,
    getLastDayOfYear,
    getFirstWeekOfYear,
    getWeekdayFromWeek,
    getWeekNumber,
    useCalendarEffects,
    // methods for managing display days
    loadPrevWeek,
    loadNextWeek,
    loadPrevMonth,
    loadNextMonth,
  } = calendar

  const {
    events, //event array
    getHourEvents,
    getDayEvents,
    getMonthEvents,
    // methods used for sync managing the internal events.
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  } = calendarEvents

  //recommend to leave the calendar and events separate in context.

  return(
    <EventsCalendarContext.Provider calendar={calendar} calendarEvents={calendarEvents}>
      <YourCustomCalendar />
    </EventsCalendarContext.Provider>
  )
}
```
