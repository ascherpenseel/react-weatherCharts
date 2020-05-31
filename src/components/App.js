import React, {useState, useEffect} from 'react'
import {getAPIUrl, APP_TEXTS} from '../app.config'
import WeatherGrid from './WeatherGrid'
import CitySearch from './CitySearch'
import {useDispatch, useSelector} from 'react-redux'
import {loadNewCity} from '../redux'

function App () {
    const [city, setCity] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const forecastLoaded = useSelector(forecast => !!forecast)

    useEffect(() => {
        if (city.length > 0) {
            setLoading(true)
            setError('')
            fetch(getAPIUrl(city)).then(response => response.json()).then(data => {
                processData(data)
            })
        }
    }, [city])

    const processData = (data) => {
        if (data.cod === '404') {
            setError(APP_TEXTS.error_api_404)
            setLoading(false)
            return;
        }

        const storeData = {
            reqId : Math.random(),
            count : data.cnt,
            dates : data.list.map(x => x.dt_txt),
            temperatures : data.list.map(x => x.main.temp),
            clouds: data.list.map(x => x.clouds.all)
        }
    
        dispatch(loadNewCity(storeData))
        setLoading(false)
    }

    return (
        <>
            <h1>{APP_TEXTS.title}</h1>
            <CitySearch setCity={setCity} />
            { forecastLoaded && 
                <WeatherGrid /> 
            }
            { (!forecastLoaded && loading) && <div className='loading'>Loading ...</div> }
            { error.length > 0 && <div className='error'>{error}</div> }
        </>

    )
}

export default App