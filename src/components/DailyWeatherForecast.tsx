import React, { useContext, useState } from 'react'
import { WeatherContext } from '../App'
import { theme, dropShadow, getBasePanelStyle } from '../styles'
import { DailyForecast, WeatherData } from '../types'
import { getIconURL } from '../utils'
import { TempBar } from './TempBar'

export const DailyWeatherForcast = ({ weather }: { weather: WeatherData }) => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        margin: '0 -15px',
      }}
    >
      {weather.daily.map((dailyWeather, dayIndex) => {
        return (
          <DailyWeatherTile
            key={`dailyTile${dayIndex}`}
            weather={dailyWeather}
            isSelected={dayIndex === 0}
          />
        )
      })}
    </div>
  )
}

export const DailyWeatherTile = ({
  weather,
  isSelected = false,
}: {
  weather: DailyForecast
  isSelected?: boolean
}) => {
  const { unitSymbol } = useContext(WeatherContext)

  const [selected, setSelected] = useState(isSelected)

  const toggleSelected = () => setSelected(!selected)

  const { temp, rain, pop, sunrise, sunset, ...rest } = weather

  const forecast = weather.weather[0]

  const iconURL = getIconURL(forecast)

  const panelStyle = getBasePanelStyle(selected)

  return (
    <div
      key={`daily${weather.dt}`}
      onClick={toggleSelected}
      style={{ ...panelStyle }}
    >
      <div
        style={{
          fontWeight: 'bold',
          marginBottom: 6,
          mixBlendMode: 'difference',
        }}
      >
        {new Date(weather.dt * 1000).toDateString()}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ mixBlendMode: 'difference' }}>
            <div style={{ marginBottom: 6 }}>
              <div>
                {temp.max.toFixed(1)}
                {unitSymbol}
              </div>
              <div>
                {temp.min.toFixed(1)}
                {unitSymbol}
              </div>
            </div>
            <div>
              {(pop * 100).toFixed(0)}%{rain ? '(' + rain + 'mm)' : ''}
            </div>
          </div>
          <div>
            <img src={iconURL} />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          flex: 1,
        }}
      >
        <TempBar temp={temp.morn} heightScale={1} />
        <TempBar temp={temp.day} heightScale={1} />
        <TempBar temp={temp.eve} heightScale={1} />
        <TempBar temp={temp.night} heightScale={1} />
      </div>
    </div>
  )
}
