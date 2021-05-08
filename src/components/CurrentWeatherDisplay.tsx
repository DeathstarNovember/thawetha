import React, { useContext } from 'react'
import { WeatherContext } from '../App'
import { dropShadow, getBasePanelStyle, theme } from '../styles'
import { CurrentWeather, DailyForecast } from '../types'
import { capitalizeString, getIconURL } from '../utils'
import { DailyWeatherTile } from './DailyWeatherForecast'

type CurrentWeatherProps = {
  currentWeather: CurrentWeather
  todaysWeather: DailyForecast
}

export const CurrentWeatherDisplay: React.FC<CurrentWeatherProps> = ({
  currentWeather,
  todaysWeather,
}) => {
  const { locale, unitSymbol } = useContext(WeatherContext)
  const {
    temp,
    dew_point,
    feels_like,
    humidity,
    weather,
    ...rest
  } = currentWeather
  const iconURL = getIconURL(currentWeather.weather[0])
  const panelStyles = getBasePanelStyle(true, true)
  return (
    <div>
      <h1 style={theme.baseText}>
        {locale.name}{' '}
        {new Date(currentWeather.dt * 1000)
          .toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
          .replace(/^0/, '')}
      </h1>
      <div style={{ ...panelStyles, flexDirection: 'row' }}>
        <div>
          <div>
            <img src={iconURL} />
          </div>
          <div>
            <div>{capitalizeString(weather[0].description)}</div>
            <div>
              Current Temp: {temp}
              {unitSymbol}
            </div>
            <div>
              Feels Like: {feels_like}
              {unitSymbol}
            </div>
            <div>Humidity: {humidity}%</div>
            <div>
              Dew Point: {dew_point}
              {unitSymbol}
            </div>
          </div>
        </div>
        <DailyWeatherTile weather={todaysWeather} />
      </div>
    </div>
  )
}
