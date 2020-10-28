import React from 'react'
import { weekdays } from 'use-events-calendar-react'
import { WeekdayLabel } from './WeekdayLabel'

export const WeekdayHeader: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        padding: '1rem',
      }}
    >
      {weekdays.map((weekday, weekdayIndex) => (
        <WeekdayLabel weekday={weekday} key={`weekdayLabel${weekdayIndex}`} />
      ))}
    </div>
  )
}
