# use-events-calendar-react

install:
`yarn add use-events-calendar-react`

demo:
https://github.com/DeathstarNovember/scheduler

## Basic Usage

The `useEventsCalendar()` hook takes one required argument: `initialEvents`, and one optional argument `initialSelectedDate`.

`initialEvents` is an array of `CalendarEvent` to place on the calendar whan it loads.

`initialSelectedDate` is the date on which the calendar will focus when it loads, this is `today` by default.

`useEventsCalendar()` uses two other hooks under the hood,
`useCalendar: (initialSelectedDate?: Date) => UseCalendar` and `useEvents: (initialEvents: CalendarEvent[]) => UseEvents`

For convenience, `defaultCalendar` and `defaultEvents` will satisfy types as an initializer for `createContext<UseEventsCalendar>`.

All types are named exports.

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

# Descriptions

## Calendar State

| Value            | Description                                                                                                           | Type               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------ |
| currentDay       | The selected `Day`                                                                                                    | Day                |
| currentWeek      | The `Week` containing the selected `Day`                                                                              | Week               |
| currentYear      | The year as a `number` of the selectedDay                                                                             | number             |
| currentMonth     | The `Month` containing the selected `Day`                                                                             | Month              |
| monthDisplayDays | `Day` array containing all necessary `Days` to fill a `w` x 7 grid, including days from the next and previous months. | Day[]              |
| weekDisplayDays  | `Day` array containing all days in the `currentWeek`                                                                  | Day[]              |
| selectDay        | Function to select a `Day`. Setting the current day will update all `current{period}` values.                         | (day: Day) => void |
| loadPrevWeek     | Changes the `currentDay` to one week earlier.                                                                         | () => void         |
| loadNextWeek     | Changes the `currentDay` to one week later.                                                                           | () => void         |
| loadPrevMonth    | Changes the `currentDay` to one month earlier.                                                                        | () => void         |
| loadNextMonth    | Changes the `currentDay` to one month later.                                                                          | () => void         |

## Calendar Utils

| Value              | Description                                                      | Type                                    |
| ------------------ | ---------------------------------------------------------------- | --------------------------------------- |
| getFirstDayOfWeek  | The date of the first day of the week containing the given date. | (Date: Date) => Date                    |
| getNextWeek        | Info about the week after the `currentWeek`                      | () => Week                              |
| getLastWeek        | Info about the week before the `currentWeek`                     | () => Week                              |
| getDaysInMonth     | Gets the number of days in a given month and year.               | (m: number, y: number) => number        |
| getLastMonth       | Info about the month before the `currentMonth`                   | () => Month                             |
| getNextMonth       | Info about the month after the `currentMonth`                    | () => Month                             |
| getWeekByDate      | Info about the week containing a given date.                     | (date: Date) => Week                    |
| getMonthFromDate   | Info about the month containing a given date.                    | (date: Date) => Month                   |
| getFirstDayOfYear  | The first `Day` of a given year                                  | (year: number) => Date                  |
| getLastDayOfYear   | The last `Day` of a given year                                   | (year: number) => Date                  |
| getFirstWeekOfYear | The first `Week` of a given year.                                | (year: number) => Week                  |
| getWeekdayFromWeek | The `Day` that is a given weekday from a given week.             | (week: Week, weekday: DayOfWeek) => Day |
| getWeekNumber      | The ISO week number of the week containing a given date.         | (date: Date) => number                  |

## Events State

| Value       | Description                                                                                                                            | Type                              |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| events      | `CalendarEvent` array managed by `useEventCalandar`. Are initialized in the initial call to `useEventsCalendar` as the first argument. | CalendarEvent[]                   |
| setEvents   | Updates `events`.                                                                                                                      | (event: NewCalendarEvent) => void |
| addEvent    | Adds a given `CalendarEvent` to `events`.                                                                                              | (event: CalendarEvent) => void    |
| updateEvent | Updates a given `CalendarEvent` from `events`.                                                                                         | (event: CalendarEvent) => void    |
| deleteEvent | Removes a given `CalendarEvent` from `events`.                                                                                         | (event: CalendarEvent) => void    |

## Events Utilties

| Value          | Description                                                                                 | Type                                                                     |
| -------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| getHourEvents  | All events from a given list where `startDate` is within an hour of `start` arg.            | (events: CalendarEvent[], start: Date) => CalendarEvent[]                |
| getDayEvents   | All events from a given list where `startDate` is on a given `Day`.                         | (events: CalendarEvent[], day: Day) => CalendarEvent[]                   |
| getMonthEvents | All events from a given list where `startDate` is within a given `Month` in a given `year`. | (events: CalendarEvent[], month: Month, year: number) => CalendarEvent[] |

## Static Data

| Value       | Description   | Type        |
| ----------- | ------------- | ----------- |
| today       | Today’s `Day` | Day         |
| months      | Static data   | Month[]     |
| weekdays    | Static data   | DayOfWeek[] |
| msInAMinute | Static data   | number      |
| msInAnHour  | Static data   | number      |
| msInADay    | Static data   | number      |
| msInAWeek   | Static data   | number      |

## Styles

| Value       | Description                               | Type                                                          |
| ----------- | ----------------------------------------- | ------------------------------------------------------------- |
| getDayStyle | Gets a CSS style object for a given date. | (day: Day, currentDay: Day, options?: DayStyleOptions) => CSS |

## Types

| Value            | Description                                                         | Type                                                                               |
| ---------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| CSS              | Alias                                                               | React.CSSProperties                                                                |
| Month            | Info about a given Month                                            | { name: string; shortName: string; id: number }                                    |
| Week             | Info about a given Week                                             | {id: string; firstDay: Date;}                                                      |
| Day              | Info about a given Day                                              | {date: Date; weekday: DayOfWeek; currentPeriod: boolean}                           |
| DayOfWeek        | Info about a given weekday.                                         | { name: string; shortName: string; id: number }                                    |
| NewCalendarEvent | Handy for creating an event. Sets the `id` to Date.now().toString() | Omit<\CalendarEvent, 'id'>\                                                        |
| DayStyleOptions  | Options object for use with `getDayStyles()`                        | {currentDayStyles: CSS, todayStyles: CSS, pastDayStyles: CSS;futureDayStyles: CSS} |
