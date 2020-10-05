export type Forecast = {
  id: number
  main: string
  description: string
  icon: string
}

export enum ForecastUnit {
  imperial = 'imperial',
  metric = 'metric',
  standard = 'standard',
}

export type CurrentWeather = {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: Forecast[]
}

export type MinutelyForecast = { dt: number; precipitation: number }

export type HourlyForecast = {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: Forecast[]
  pop: number
}

export type Temp = {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export type FeelsLike = {
  day: number
  night: number
  eve: number
  morn: number
}

export type DailyForecast = {
  dt: number
  sunrise: number
  sunset: number
  temp: Temp
  feels_like: FeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  weather: Forecast[]
  clouds: number
  pop: number
  rain?: number
  uvi: number
}

export type WeatherData = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: CurrentWeather
  minutely: MinutelyForecast[]
  hourly: HourlyForecast[]
  daily: DailyForecast[]
}

export type WeatherError = { cod: number; message: string }

export type WeatherLocale = {
  name: string
  latitude: number
  longitude: number
}
