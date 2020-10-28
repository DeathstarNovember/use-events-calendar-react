import React, { useContext, useRef } from 'react';
import { CalendarDay } from './CalendarDay';
import { CalendarGrid } from './CalendarGrid';
import { WeeklyCalendarHeader } from './CalendarHeader';
import { Layout } from './Layout';
import { CalendarContext } from './Providers';

export const WeekCalendar: React.FC<React.CSSProperties> = ({
  width,
  height,
}) => {
  const {
    calendar: { weekDisplayDays },
  } = useContext(CalendarContext);

  const headerRef = useRef<HTMLElement>();

  return (
    <Layout width={width} height={height}>
      <WeeklyCalendarHeader ref={headerRef} />
      <CalendarGrid
        gridColumns={7}
        gridRows={1}
        gridHeight={`calc(100vh - ${headerRef.current?.scrollHeight})`}
      >
        {weekDisplayDays.map((day, dayIndex) => {
          return (
            <CalendarDay
              day={day}
              key={`DayDisplay${dayIndex}`}
              showHours={true}
            />
          );
        })}
      </CalendarGrid>
    </Layout>
  );
};
