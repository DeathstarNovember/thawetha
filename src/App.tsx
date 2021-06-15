import React, { useEffect, useState } from 'react'
import './App.css'
import { ButtonGroup, Button } from './components/Button'
import { Layout } from './components/Layout'
import { WeatherDisplay } from './components/WeatherDisplay'
import { WeatherErrorDisplay } from './components/WeatherErrorDisplay'
import { localeIn, localeTn } from './data'
import { WeatherLocale, WeatherData, WeatherError, ForecastUnit } from './types'
import { getOneCallURL, getWeather } from './utils'

const ForecastUnitSymbolMap = {
  imperial: 'F',
  metric: 'C',
  standard: 'K',
}

export const WeatherContext = React.createContext<{
  weather?: WeatherData
  forecastUnits: ForecastUnit
  locale: WeatherLocale
  unitSymbol: string
}>({ forecastUnits: ForecastUnit.imperial, locale: localeIn, unitSymbol: 'F' })

const App = () => {
  const [weather, setWeather] = useState<WeatherData | undefined>(undefined)

  const [error, setError] = useState<WeatherError | undefined>(undefined)

  const [locale, setLocale] = useState<WeatherLocale>(localeIn)

  const [forecastUnits, setForecastUnits] = useState<ForecastUnit>(
    ForecastUnit.imperial,
  )

  const unitSymbol = ForecastUnitSymbolMap[forecastUnits]

  const forecastUnitOptions = Object.keys(ForecastUnit) as ForecastUnit[]

  const currentUnitIndex = forecastUnitOptions.findIndex(
    (unit) => unit === forecastUnits,
  )

  const nextUnitIndex = (currentUnitIndex + 1) % forecastUnitOptions.length

  const nextUnit = forecastUnitOptions[nextUnitIndex] as ForecastUnit

  const requestURL = getOneCallURL(locale, forecastUnits)

  const handleWeather = (value: WeatherData | WeatherError) => {
    if ('cod' in value) {
      setError(value)
    } else {
      setWeather(value)
    }
  }

  const changeLocale = () => {
    if (locale.name == 'Indiana') {
      setLocale(localeTn)
    } else {
      setLocale(localeIn)
    }
  }

  const changeUnits = () => {
    setForecastUnits(ForecastUnit[nextUnit])
  }

  useEffect(() => {
    getWeather(requestURL, handleWeather)
  }, [forecastUnits, locale])

  return (
    <WeatherContext.Provider
      value={{ weather, locale, forecastUnits, unitSymbol }}
    >
      {!weather ? (
        <Layout>
          {error ? (
            <WeatherErrorDisplay error={error} />
          ) : (
            <div>No Weather Today</div>
          )}
        </Layout>
      ) : (
        <Layout>
          <ButtonGroup variant="transparent">
            <Button onClick={changeLocale} variant="accent">
              change location
            </Button>
            <Button onClick={changeUnits} variant="primary">
              change units
            </Button>
          </ButtonGroup>
          <WeatherDisplay weather={weather} />
        </Layout>
      )}
    </WeatherContext.Provider>
  )
}

export default App
