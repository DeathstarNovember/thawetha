export const dropShadow = `0 2px 3px 1px rgba(0, 0, 0, 0.4), 2px 3px 5px rgba(0, 0, 0, 0.2)`

export const theme = {
  colors: {
    primary: '#005bea',
    secondary: '#00c6fb',
    accent: '#EC6E4D',
    primaryText: '#162b5a',
    secondaryText: '#003636',
    primaryTranslucent: '#005aeb99',
    secondaryTranslucent: '#00c6fb99',
  },
  space: [0, 2, 5, 8, 12, 15, 18, 24],
  size: [0, 2, 4, 8, 10, 12, 16, 18, 20, 24, 36, 48, 56, 64, 72],
}

export const buttonVariantMap = {
  primary: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.primaryText,
    boxShadow: dropShadow,
  },
  primaryFlat: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.primaryText,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.secondaryText,
    boxShadow: dropShadow,
  },
  secondaryFlat: {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.secondaryText,
  },
  accent: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.secondaryText,
    boxShadow: dropShadow,
  },
  accentFlat: {
    backgroundColor: theme.colors.accent,
    color: theme.colors.secondaryText,
    boxShadow: dropShadow,
  },
  transparent: {
    backgroundColor: '#0000',
    color: theme.colors.primaryText,
  },
}

export const getBasePanelStyle = (
  selected: boolean,
  trimX: boolean = false,
) => {
  return {
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
    flex: 1,
    ...(trimX
      ? {
          marginY: theme.space[5],
          marginX: theme.space[0],
        }
      : {
          margin: theme.space[5],
        }),
    padding: theme.space[3],
    borderRadius: theme.size[3],
    color: selected ? theme.colors.secondaryText : theme.colors.primaryText,
    background: selected
      ? theme.colors.secondaryTranslucent
      : theme.colors.primaryTranslucent,
    boxShadow: dropShadow,
  }
}
