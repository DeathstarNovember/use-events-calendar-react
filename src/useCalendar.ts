import { useEffect, useState } from "react"
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

  const [currentWeek, setCurrentWeek] = useState<Week>(getWeekByDate(currentDay.date))

  const [currentYear, setCurrentYear] = useState<number>(currentDay.date.getFullYear())

  const [currentMonth, setCurrentMonth] = useState<Month>(
    months[currentDay.date.getMonth()],
  )

  const [currentMonthDays, setCurrentMonthDays] = useState<Day[]>(
    getMonthDays(currentMonth, currentYear),
  )
  
  const [weekDisplayDays, setWeekDisplayDays] = useState<Day[]>(
    getWeekDays(currentDay.date),
  )

  const [prevMonthDays, setPrevMonthDays] = useState<Day[]>(
    getPrevMonthDisplayDays(currentMonth, currentYear),
  )

  const [nextMonthDays, setNextMonthDays] = useState<Day[]>(
    getNextMonthDisplayDays(currentMonth, currentYear),
  )

  const [monthDisplayDays, setMonthDisplayDays] = useState<Day[]>([
    ...prevMonthDays,
    ...currentMonthDays,
    ...nextMonthDays,
  ])

  const getNextWeek = (): Week => {
    return getWeekByDate(new Date(Number(currentWeek.firstDay) + msInAWeek))
  }
  const getLastWeek = (): Week => {
    return getWeekByDate(new Date(Number(currentWeek.firstDay) - msInAWeek))
  }

  const getNextMonth = (): Month =>
  months.find((month) => month.id === (currentMonth.id + 1) % 12) || months[1]

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

  const useCalendarEffects = (): void => useEffect(() => {
    setCurrentWeek(getWeekByDate(currentDay.date))
    setWeekDisplayDays(getWeekDays(getFirstDayOfWeek(currentDay.date)))
    setCurrentMonth(months[currentDay.date.getMonth()])
    setCurrentYear(currentDay.date.getFullYear())
    setCurrentMonthDays(
      getMonthDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    )
    setPrevMonthDays(
      getPrevMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    )
    setNextMonthDays(
      getNextMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    )
    setMonthDisplayDays([
      ...getPrevMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
      ...getMonthDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
      ...getNextMonthDisplayDays(
        months[currentDay.date.getMonth()],
        currentDay.date.getFullYear(),
      ),
    ])
  }, [currentDay])

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
    useCalendarEffects,
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
  useCalendarEffects: () => { },
  getFirstDayOfWeek: () => new Date(),
  getDaysInMonth: () => 0,
  getMonthFromDate: () => {return months[0]},
  getFirstDayOfYear: () => new Date(today.date.getFullYear(), 0, 1),
  getLastDayOfYear,
  getFirstWeekOfYear,
  getWeekdayFromWeek, 
  getWeekNumber
}
