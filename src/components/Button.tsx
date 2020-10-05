import React from 'react'
import {
  buttonVariantMap,
  dropShadow,
  getBasePanelStyle,
  theme,
} from '../styles'

export const Button: React.FC<{
  variant: keyof typeof buttonVariantMap
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}> = ({ children, variant, ...props }) => {
  const buttonStyles = {
    padding: theme.space[3],
    margin: theme.space[5],
    borderRadius: theme.size[3],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 800,
    ...buttonVariantMap[variant],
  }
  return (
    <div style={buttonStyles} {...props}>
      {children}
    </div>
  )
}

export const ButtonGroup: React.FC<{
  variant: keyof typeof buttonVariantMap
}> = ({ children, variant }) => {
  const buttonGroupStyle = {
    padding: theme.space[4],
    borderRadius: theme.space[2],
    display: 'flex',
    ...buttonVariantMap[variant],
  }
  return <div style={buttonGroupStyle}>{children}</div>
}
