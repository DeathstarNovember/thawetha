import React, { useEffect, useState } from 'react'
import './App.css'
import {
  WeatherLocale,
  WeatherData,
  WeatherError,
  DailyForecast,
} from './types'

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

const forecastUnitOptions = ['imperial', 'metric', 'standard']

const App = () => {
  const [weather, setWeather] = useState<WeatherData | undefined>(sampleWeather)

  const [error, setError] = useState<WeatherError | undefined>(undefined)

  const [locale, setLocale] = useState<WeatherLocale>(localeIn)

  const [forecastUnits, setForecastUnits] = useState<string>(
    forecastUnitOptions[0],
  )

  const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${locale.latitude}&lon=${locale.longitude}&units=${forecastUnits}&appid=${apiKey}`

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

  const currentUnitIndex = forecastUnitOptions.findIndex(
    (option) => option === forecastUnits,
  )

  const changeUnits = () => {
    const nextUnitIndex = (currentUnitIndex + 1) % forecastUnitOptions.length
    setForecastUnits(forecastUnitOptions[nextUnitIndex])
  }

  useEffect(() => {
    getWeather(requestURL)
  }, [forecastUnits, locale])
  if (!weather) {
    return (
      <Layout>
        {error ? (
          <WeatherErrorDisplay error={error} />
        ) : (
          <div>No Weather Today</div>
        )}
      </Layout>
    )
  }
  return (
    <Layout>
      <button onClick={changeLocale}>change locale</button>
      <button onClick={changeUnits}>change units</button>

      <WeatherDisplay
        forecastUnits={forecastUnits}
        weather={weather}
        locale={locale}
      />
    </Layout>
  )
}

const Layout: React.FC = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
        color: '#B2CCE5',
        minHeight: '100vh',
        padding: '10px',
      }}
    >
      {children}
    </div>
  )
}

const WeatherDisplay = ({
  weather,
  forecastUnits,
  locale,
}: {
  weather: WeatherData
  forecastUnits: string
  locale: WeatherLocale
}) => {
  const iconCode = weather.current.weather[0].icon

  const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <h1>{locale.name}</h1>
          <div>Current Temp: {weather.current.temp}F</div>
          <div>Dew Point: {weather.current.dew_point}F</div>
        </div>
        <div>
          <img src={iconURL} />
        </div>
      </div>
      <DailyWeatherForcast weather={weather} forecastUnits={forecastUnits} />
    </div>
  )
}

const DailyWeatherForcast = ({
  weather,
  forecastUnits,
}: {
  weather: WeatherData
  forecastUnits: string
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      {weather.daily.map((dailyWeather, dayIndex) => {
        return (
          <DailyWeatherTile
            key={`dailyTile${dayIndex}`}
            weather={dailyWeather}
            forecastUnits={forecastUnits}
          />
        )
      })}
    </div>
  )
}

const DailyWeatherTile = ({
  weather,
  forecastUnits,
}: {
  weather: DailyForecast
  forecastUnits: string
}) => {
  const { temp, rain, pop } = weather

  const iconCode = weather.weather[0].icon

  const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

  return (
    <div
      key={`daily${weather.dt}`}
      style={{
        display: 'flex',
        flex: 1,
        margin: 3,
        padding: 6,
        borderRadius: 5,
        background: 'hsla(197, 37%, 24%, 0.69)',
      }}
    >
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: 6 }}>
          {new Date(weather.dt * 1000).toDateString()}
        </div>
        <div style={{ display: 'flex' }}>
          <div>
            <div style={{ marginBottom: 6 }}>
              <div>{temp.max.toFixed(1)}F</div>
              <div>{temp.min.toFixed(1)}F</div>
            </div>
            <div>{(pop * 100).toFixed(0)}%</div>
          </div>
          <div>
            <img src={iconURL} />
          </div>
        </div>
        <div>rain: {rain ? rain + 'mm' : '--'}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', flex: 1 }}>
        <TempBar temp={temp.morn} units={forecastUnits} />
        <TempBar temp={temp.day} units={forecastUnits} />
        <TempBar temp={temp.eve} units={forecastUnits} />
        <TempBar temp={temp.night} units={forecastUnits} />
      </div>
    </div>
  )
}

const TempBar = ({ temp, units }: { temp: number; units: string }) => {
  const unitDict: { [index: string]: string } = {
    metric: 'C',
    imperial: 'F',
    standard: 'K',
  }

  return (
    <div
      style={{
        color: 'black',
        background: `rgba(255, 255, 255, ${((temp % 100) / 100).toFixed(2)})`,
        flex: 1,
        height: temp % 100,
        textAlign: 'center',
      }}
    >
      <img />
      {temp.toFixed(0)}
      {unitDict[units]}
    </div>
  )
}

const WeatherErrorDisplay = ({ error }: { error: WeatherError }) => {
  return <div>{JSON.stringify(error)}</div>
}

export default App
