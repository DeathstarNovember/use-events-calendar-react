import React, { useContext, useRef } from 'react';
import useEventsCalendar, {
  Day,
  msInAnHour,
  NewCalendarEvent,
} from 'use-events-calendar-react';
import { CustomEventProps } from './App';
import { EventCard } from './EventCard';
import { CalendarContext, EventsContext } from './Providers';

function nonNullable<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

type CalendarDayProps = {
  day: Day;
  showHours?: boolean;
};

type Hour = {
  h24: number;
  h12: number;
};

const hours: Hour[] = new Array(24)
  .fill(0)
  .map((_, index) => ({ h24: index, h12: index % 12 }));

const getDaysSinceBOT = (date: Date) => {
  const intDate = new Date(date);
  intDate.setHours(0, 0, 0, 0);
  return Math.floor(Number(intDate) / 86400000);
};

const daysAreEqual = (day1: Date, day2: Date) => {
  return getDaysSinceBOT(day1) === getDaysSinceBOT(day2);
};

export const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  showHours = false,
}) => {
  const {
    calendar: { currentDay, selectDay, getDayStyle },
  } = useContext(CalendarContext);

  const {
    events: { events, addEvent, getDayEvents },
  } = useContext(EventsContext);

  const { useRecurringEvent } = useEventsCalendar<{}>([]);

  const recurringEvents = events
    .filter((event) => !daysAreEqual(event.startDate, day.date))
    .map((event) => {
      if ('schedule' in event && event.schedule.recurs) return event;
      return null;
    })
    .filter(nonNullable);

  const occurringToday = recurringEvents
    .map((rEvent) => {
      return useRecurringEvent(rEvent).between(day.date, day.date);
    })
    .filter((evts) => evts.length)
    .flat();

  const dayEvents = getDayEvents(events, day);

  const selected = daysAreEqual(currentDay.date, day.date);

  const dayTileRef = useRef<HTMLDivElement>(null);

  const dayHeaderRef = useRef<HTMLDivElement>(null);

  const hoursHeight =
    (dayTileRef.current?.scrollHeight || 0) -
    (dayHeaderRef.current?.scrollHeight || 0);

  const dayStyles: React.CSSProperties = getDayStyle(day, currentDay, {
    pastDayStyles: {
      fontWeight: 200,
      color: '#868686',
    },
  });

  const handleClick = () => {
    if (!selected) {
      selectDay(day);
    }
  };

  const handleAddEvent = () => {
    const newEvent = {
      title: 'New Event',
      startDate: day.date,
      endDate: day.date,
      allDay: true,
      schedule: {
        recurs: false,
        inclusion: [],
        exclusion: [],
      },
    };
    console.warn({ newEvent });
    addEvent(newEvent);
  };

  return (
    <div style={dayStyles} onClick={handleClick} ref={dayTileRef}>
      <div style={{ display: 'flex' }} ref={dayHeaderRef}>
        {day.date.getDate()}
        {!showHours && selected ? (
          <div onClick={handleAddEvent} style={{ cursor: 'pointer' }}>
            +
          </div>
        ) : null}
      </div>
      {showHours ? (
        <div
          style={{
            height: `${hoursHeight}px`,
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'repeat(24, 1fr)',
          }}
        >
          {hours.map((hour) => {
            return (
              <HourTile
                key={`event${hour.h24}${currentDay.weekday.name}`}
                day={day}
                hour={hour}
              />
            );
          })}
        </div>
      ) : (
        <div>
          {[...dayEvents, ...occurringToday].map((event, eventIndex) => (
            <EventCard
              key={`event${eventIndex}${currentDay.weekday.name}`}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HourTile: React.FC<{
  day: Day;
  hour: Hour;
}> = ({ hour, day }) => {
  const {
    calendar: { currentDay },
  } = useContext(CalendarContext);

  const daySelected =
    day.date.toDateString() === currentDay.date.toDateString();

  const {
    events: { events: allEvents, addEvent, getHourEvents },
  } = useContext(EventsContext);

  const start = new Date(
    day.date.getFullYear(),
    day.date.getMonth(),
    day.date.getDate(),
    hour.h24,
    0,
    0
  );

  const events = getHourEvents(allEvents, start);

  const getNextHour = (date: Date) => {
    return new Date(Number(date) + msInAnHour);
  };
  // const getNextDay = (date: Date) => {
  //   return new Date(Number(date) + msInADay)
  // }
  // const getPrevDay = (date: Date) => {
  //   return new Date(Number(date) - msInADay)
  // }
  // const getPrevHour = (date: Date) => {
  //   return new Date(Number(date) - msInAnHour)
  // }

  const handleAddEvent = () => {
    const startDate = new Date(
      day.date.getFullYear(),
      day.date.getMonth(),
      day.date.getDate(),
      hour.h24,
      0
    );
    const endDate = getNextHour(startDate);
    const newEvent: NewCalendarEvent<CustomEventProps> = {
      title: 'New Event',
      startDate,
      endDate,
      allDay: false,
    };
    addEvent(newEvent);
  };

  const allDayEvents = events.filter((e) => e.allDay);

  const timedEvents = events.filter((e) => !e.allDay);

  return (
    <div style={{ borderBottom: 'solid gray 1px' }}>
      <div style={{ display: 'flex' }}>
        {hour.h24}
        {daySelected ? (
          <div onClick={handleAddEvent} style={{ cursor: 'pointer' }}>
            +
          </div>
        ) : null}
        {allDayEvents.map((event, eventIndex) => (
          <EventCard
            key={`allDayEvent${eventIndex}${day.weekday.name}`}
            event={event}
          />
        ))}
      </div>
      {timedEvents.map((event, eventIndex) => (
        <EventCard
          key={`event${eventIndex}${day.weekday.name}`}
          event={event}
        />
      ))}
    </div>
  );
};
