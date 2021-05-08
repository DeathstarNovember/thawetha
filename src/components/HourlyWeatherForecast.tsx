import React, { useContext, useState } from 'react'
import { WeatherContext } from '../App'
import { theme, dropShadow, getBasePanelStyle } from '../styles'
import { Forecast, HourlyForecast, WeatherData } from '../types'
import { getIconURL } from '../utils'

const getWeatherGroups = (
  hourlyForecasts: HourlyForecast[],
): HourlyForecast[][] => {
  const groups: HourlyForecast[][] = [[]]

  hourlyForecasts.forEach((hourlyWeather, hourIndex) => {
    const lastArrayElement = hourIndex === hourlyForecasts.length - 1

    const lastInGroup = lastArrayElement
      ? true
      : hourlyForecasts[hourIndex + 1].weather[0].icon !==
        hourlyWeather.weather[0].icon

    groups[groups.length - 1].push(hourlyWeather)

    if (lastInGroup && !lastArrayElement) {
      groups.push([])
    }
  })
  return groups
}

export const HourlyWeatherForcast = ({
  weather,
}: {
  weather: WeatherData['hourly']
}) => {
  const weatherGroupsDay1 = getWeatherGroups(weather.slice(0, 24))
  const weatherGroupsDay2 = getWeatherGroups(weather.slice(24))
  return (
    <div>
      <h3 style={theme.baseText}>Next 24 Hours</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
        }}
      >
        {weatherGroupsDay1.map((weatherGroup, wgIndex) => (
          <HourlyWeatherGroupDisplay
            weatherGroup={weatherGroup}
            last={wgIndex === weatherGroupsDay1.length - 1}
          />
        ))}
      </div>
      <h3 style={theme.baseText}>Next 48 Hours</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
        }}
      >
        {weatherGroupsDay2.map((weatherGroup, wgIndex) => (
          <HourlyWeatherGroupDisplay
            weatherGroup={weatherGroup}
            last={wgIndex === weatherGroupsDay2.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

const HourlyWeatherGroupDisplay = ({
  weatherGroup,
  last,
}: {
  weatherGroup: HourlyForecast[]
  last?: boolean
}) => {
  const iconURL = getIconURL(weatherGroup[0].weather[0], 'small')

  const [selected, setSelected] = useState(false)

  const toggleSelected = () => {
    setSelected(!selected)
  }

  const panelStyle = getBasePanelStyle(selected)
  return (
    <div
      style={{ ...panelStyle, flex: weatherGroup.length }}
      onClick={toggleSelected}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <img src={iconURL} />
      </div>
      <div style={{ display: 'flex' }}>
        <HourlyWeatherTile
          weather={weatherGroup[0]}
          tileDurationHours={weatherGroup.length}
        />
      </div>
    </div>
  )
}

export const HourlyWeatherTile = ({
  weather,
  iconURL,
  tileDurationHours,
}: {
  weather: HourlyForecast
  iconURL?: string
  tileDurationHours: number
}) => {
  const {
    temp,
    feels_like,
    pop,
    pressure,
    humidity,
    dew_point,
    clouds,
    visibility,
    wind_speed,
    wind_deg,
  } = weather

  const { unitSymbol } = useContext(WeatherContext)

  return (
    <div
      key={`hourly${weather.dt}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        // justifyContent: 'center',
        // margin: theme.space[3],
        padding: theme.space[1],
        // borderRadius: theme.size[3],
        // background: theme.colors.translucent,
        // boxShadow: dropShadow,
      }}
    >
      <div>
        <img src={iconURL} />
      </div>
      <div style={{ mixBlendMode: 'difference' }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            fontWeight: 'bold',
            marginBottom: 6,
            justifyContent: 'space-between',
          }}
        >
          <div>{new Date(weather.dt * 1000).getHours()}</div>
          <div>
            {tileDurationHours > 1
              ? (new Date(weather.dt * 1000).getHours() +
                  tileDurationHours -
                  1) %
                24
              : undefined}
          </div>
        </div>
        <div>
          {temp.toFixed(0)}
          {unitSymbol}
        </div>
        <div>{(pop * 100).toFixed(0)}%</div>
      </div>
    </div>
  )
}
