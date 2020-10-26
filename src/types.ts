type CSS = React.CSSProperties

type TimePeriodLabel = {
  name: string
  shortName: string
  id: number
}

type Month = TimePeriodLabel

type DayOfWeek = TimePeriodLabel

type Day = {
  date: Date
  weekday: DayOfWeek
  currentPeriod: boolean
}

type Week = {
  id: number;
  firstDay: Date;
}

type CalendarEvent = {
  id: string
  title: string
  allDay: boolean
  description?: string
  startDate: Date
  endDate: Date
  startTimeHours: number
  startTimeMinutes: number
  endTimeHours: number
  endTimeMinutes: number
}

type NewCalendarEvent = Omit<CalendarEvent, "id">

type DayStyleOptions = {
  currentDayStyles?: CSS,
  pastDayStyles?: CSS,
  todayStyles?: CSS,
  futureDayStyles?: CSS
}

enum DisplayMode {
  month,
  week,
  day
}

type UseCalendar = {
  weekdays: DayOfWeek[],
  months: Month[],
  today: Day,
  currentDay: Day,
  currentWeek: Week,
  currentYear: number,
  currentMonth: Month,
  monthDisplayDays: Day[],
  weekDisplayDays: Day[],
  msInAMinute: number,
  msInAnHour: number,
  msInADay: number,
  msInAWeek: number,
  selectDay: (day: Day) => void,
  getDayStyle: (day: Day, currentDay: Day, options?: DayStyleOptions | undefined) => CSS,
  getFirstDayOfWeek: (Date: Date) => Date,
  getNextWeek: () => Week,
  getLastWeek: () => Week,
  loadPrevWeek: () => void,
  loadNextWeek: () => void,
  getDaysInMonth: (m: number, y: number) => number,
  getLastMonth: () => Month,
  getNextMonth: () => Month,
  loadPrevMonth: () => void,
  loadNextMonth: () => void,
  getWeekByDate: (date: Date) => Week,
  useCalendarEffects: () => void,
  getMonthFromDate: (date: Date) => Month,
  getFirstDayOfYear: (year: number) => Date,
  getLastDayOfYear: (year: number) => Date,
  getFirstWeekOfYear: (year: number) => Week,
  getWeekdayFromWeek: (week: Week, weekday: DayOfWeek) => Day,
  getWeekNumber: (date: Date) => number,
}

type UseEvents = {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  addEvent: (event: NewCalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (event: CalendarEvent) => void;
  getHourEvents: (events: CalendarEvent[], start: Date) => CalendarEvent[];
  getDayEvents: (events: CalendarEvent[], day: Day) => CalendarEvent[];
  getMonthEvents: (events: CalendarEvent[], month: Month, year: number) => CalendarEvent[];
}

type UseEventsCalendar = UseCalendar & UseEvents 

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

