import { useState } from "react"
import {
  months,
  weekdays,
  msInAMinute,
  msInAnHour,
  msInADay,
  msInAWeek,
} from "./data"
import { Day, Month, UseCalendar, Week } from "./types"
import {
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
  today
} from "./utils/calendarUtils"

const useCalendar = (selectedDate?: Date): UseCalendar => {
  const selectedDay={
    date: selectedDate ? new Date(selectedDate) : new Date(),
    weekday: selectedDate ? weekdays[selectedDate.getDay()] : weekdays[new Date().getDay()],
    currentPeriod: true,
  } 

  const [currentDay, setCurrentDay] = useState<Day>(selectedDay || today)

  const currentWeek = getWeekByDate(currentDay.date)

  const currentYear = currentDay.date.getFullYear()

  const currentMonth = months[currentDay.date.getMonth()]

  const currentMonthDays = getMonthDays(currentMonth, currentYear)
  
  const weekDisplayDays = getWeekDays(currentDay.date)

  const prevMonthDays = getPrevMonthDisplayDays(currentMonth, currentYear)

  const nextMonthDays = getNextMonthDisplayDays(currentMonth, currentYear)

  const monthDisplayDays = [
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ]

  const getNextWeek = (): Week => {
    return getWeekByDate(new Date(Number(currentWeek.firstDay) + msInAWeek))
  }
  const getLastWeek = (): Week => {
    return getWeekByDate(new Date(Number(currentWeek.firstDay) - msInAWeek))
  }

  const getNextMonth = (): Month => months[(currentMonth.id + 1) % 12]

  const getLastMonth = (): Month =>
    months.find((month) => (month.id === currentMonth.id - 1)) || months[11]

  const loadPrevMonth = (): void => {
    const date = new Date(
      currentDay.date.getMonth() === 0 ? currentDay.date.getFullYear() - 1 : currentDay.date.getFullYear(),
      getLastMonth().id,
      currentDay.date.getDate(),
    )
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const loadNextMonth = (): void => {
    const date = new Date(
      currentDay.date.getMonth() === 11 ? currentDay.date.getFullYear() + 1 : currentDay.date.getFullYear(),
      getNextMonth().id,
      currentDay.date.getDate(),
    )
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const loadPrevWeek = (): void => {
    const date = new Date(Number(currentDay.date) - msInAWeek)
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const loadNextWeek = (): void => {
    const date = new Date(Number(currentDay.date) + msInAWeek)
    setCurrentDay({
      date,
      weekday: weekdays[date.getDay()],
      currentPeriod: true,
    })
  }

  const selectDay = (day: Day): void => {
    setCurrentDay(day)
  }

  const calendar: UseCalendar = {
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
    loadPrevWeek,
    loadNextWeek,
    loadPrevMonth,
    loadNextMonth,
    getMonthFromDate,
    getFirstDayOfYear,
    getLastDayOfYear,
    getFirstWeekOfYear,
    getWeekdayFromWeek,
    getWeekNumber
  }

  return calendar
}

export default useCalendar

export const defaultCalendar: UseCalendar = {
  today,
  weekdays,
  months,
  msInADay,
  msInAMinute,
  msInAWeek,
  msInAnHour,
  currentDay: today,
  currentWeek: getWeekByDate(today.date),
  currentYear: today.date.getFullYear(),
  currentMonth: months[today.date.getMonth()],
  monthDisplayDays: getMonthDays(months[today.date.getMonth()], today.date.getFullYear()),
  weekDisplayDays: getWeekDays(today.date),
  selectDay: () => { },
  getDayStyle: () => {return {} },
  getNextWeek: () => {return getWeekByDate(new Date(Number(today.date) + msInAWeek))},
  getLastWeek: () => {return getWeekByDate(new Date(Number(today.date) - msInAWeek))},
  loadPrevWeek: () => { },
  loadNextWeek: () => { },
  getLastMonth: () => {return getMonthFromDate(new Date(Number(today.date) - msInADay * getDaysInMonth(today.date.getMonth(), today.date.getFullYear()))) },
  getNextMonth: () => {return getMonthFromDate(new Date(Number(today.date) + msInADay * getDaysInMonth(today.date.getMonth(), today.date.getFullYear()))) },
  loadPrevMonth: () => { },
  loadNextMonth: () => { },
  getWeekByDate,
  getFirstDayOfWeek: () => new Date(),
  getDaysInMonth: () => 0,
  getMonthFromDate: () => {return months[0]},
  getFirstDayOfYear: () => new Date(today.date.getFullYear(), 0, 1),
  getLastDayOfYear,
  getFirstWeekOfYear,
  getWeekdayFromWeek, 
  getWeekNumber
}
