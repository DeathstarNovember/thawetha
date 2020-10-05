import React from 'react'
import { WeatherError } from '../types'

export const WeatherErrorDisplay = ({ error }: { error: WeatherError }) => {
  return <div>{JSON.stringify(error)}</div>
}
