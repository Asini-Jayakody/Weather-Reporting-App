import React from 'react';
import Temperature from '../assets/temp.svg'; 
import Humidity from '../assets/humidity.svg'; 
import Wind from '../assets/wind.svg'; 
import UV from '../assets/uv.svg'; 

const imageMap = {
  humidity: Humidity,
  wind: Wind,
  uv: UV,
  temperature: Temperature,
};

export default function WeatherCard({ type, title, value }) {
  return (
    <div className="bg-cyan-500 rounded-2xl shadow-md px-4 h-28 flex items-center justify-between w-full max-w-sm hover:shadow-xl">
      
      <div className="flex flex-col justify-center h-full">
        <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
        <p className="text-xs text-gray-500 capitalize">Now {type}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>

      <div className="ml-4 rounded-xl p-2 w-16 h-20 flex items-center justify-center">
        <img
            src={imageMap[type?.toLowerCase()]}
            alt={type}
        />
      </div>

    </div>
  );
}



// <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center">
//   <div className="mb-2">
//     {iconMap[type?.toLowerCase()] || <WiDaySunny size={40} />}
//   </div>
//   <h3 className="text-md font-semibold text-gray-700">{title}</h3>
//   <p className="text-xl font-bold text-gray-900">{value}</p>
//   {label && (
//     <span className="text-sm mt-1 px-2 py-0.5 bg-red-100 text-red-500 rounded-full">
//       {label}
//     </span>
//   )}
// </div>

// const iconMap = {
//   humidity: <WiHumidity size={40} className="text-blue-500" />,
//   wind: <WiStrongWind size={40} className="text-blue-500" />,
//   precipitation: <WiRaindrop size={40} className="text-blue-500" />,
//   "feels like": <WiThermometer size={40} className="text-blue-500" />,
//   uv: <WiDaySunny size={40} className="text-yellow-500" />,
//   pressure: <WiBarometer size={40} className="text-blue-500" />,
// };