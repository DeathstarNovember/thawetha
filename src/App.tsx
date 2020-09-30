import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import sampleWeather from './sampleWeather.json'
import { WeatherLocale, WeatherData, WeatherError } from './types'

const apiKey = 'a889ab39f32412f8e65caec1d77a1baa'
const localeIn: WeatherLocale = {
  name: 'Indiana',
  latitude: 39.96,
  longitude: -86.01,
}
const localeTn: WeatherLocale = {
  name: 'Tennessee',
  latitude: 35.98,
  longitude: -87.12,
}

const WeatherDisplay = ({ weather }: { weather: WeatherData }) => {
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState<
    string | undefined
  >(undefined)

  const iconCode = weather.current.weather[0].icon

  const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

  const getIcon = async (iconURL: string) =>
    await fetch(iconURL, { method: 'GET' }).then((response) =>
      response.json().then((data: string) => setCurrentWeatherIcon(data)),
    )

  getIcon(iconURL)

  return <div>{JSON.stringify(currentWeatherIcon)}</div>
}

const WeatherErrorDisplay = ({ error }: { error: WeatherError }) => {
  return <div>{JSON.stringify(error)}</div>
}

const App = () => {
  const [weather, setWeather] = useState<WeatherData | undefined>(sampleWeather)

  const [error, setError] = useState<WeatherError | undefined>(undefined)

  const [locale, setLocale] = useState<WeatherLocale>(localeIn)

  const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${locale.latitude}&lon=${locale.longitude}&appid=${apiKey}`

  const getWeather = async (requestURL: string) =>
    await fetch(requestURL, {
      method: 'GET',
    }).then((response) => {
      response.json().then((value: WeatherData | WeatherError) => {
        if ('cod' in value) {
          setError(value)
        } else {
          setWeather(value)
        }
      })
    })

  const changeLocale = () => {
    if (locale.name == 'Indiana') {
      setLocale(localeTn)
    } else {
      setLocale(localeIn)
    }
  }

  // useEffect(() => {
  //   getWeather(requestURL)
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {weather ? <WeatherDisplay weather={weather} /> : 'No Weather Today'}
        </p>
        <p>{error ? <WeatherErrorDisplay error={error} /> : null}</p>
        <p>{locale.name}</p>
        <button onClick={changeLocale}>change locale</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
