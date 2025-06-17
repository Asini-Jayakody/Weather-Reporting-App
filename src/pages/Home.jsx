import React, { useEffect, useState } from 'react'
import { getCurrentWeather } from '../services/weatherAPI.js'
import SidePannel from '../components/sidePannel.jsx'
import CurrentWeather from '../components/CurrentWeather.jsx'
import Forecast from '../components/Forecast.jsx'

export default function Home({location}) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  const num_days = 3

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCurrentWeather(location,num_days, formattedDate)
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

  console.log(weather)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-900 pt-20">
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {weather && (
            <div className="w-full lg:w-1/3">
              {/* <div className="bg-blue-200 rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl"> */}
              <div className="bg-transparent p-6 transform transition-all duration-300">
                <SidePannel
                  weather={weather}
                />
              </div>
            </div>
          )}

          <div className="w-full lg:w-2/3">
            <div className="bg-blue-200 rounded-2xl shadow-lg p-6 mb-8">
              {weather && 
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Weather Details {weather.location.name}</h1>
                </div>
              }

              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-700">Error: {error.message}</p>
                </div>
              )}

              {weather && (
                <div className="gap-20 flex flex-col">
                  <div>
                    <Forecast data={weather.forecast.forecastday[0].hour} localTime={weather.location.localtime}/>
                  </div>
                  <div>
                    <CurrentWeather current_weather={weather.current} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
