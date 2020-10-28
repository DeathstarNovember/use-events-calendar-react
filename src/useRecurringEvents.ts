import {
  msInADay,
  msInAMinute,
  msInAnHour,
  msInASecond,
  msInAWeek,
} from './data';

import {
  RecurranceFrequency,
  RecurringCalendarEvent,
  InclusionRule,
  CalendarEvent,
} from './types';

import { getDaysInMonth } from './utils';

const getWeekdayIds = (lastWeekdayId: number, weekdays: number[]) =>
  [lastWeekdayId, ...weekdays]
    .map((w) => Math.floor(Math.abs(w)) % 7)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

const useSchedule = <E>(event: RecurringCalendarEvent<E>) => {
  const { inclusion, exclusion } = event.schedule;
  const ocurrsBeforeStart = (start: Date, date: Date) => start && date < start;

  const ocurrsAfterEnd = (end: Date, date: Date) => end && date > end;

  const ocurrsWithinInterval = (date: Date, start: Date, end: Date) =>
    !ocurrsBeforeStart(date, start) && !ocurrsAfterEnd(date, end);

  const getOccurance = (
    date: Date,
    event: CalendarEvent<E>
  ): CalendarEvent<E> => {
    const eventTranslation = Number(date) - Number(event.startDate);
    const originalEnd = Number(event.endDate);
    return {
      ...event,
      startDate: date,
      endDate: new Date(originalEnd + eventTranslation),
    };
  };

  const getOccurances = (rule: InclusionRule, start: Date, end?: Date) => {
    const { interval, frequency, limit, weekdays } = rule;

    if (!end && !limit) return [];

    const { schedule, ...calendarEvent } = event;

    const occurances = [calendarEvent as CalendarEvent<E>];

    const decide = (date: Date) => {
      const newOccurance = getOccurance(date, event);

      if (!end && limit && occurances.length <= limit) {
        occurances.push(newOccurance);

        getNextOcurrance(date, frequency, interval);
      } else if (end) {
        if (!limit || !(occurances.length <= limit)) {
          ocurrsWithinInterval(date, start, end);

          occurances.push(newOccurance);

          getNextOcurrance(date, frequency, interval);
        }
      }
    };

    const getNextOcurrance = (
      lastOccurance: Date,
      frequency: RecurranceFrequency,
      interval: number = 1
    ) => {
      switch (frequency) {
        case 'YEARLY':
          const nextOccurance = new Date(lastOccurance);

          nextOccurance.setFullYear(lastOccurance.getFullYear() + 1 * interval);

          decide(nextOccurance);

          break;
        case 'MONTHLY':
          const daysThisMonth = getDaysInMonth(
            lastOccurance.getMonth(),
            lastOccurance.getFullYear()
          );

          const nextMonth = new Date(
            Number(lastOccurance) + msInADay * daysThisMonth * interval
          );

          if (weekdays) {
            const lastWeekdayId = lastOccurance.getDay();

            const weekdayIds = getWeekdayIds(lastWeekdayId, weekdays);

            if (lastWeekdayId === weekdayIds[-1]) {
              const nextOccurance = new Date(lastOccurance);

              nextOccurance.setMonth(
                (lastOccurance.getMonth() + 1 * (interval % 12)) % 12
              );

              if (lastOccurance.getMonth() + 1 === 11) {
                nextOccurance.setFullYear(
                  lastOccurance.getFullYear() +
                    1 * Math.floor(1 + interval / 12)
                );
              }

              nextOccurance.setDate(
                nextOccurance.getDate() - (weekdayIds[0] - weekdayIds[-1])
              );

              decide(nextOccurance);

              break;
            } else {
              const nextWeekdayId = weekdayIds[lastWeekdayId + 1];

              const daysToNextOccurance = nextWeekdayId - lastWeekdayId;

              const nextOccurance = new Date(
                Number(lastOccurance) + msInADay * daysToNextOccurance
              );

              decide(nextOccurance);

              break;
            }
          }

          decide(nextMonth);

          break;
        case 'WEEKLY':
          const nextWeek = new Date(
            Number(lastOccurance) + msInAWeek * interval
          );

          if (weekdays) {
            const lastWeekdayId = lastOccurance.getDay();

            const weekdayIds = getWeekdayIds(lastWeekdayId, weekdays);

            if (lastWeekdayId === weekdayIds[-1]) {
              const nextOccurance = new Date(lastOccurance);

              nextOccurance.setDate(
                lastOccurance.getDay() + 1 * (interval * 7)
              );

              nextOccurance.setDate(
                nextOccurance.getDate() - (weekdayIds[0] - weekdayIds[-1])
              );

              decide(nextOccurance);

              break;
            } else {
              const nextWeekdayId = weekdayIds[lastWeekdayId + 1];

              const daysToNextOccurance = nextWeekdayId - lastWeekdayId;

              const nextOccurance = new Date(
                Number(lastOccurance) + msInADay * daysToNextOccurance
              );

              decide(nextOccurance);

              break;
            }
          }

          decide(nextWeek);

          break;
        case 'DAILY':
          const nextDay = new Date(
            Number(lastOccurance) + msInAWeek * interval
          );

          decide(nextDay);

          break;
        case 'HOURLY':
          const nextHour = new Date(
            Number(lastOccurance) + msInAnHour * interval
          );

          decide(nextHour);

          break;
        case 'MINUTELY':
          const nextMinute = new Date(
            Number(lastOccurance) + msInAMinute * interval
          );

          decide(nextMinute);

          break;
        case 'SECONDLY':
          const nextSecond = new Date(
            Number(lastOccurance) + msInASecond * interval
          );

          decide(nextSecond);

          break;
      }
    };

    return occurances;
  };

  const between = <E>(start: Date, end: Date): CalendarEvent<E>[] => {
    const { schedule, ...calendarEvent } = event;

    const occurances: CalendarEvent<E>[] = [
      (calendarEvent as unknown) as CalendarEvent<E>,
    ];

    inclusion.forEach((rule) => {
      getOccurances(rule, start, end).forEach((occurance) =>
        occurances.push((occurance as unknown) as CalendarEvent<E>)
      );
    });

    exclusion?.forEach((rule) => {
      const occuranceIndex = occurances.findIndex(
        (occ) => occ.startDate.toDateString() === rule.date.toDateString()
      );

      if (occuranceIndex >= 0) {
        occurances.splice(occuranceIndex, 1);
      }
    });

    return occurances;
  };

  return { between };
};

export default useSchedule;
