import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function Forecast({data}) {
  const processedData = data.map((hour) => ({
      hour: new Date(hour.time).getHours() + ":00",
      temp: hour.temp_c,
      icon: hour.condition.icon,
      text: hour.condition.text,
    }));

    console.log(processedData)
  
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        const { temp, icon, text } = payload[0].payload
        return (
          <div className="bg-white p-3 rounded shadow text-sm">
            <p className="font-semibold">{label}</p>
            <img src={icon} alt="icon" className="w-8 h-8 inline-block mr-2" />
            <span>{text}</span>
            <p>{temp}°C</p>
          </div>
        )
      }
      return null
    };
  
    return (
      <div className="h-64 w-full">
        <h2 className="text-xl font-semibold mb-4">Today's Temperature Forecast</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedData}>
            <XAxis dataKey="hour" />
            <YAxis domain={["auto", "auto"]} unit="°C" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
}
