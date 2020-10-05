import React from 'react'
import { theme } from '../styles'
import { WeatherData } from '../types'
import { CurrentWeatherDisplay } from './CurrentWeatherDisplay'
import { DailyWeatherForcast, DailyWeatherTile } from './DailyWeatherForecast'
import { HourlyWeatherForcast } from './HourlyWeatherForecast'

export const WeatherDisplay = ({ weather }: { weather: WeatherData }) => {
  return (
    <div>
      <h1>Current Weather</h1>
      <CurrentWeatherDisplay
        currentWeather={weather.current}
        todaysWeather={weather.daily[0]}
      />
      <h2 style={{ marginTop: theme.space[7] }}>7-Day Forecast</h2>
      <DailyWeatherForcast weather={weather} />
      <h2>Hourly Forecast</h2>
      <HourlyWeatherForcast weather={weather.hourly} />
    </div>
  )
}
