import { msInADay, weekdays, months } from "../data"
import { getDaysSinceBOT, differenceInDays } from "./sharedUtils"
import { Month, Day, DayStyleOptions, Week, CSS, DayOfWeek } from "../types"

const today: Day = {
  date: new Date(),
  weekday: weekdays[new Date().getDay()],
  currentPeriod: true,
}

const getDaysInMonth = (monthId: Month['id'], y: number) => {
  const m = monthId + 1
  return m === 2
    ? y & 3 || (!(y % 25) && y & 15)
      ? 28
      : 29
    : 30 + ((m + (m >> 3)) & 1)
}

const getWeekDays = (day: Date): Day[] => {
  const week = getWeekByDate(day)

  return new Array(7).fill(undefined).map((_udf, index) => {
    const date = new Date(Number(week.firstDay) + (index * msInADay))

    return {
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: false
    }
  })
}

const getMonthDays = (month: Month, year: number): Day[] => {
  const daysInCurrentMonth = getDaysInMonth(month.id, year)

  return new Array(daysInCurrentMonth).fill(undefined).map((_, index) => {
    const date = new Date(year, month.id, index + 1)

    return {
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    }
  })
}

const defaultStyles: CSS = {
  borderWidth: "1px",
  borderStyle: "solid",
  fontWeight: 500,
  fontSize: "1rem",
  borderColor: 'rgba(0,0,0,0)',
  background: 'rgba(0,0,0,0)',
  color: 'rgba(0,0,0,1)',
}

const defaultCurrentDayStyles: CSS = {
  ...defaultStyles,
  borderColor: 'rgba(0,0,225, 1)',
  background: 'rgba(0, 105, 225, 0.75)',
  color: '#1A237E',
}

const defaultTodayStyles: CSS = {
  ...defaultStyles,
  borderColor: 'rgba(255,0,0,1)',
  background: 'rgba(255, 119, 119, 0.75)',
  color: '#880E4F',

}

const getDayStyle = (
  day: Day,
  currentDay: Day,
  options?: DayStyleOptions,
): CSS => {

  const currentDayStyles = {
    ...defaultCurrentDayStyles,
    ...options?.currentDayStyles
  }

  const pastDayStyles = {
    ...defaultStyles,
    ...options?.pastDayStyles
  }

  const todayStyles = {
    ...defaultTodayStyles,
    ...options?.todayStyles
  }

  const futureDayStyles = {
    ...defaultStyles,
    ...options?.futureDayStyles
  }
  
  const isPast = getDaysSinceBOT(day.date) < getDaysSinceBOT(today.date)
  
  if (isPast) return pastDayStyles
  
  const isCurrentDay =
    getDaysSinceBOT(day.date) === getDaysSinceBOT(currentDay.date)
  
  if (isCurrentDay) return currentDayStyles
  
  if(!isPast && !isCurrentDay) return futureDayStyles
  
  const isToday = day.date.toDateString() === today.date.toDateString()

  if (isToday) return todayStyles

  return defaultStyles;
}

const getPrevMonthDisplayDays = (month: Month, year: number): Day[] => {
  const firstOfCurrentMonth = new Date(year, month.id, 1)

  const prevMonthYear = month.id === 0 ? year - 1 : year;

  return new Array(firstOfCurrentMonth.getDay())
    .fill(undefined)
    .map((_udf, index) => {
      const date = new Date(prevMonthYear, month.id, 0 - index)

      return { date, weekday: weekdays[date.getDay()], currentPeriod: false }
    })
    .reverse()
}

const getNextMonthDisplayDays = (month: Month, year: number): Day[] => {
  const nextMonthId = (month.id + 1) % 12

  const nextMonthYear = month.id === 11 ? year + 1 : year

  const lastOfCurrentMonth = new Date(nextMonthYear, nextMonthId, 0)

  return new Array(6 - lastOfCurrentMonth.getDay())
    .fill(undefined)
    .map((_udf, index) => {
      const date = new Date(year, nextMonthId, index + 1)

      return { date, weekday: weekdays[date.getDay()], currentPeriod: false }
    })
}

const getMonthFromDate = (date: Date): Month => {
  return months[date.getMonth()]
}

const getFirstDayOfYear = (year: number): Date => {
  return new Date(year, 0, 1)
}

const getLastDayOfYear = (year: number): Date => {
  return new Date(year, 11, 31)
}

const getFirstDayOfWeek = (date: Date) => {
  return new Date(Number(date) - (date.getDay() * msInADay))
}

const getFirstWeekOfYear = (year: number): Week => {
  const firstDayOfYear = getFirstDayOfYear(year);

  const firstDayOfWeek = getFirstDayOfWeek(firstDayOfYear);

  return {
    id: 0,
    firstDay: firstDayOfWeek
  }
}

const getWeekdayFromWeek = (week: Week, weekday: DayOfWeek): Day => {
  return {
    date: new Date(Number(week.firstDay) + (weekday.id * msInADay)),
    weekday, 
    currentPeriod: false
  }
}

const getWeekNumber = (date: Date): number => {
  // Thursday in current week decides the year.
  // January 4 is always in week 1.
  const firstDayOfWeek = getFirstDayOfWeek(date)

  const jan4 = new Date(firstDayOfWeek.getFullYear(), 0, 4);

  const firstDayOfWeek1 = getFirstDayOfWeek(jan4);
  
  return Math.floor((differenceInDays(firstDayOfWeek1, firstDayOfWeek)) / 7) +1;
}

const getWeekByDate = (date: Date): Week => {
  const firstDayOfWeek = getFirstDayOfWeek(date);
  
  return {
    id: getWeekNumber(date),
    firstDay: firstDayOfWeek
  }
}

export {
  today,
  getDaysInMonth,
  getWeekDays,
  getMonthDays,
  getDayStyle,
  getPrevMonthDisplayDays,
  getNextMonthDisplayDays,
  getMonthFromDate,
  getFirstDayOfYear,
  getLastDayOfYear,
  getFirstDayOfWeek,
  getFirstWeekOfYear,
  getWeekdayFromWeek,
  getWeekNumber,
  getWeekByDate,
}
