export const dropShadow = `0 2px 3px 1px rgba(0, 0, 0, 0.4), 2px 3px 5px rgba(0, 0, 0, 0.2)`

export const theme = {
  colors: {
    primary: '#585858',
    secondary: '#005bea',
    accent: '#EC6E4D',
  },
  space: [0, 2, 5, 8, 12, 15, 18, 24],
  size: [0, 2, 4, 8, 10, 12, 16, 18, 20, 24, 36, 48, 56, 64, 72],
  baseText: {
    color: 'white',
  },
}

export const buttonVariantMap = {
  primary: {
    backgroundColor: theme.colors.primary,
    boxShadow: dropShadow,
  },
  primaryFlat: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
    boxShadow: dropShadow,
  },
  secondaryFlat: {
    backgroundColor: theme.colors.secondary,
  },
  accent: {
    backgroundColor: theme.colors.accent,
    boxShadow: dropShadow,
  },
  accentFlat: {
    backgroundColor: theme.colors.accent,
    boxShadow: dropShadow,
  },
  transparent: {
    backgroundColor: '#0000',
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
    background: selected ? theme.colors.secondary : theme.colors.primary,
    boxShadow: dropShadow,
  }
}
