import React from 'react'
import WeatherChart from './WeatherChart'
import {useSelector} from 'react-redux'

function WeatherGrid () {
    const forecast = useSelector(forecast => forecast)
    const {count, dates} = forecast

    return (
        <div className='weather-grid'>
            <WeatherChart type='line' data={{count, dates, entries: forecast.temperatures}} />
            <div>Dos</div>
            <div>Tres</div>
            <div>Cuatro</div>
        </div>
    )
}

export default WeatherGrid