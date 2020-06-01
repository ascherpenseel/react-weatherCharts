import React from 'react'
import TemperatureChart from './TemperatureChart'
import CloudsChart from './CloudsChart'
import SkyChart from './SkyChart'
import WindChart from './WindChart'
import {useSelector} from 'react-redux'

function WeatherGrid () {
    const forecast = useSelector(forecast => forecast)
    const {count, dates} = forecast

    return (
        <div className='weather-grid'>
            <TemperatureChart data={{dates, entries: forecast.temperatures}} city={forecast.city} />
            <CloudsChart data={{dates, entries: forecast.clouds}} city={forecast.city} />
            <SkyChart data={{entries: forecast.weathers}} city={forecast.city} />
            <WindChart data={{entries: forecast.winds}} city={forecast.city} />
        </div>
    )
}

export default WeatherGrid