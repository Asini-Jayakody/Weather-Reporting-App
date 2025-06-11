import React, { useEffect, useState } from 'react'
import { getCurrentWeather } from '../services/weatherAPI.js'

export default function Home() {
    const [location, setLocation] = useState('Colombo')
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=> {
        const fetchWeather = async ()=>{
            setLoading(true)
            setError(null)
            try {
                const data = await getCurrentWeather(location)
                setWeather(data)
            } catch (error) {
                setError(error)
                setWeather(null)  
            }finally{
                setLoading(false)
            }
        }
        fetchWeather()
    }, [location])

    console.log('response',weather)
    console.log('error',error)

  return (
    <div>
        <h1>Weather in {location}</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {weather && (
            <div>
                <h2>{weather.location.name}</h2>
                <p>Temperature: {weather.current.temp_c}°C</p>
                <p>Humidity: {weather.current.humidity}</p>
                <p>Wind Speed: {weather.current.wind_kph}kph</p>
                <p>UV index: {weather.current.uv}</p>
                <p>Condition: {weather.current.condition.text}</p>
                <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
            </div>
        )}
    </div>
  )
}
