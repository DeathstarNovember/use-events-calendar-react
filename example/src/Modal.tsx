import React from 'react'

export const Modal: React.FC = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        background: 'rgba(178, 198, 221, 0.75)',
      }}
    >
      {children}
    </div>
  )
}
