import React, { useContext, useRef } from 'react';
import { CalendarContext } from './Providers';
import { Layout } from './Layout';
import { CalendarDay } from './CalendarDay';
import { MonthlyCalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';

type MonthCalendarProps = React.CSSProperties & {};

export const MonthCalendar: React.FC<MonthCalendarProps> = ({
  width,
  height,
}) => {
  const {
    calendar: { monthDisplayDays },
  } = useContext(CalendarContext);

  const headerRef = useRef<HTMLElement>();

  return (
    <Layout width={width} height={height}>
      <MonthlyCalendarHeader ref={headerRef} />
      <CalendarGrid
        gridColumns={7}
        gridRows={monthDisplayDays.length / 7}
        gridHeight={`calc(100vh - ${headerRef.current?.scrollHeight})`}
      >
        {monthDisplayDays.map((day, dayIndex) => {
          return <CalendarDay day={day} key={`DayDisplay${dayIndex}`} />;
        })}
      </CalendarGrid>
    </Layout>
  );
};
