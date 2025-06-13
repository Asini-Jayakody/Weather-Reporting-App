import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HourlyForecast({ data, localTime }) {
  const [datePart, currentTime] = localTime.split(" ")
  const [currentHour, minute] = currentTime.split(":").map(Number);

  const filtered = data
    .filter((hour) => new Date(hour.time).getHours() >= currentHour)
    .slice(0, 8)
    .map((hour) => ({
      time: new Date(hour.time).getHours() + ":00",
      temp: hour.temp_c,
      rain: hour.chance_of_rain || 0,
      icon: hour.condition.icon,
    }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { temp, rain, icon } = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded shadow text-sm">
          <div className="flex items-center gap-2 mb-1">
            <img src={icon} alt="icon" className="w-6 h-6" />
            <p className="font-semibold">{label}</p>
          </div>
          <p>Temp: {temp}°C</p>
          <p>Rain: {rain}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Upcoming hours</h2>

      <div className="flex justify-between mt-4 text-center">
        {filtered.map((hour, i) => (
          <div key={i} className="flex flex-col items-center text-sm w-10">
            { i === 0 ? <span>Now</span> : <span>{hour.time}</span> }
            <img src={hour.icon} alt="icon" className="w-6 h-6 mb-1" />
            <span>{hour.temp}°</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={filtered}>
          {/* <XAxis dataKey="rain" /> */}
          <YAxis domain={[0, 100]} hide />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="rain"
            stroke="#60a5fa"
            fill="#bfdbfe"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      
    </div>
  );
}







// import React from 'react'
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"

// export default function Forecast({data}) {
//   const processedData = data.map((hour) => ({
//       hour: new Date(hour.time).getHours() + ":00",
//       temp: hour.temp_c,
//       icon: hour.condition.icon,
//       text: hour.condition.text,
//     }));

//     console.log(processedData)
  
//     const CustomTooltip = ({ active, payload, label }) => {
//       if (active && payload && payload.length) {
//         const { temp, icon, text } = payload[0].payload
//         return (
//           <div className="bg-white p-3 rounded shadow text-sm">
//             <p className="font-semibold">{label}</p>
//             <img src={icon} alt="icon" className="w-8 h-8 inline-block mr-2" />
//             <span>{text}</span>
//             <p>{temp}°C</p>
//           </div>
//         )
//       }
//       return null
//     };
  
//     return (
//       <div className="h-64 w-full">
//         <h2 className="text-xl font-semibold mb-4">Today's Temperature Forecast</h2>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={processedData}>
//             <XAxis dataKey="hour" />
//             <YAxis domain={["auto", "auto"]} unit="°C" />
//             <Tooltip content={<CustomTooltip />} />
//             <Line
//               type="monotone"
//               dataKey="temp"
//               stroke="#3b82f6"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     )
// }
