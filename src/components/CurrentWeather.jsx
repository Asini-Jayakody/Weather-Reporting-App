import React from 'react'
import WeatherCard from './WeatherCard.jsx'

export default function CurrentWeather({current_weather}) {
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4">More About Today’s Weather</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            <WeatherCard
                type="temperature"
                title="Feels Like"
                value={`${current_weather.feelslike_c}°C`}
            />
            {/* <WeatherCard
                type="temperature"
                title="Temperature"
                value={`${current_weather.temp_c}°C`}
            /> */}
            <WeatherCard
                type="humidity"
                title="Humidity"
                value={`${current_weather.humidity}%`}
            />
            <WeatherCard
                type="wind"
                title="Wind"
                value={`${current_weather.wind_kph} km/h`}
            />
            <WeatherCard
                type="UV"
                title="UV Index"
                value={current_weather.uv}
            />
            <WeatherCard
                type="pressure"
                title="Pressure"
                value={`${current_weather.pressure_mb} mb`}
            />
            <WeatherCard
                type="cloud"
                title="Cloud Cover"
                value={`${current_weather.cloud}%`}
            />
        </div>

    </div>
  )
}
