import {
  Forecast,
  ForecastUnit,
  WeatherData,
  WeatherError,
  WeatherLocale,
} from './types'

export const getOneCallURL = (
  locale: WeatherLocale,
  forecastUnits: ForecastUnit,
) => {
  const apiKey = 'a889ab39f32412f8e65caec1d77a1baa'
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${locale.latitude}&lon=${locale.longitude}&units=${forecastUnits}&appid=${apiKey}`
}

export const getIconURL = (
  forecast: Forecast,
  size: 'small' | 'large' = 'large',
) => {
  return `http://openweathermap.org/img/wn/${forecast.icon}${
    size === 'large' ? '@2x' : ''
  }.png`
}

export const getWeather = async (
  requestURL: string,
  callback: (data: WeatherData | WeatherError) => void,
) =>
  await fetch(requestURL, {
    method: 'GET',
  }).then((response) => {
    response.json().then((value) => callback(value))
  })

export const capitalizeString = (string: string): string => {
  const firstLetter = string.slice(0, 1)
  const remainder = string.slice(1)
  return `${firstLetter.toUpperCase()}${remainder}`
}
