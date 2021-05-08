import React, { useContext, useEffect } from 'react'
import { WeatherContext } from '../App'
import { theme } from '../styles'

export const TempBar = ({
  temp,
  heightScale,
}: {
  temp: number
  heightScale: number
}) => {
  const { unitSymbol } = useContext(WeatherContext)

  const rValue = (75 + ((temp / 3) % 255)).toFixed(0)
  const gValue = (75 + (temp % 255)).toFixed(0)
  const bValue = (75 + ((temp * 3) % 255)).toFixed(0)
  const aValue = (temp / 100).toFixed(2)
  return (
    <div
      style={{
        background: `rgba(${rValue}, ${gValue}, ${bValue}, 1)`,
        flex: 1,
        height: (temp % 100) * heightScale,
        textAlign: 'center',
        borderTopLeftRadius: theme.size[2],
        borderTopRightRadius: theme.size[2],
        margin: '0 7px',
      }}
    >
      <div style={{ marginTop: '-1em', mixBlendMode: 'difference' }}>
        {temp.toFixed(0)}
        {unitSymbol}
      </div>
    </div>
  )
}
