type CSS = React.CSSProperties;

type TimePeriodLabel = {
  name: string;
  shortName: string;
  id: number;
};

type Month = TimePeriodLabel;

type DayOfWeek = TimePeriodLabel;

type Day = {
  date: Date;
  weekday: DayOfWeek;
  currentPeriod: boolean;
};

type Week = {
  id: number;
  firstDay: Date;
};

type InclusionRule = {
  frequency: RecurranceFrequency;
  interval?: number;
  weekdays?: number[];
  limit?: number;
  serial?: string;
};

type ExclusionRule = {
  date: Date;
};

type Schedule = {
  recurs: boolean;
  inclusion: InclusionRule[];
  exclusion?: ExclusionRule[];
};

type BaseCalendarEvent = {
  id: string;
  title: string;
  allDay: boolean;
  description?: string;
  startDate: Date;
  endDate: Date;
};

type CalendarEvent<E> = E & BaseCalendarEvent;

type RecurringCalendarEvent<E> = CalendarEvent<E> & {
  schedule: Schedule;
};

type NewCalendarEvent<E> = E & Omit<BaseCalendarEvent, 'id'>;

type NewRecurringCalendarEvent<E> = Omit<CalendarEvent<E>, 'id'> & {
  schedule: Schedule;
};

type DayStyleOptions = {
  currentDayStyles?: CSS;
  pastDayStyles?: CSS;
  todayStyles?: CSS;
  futureDayStyles?: CSS;
};

enum DisplayMode {
  month,
  week,
  day,
}

type UseCalendar = {
  today: Day;
  months: Month[];
  weekdays: DayOfWeek[];
  currentDay: Day;
  currentWeek: Week;
  currentYear: number;
  currentMonth: Month;
  monthDisplayDays: Day[];
  weekDisplayDays: Day[];
  msInAMinute: number;
  msInAnHour: number;
  msInADay: number;
  msInAWeek: number;
  selectDay: (day: Day) => void;
  getDayStyle: (
    day: Day,
    currentDay: Day,
    options?: DayStyleOptions | undefined
  ) => CSS;
  getFirstDayOfWeek: (Date: Date) => Date;
  getNextWeek: () => Week;
  getLastWeek: () => Week;
  loadPrevWeek: () => void;
  loadNextWeek: () => void;
  getDaysInMonth: (m: number, y: number) => number;
  getLastMonth: () => Month;
  getNextMonth: () => Month;
  loadPrevMonth: () => void;
  loadNextMonth: () => void;
  getWeekByDate: (date: Date) => Week;
  getMonthFromDate: (date: Date) => Month;
  getFirstDayOfYear: (year: number) => Date;
  getLastDayOfYear: (year: number) => Date;
  getFirstWeekOfYear: (year: number) => Week;
  getWeekdayFromWeek: (week: Week, weekday: DayOfWeek) => Day;
  getWeekNumber: (date: Date) => number;
};

type UseEvents<E> = {
  events: (CalendarEvent<E> | RecurringCalendarEvent<E>)[];
  setEvents: React.Dispatch<
    React.SetStateAction<(CalendarEvent<E> | RecurringCalendarEvent<E>)[]>
  >;
  addEvent: (event: NewCalendarEvent<E> | NewRecurringCalendarEvent<E>) => void;
  updateEvent: (event: CalendarEvent<E> | RecurringCalendarEvent<E>) => void;
  deleteEvent: (event: CalendarEvent<E> | RecurringCalendarEvent<E>) => void;
  getHourEvents: (
    events: CalendarEvent<E>[],
    start: Date
  ) => CalendarEvent<E>[];
  getDayEvents: (events: CalendarEvent<E>[], day: Day) => CalendarEvent<E>[];
  getMonthEvents: (
    events: CalendarEvent<E>[],
    month: Month,
    year: number
  ) => CalendarEvent<E>[];
};

type UseRecurringEvent<E> = {
  between: (start: Date, end: Date) => CalendarEvent<E>[];
};

type UseEventsCalendar<E> = {
  calendar: UseCalendar;
  calendarEvents: UseEvents<E>;
  useRecurringEvent: (
    event: RecurringCalendarEvent<E>
  ) => {
    between: (start: Date, end: Date) => RecurringCalendarEvent<E>[];
  };
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

export { DisplayMode };

export enum RecurranceFrequency {
  YEARLY = 'YEARLY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
  DAILY = 'DAILY',
  HOURLY = 'HOURLY',
  MINUTELY = 'MINUTELY',
  SECONDLY = 'SECONDLY',
}
