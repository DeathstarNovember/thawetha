import React from 'react'
import { theme } from '../styles'

export const Layout: React.FC = ({ children }) => {
  return (
    <div
      style={{
        ...theme.baseText,
        display: 'flex',
        backgroundImage: `linear-gradient(to top, ${theme.colors.secondary} 0%, ${theme.colors.primary} 100%)`,
        minHeight: '100vh',
        padding: '10px',
        justifyContent: 'center',
      }}
    >
      <div style={{ maxWidth: 800 }}>{children}</div>
    </div>
  )
}
