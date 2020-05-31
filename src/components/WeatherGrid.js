import React from 'react'
import WeatherChart from './WeatherChart'
import {useSelector} from 'react-redux'

function WeatherGrid () {
    const forecast = useSelector(forecast => forecast)
    const {count, dates} = forecast

    return (
        <div className='weather-grid'>
            <WeatherChart type='temperature' data={{count, dates, entries: forecast.temperatures}} reqId={forecast.reqId} />
            <WeatherChart type='cloudiness' data={{count, dates, entries: forecast.clouds}} reqId={forecast.reqId} />
        </div>
    )
}

export default WeatherGrid