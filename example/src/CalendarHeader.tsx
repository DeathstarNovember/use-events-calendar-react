import React, { useContext } from 'react';
import { CalendarContext } from './Providers';
import { msInAWeek } from 'use-events-calendar-react';
import { WeekdayHeader } from './WeekdayHeader';

export const MonthlyCalendarHeader: React.FC<{
  ref: React.MutableRefObject<HTMLElement | undefined>;
}> = () => {
  const { calendar } = useContext(CalendarContext);

  const {
    getNextMonth,
    getLastMonth,
    currentMonth,
    currentYear,
    loadPrevMonth,
    loadNextMonth,
  } = calendar;

  const nextMonth = getNextMonth();

  const lastMonth = getLastMonth();

  const monthButtonStyle: React.CSSProperties = { cursor: 'pointer' };

  const nextMonthButtonStyle: React.CSSProperties = {
    ...monthButtonStyle,
  };

  const lastMonthButtonStyle: React.CSSProperties = {
    ...monthButtonStyle,
  };

  const currentMonthStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 800,
    margin: '1rem',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={lastMonthButtonStyle} onClick={loadPrevMonth}>
        {lastMonth.shortName}
      </div>
      <div style={currentMonthStyle}>
        {currentMonth.name} {currentYear}
      </div>
      <div style={nextMonthButtonStyle} onClick={loadNextMonth}>
        {nextMonth.shortName}
      </div>
    </div>
  );
};

export const WeeklyCalendarHeader: React.FC<{
  ref: React.MutableRefObject<HTMLElement | undefined>;
}> = () => {
  const { calendar } = useContext(CalendarContext);

  const { currentWeek, loadNextWeek, loadPrevWeek } = calendar;

  const lastWeek = {
    id: currentWeek.id === 1 ? 52 : currentWeek.id - 1,
    firstDay: new Date(Number(currentWeek.firstDay) - msInAWeek),
  };

  const nextWeek = {
    id: currentWeek.id === 52 ? 1 : currentWeek.id + 1,
    firstDay: new Date(Number(currentWeek.firstDay) + msInAWeek),
  };

  const weekButtonStyle: React.CSSProperties = { cursor: 'pointer' };

  const nextMonthButtonStyle: React.CSSProperties = {
    ...weekButtonStyle,
  };

  const lastWeekButtonStyle: React.CSSProperties = {
    ...weekButtonStyle,
  };

  const currentWeekStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 800,
    margin: '1rem',
  };

  return (
    <div>
      <WeekdayHeader />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={lastWeekButtonStyle} onClick={loadPrevWeek}>
          {`Week of ${lastWeek.firstDay.toLocaleDateString()} (${lastWeek.id})`}
        </div>
        <div style={currentWeekStyle}>
          {`Week of ${currentWeek.firstDay.toLocaleDateString()} (${
            currentWeek.id
          })`}
        </div>
        <div style={nextMonthButtonStyle} onClick={loadNextWeek}>
          {`Week of ${nextWeek.firstDay.toLocaleDateString()} (${nextWeek.id})`}
        </div>
      </div>
    </div>
  );
};
