import React from 'react'

interface Props {
  gridColumns: number
  gridHeight: React.CSSProperties['height']
  gridRows: number
}

export const CalendarGrid: React.FC<Props> = ({
  children,
  gridColumns,
  gridHeight,
  gridRows,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridColumns.toFixed()}, 1fr)`,
        gridTemplateRows: `repeat(${gridRows.toFixed()}, 1fr)`,
        height: gridHeight,
      }}
    >
      {children}
    </div>
  )
}
