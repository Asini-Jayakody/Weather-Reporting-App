import React from 'react'
import { Sunrise, Sunset, MapPin } from 'lucide-react'

export default function SidePannel({ weather }) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
  const now = new Date();
  const options = {
    timeZone: weather.location.tz_id,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const dateTime = new Intl.DateTimeFormat('en-US', options).format(now)
  console.log(dateTime)
  const [dayPart, datePart, timePart] = dateTime.split(",");
  console.log(dayPart, datePart, timePart)

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-lg font-medium text-gray-700">
          <MapPin size={20} className="text-blue-500" />
          <span>{weather.location.name}, {weather.location.country}</span>
        </div>
        <div className="space-y-2">
          <div className="text-gray-600 font-medium">Today {dayPart}, {datePart}</div>
          <div className="text-gray-600 font-medium">{timePart}</div>
        </div>
      </div>

      <div className="text-center space-y-6">
        <div className="text-8xl font-bold text-gray-800">
          {weather.current.temp_c}°
        </div>
        <div className="flex items-center justify-center gap-3 text-xl font-medium text-gray-700">
          <img 
            src={`https:${weather.current.condition.icon}`} 
            alt={weather.current.condition.text} 
            className="w-12 h-12"
          />
          <span>{weather.current.condition.text}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 text-gray-600">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <Sunrise size={20} className="text-yellow-500" />
            <span>Sunrise</span>
          </div>
          <span className="text-sm text-gray-600">{weather.forecast.forecastday[0].astro.sunrise}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <Sunset size={20} className="text-orange-500" />
            <span>Sunset</span>
          </div>
          <span>{weather.forecast.forecastday[0].astro.sunset}</span>
        </div>
      </div>
    </div>
  )
}



