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
    const cityInfo = useSelector(forecast => !!forecast ? forecast.cityInfo : {})
console.log(cityInfo)
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
            city,
            cityInfo : data.city,
            count : data.cnt,
            dates : data.list.map(x => x.dt_txt),
            temperatures : data.list.map(x => x.main.temp),
            weathers: data.list.map(x => x.weather[0].description),
            clouds: data.list.map(x => x.clouds.all),
            winds: data.list.map(x => ({'x': x.wind.speed, 'y': x.wind.deg})),
        }
    
        dispatch(loadNewCity(storeData))
        setLoading(false)
    }

    return (
        <>
            <h1 className={`page-title ${forecastLoaded ? 'shrink' : ''}`}>{APP_TEXTS.title}</h1>
            <div className='city-area'>
                <div className='search-area'>
                    <CitySearch setCity={setCity} />
                    { error.length > 0 && 
                        <div className='error'>{error}</div> 
                    }
                </div>
                <div className={`city-info ${forecastLoaded ? '' : 'collapsed'}`}>
                    <p className='city-name'>{cityInfo.name}, {cityInfo.country}</p>
                    <div className='city-detail'>Sunrise: {new Date((cityInfo.sunrise || 0) * 1000).toISOString().substr(11, 8)}</div>
                    <div className='city-detail'>Sunset: {new Date((cityInfo.sunset || 0) * 1000).toISOString().substr(11, 8)}</div>
                </div>
            </div>
            
            { (!forecastLoaded && loading) && 
                <div className='loading'>Loading</div> 
            }
            { forecastLoaded && 
                <WeatherGrid /> 
            }
        </>

    )
}

export default App