import { DayOfWeek, Month } from "./types";

const months: Month[] = [
  { name: 'January', shortName: 'Jan', id: 0 },
  { name: 'February', shortName: 'Feb', id: 1 },
  { name: 'March', shortName: 'Mar', id: 2 },
  { name: 'April', shortName: 'Apr', id: 3 },
  { name: 'May', shortName: 'May', id: 4 },
  { name: 'June', shortName: 'Jun', id: 5 },
  { name: 'July', shortName: 'Jul', id: 6 },
  { name: 'August', shortName: 'Aug', id: 7 },
  { name: 'September', shortName: 'Sep', id: 8 },
  { name: 'October', shortName: 'Oct', id: 9 },
  { name: 'November', shortName: 'Nov', id: 10 },
  { name: 'December', shortName: 'Dec', id: 11 },
]

const weekdays: DayOfWeek[] = [
  { name: 'Sunday', shortName: 'Sun', id: 0 },
  { name: 'Monday', shortName: 'Mon', id: 1 },
  { name: 'Tuesday', shortName: 'Tue', id: 2 },
  { name: 'Wednesday', shortName: 'Wed', id: 3 },
  { name: 'Thursday', shortName: 'Thr', id: 4 },
  { name: 'Friday', shortName: 'Fri', id: 5 },
  { name: 'Saturday', shortName: 'Sat', id: 6 },
]

const msInASecond = 1000

const msInAMinute = msInASecond * 60

const msInAnHour = msInAMinute * 60;

const msInADay = msInAnHour * 24

const msInAWeek = msInADay * 7

export {
  months,
  weekdays,
  msInASecond,
  msInAMinute,
  msInAnHour,
  msInADay,
  msInAWeek,
}
