import React, { useEffect, useState } from 'react'
import { getCurrentWeather } from '../services/weatherAPI.js'
import WeatherCard from '../components/WeatherCard.jsx'
import SidePannel from '../components/sidePannel.jsx'

export default function Home() {
  const [location, setLocation] = useState('Colombo')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCurrentWeather(location)
        setWeather(data)
      } catch (error) {
        setError(error)
        setWeather(null)
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [location])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Side Panel */}
          {weather && (
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl">
                <SidePannel
                  location={weather.location}
                  time={weather.current.last_updated}
                  temparature={weather.current.temp_c}
                  condition={weather.current.condition}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
                Weather in {location}
              </h1>

              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-700">Error: {error.message}</p>
                </div>
              )}

              {weather && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  <WeatherCard
                    type="temperature"
                    title="Temperature"
                    value={`${weather.current.temp_c}°C`}
                  />
                  <WeatherCard
                    type="humidity"
                    title="Humidity"
                    value={`${weather.current.humidity}%`}
                  />
                  <WeatherCard
                    type="wind"
                    title="Wind"
                    value={`${weather.current.wind_kph} km/h`}
                  />
                  <WeatherCard
                    type="uv"
                    title="UV Index"
                    value={weather.current.uv}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
