import React, { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function HourlyForecast({ today_data, tommorow_data, localTime }) {
  const [pageSize, setPageSize] = useState(6)
  const now = new Date();
  const options = {
    timeZone: localTime,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const dateTime = new Intl.DateTimeFormat('en-US', options).format(now)
  const [currentHour, currentMinute, currentSecs] = dateTime.split(":");
  const [select, setSelect] = useState("rain")

  const filtered_today = today_data
    .filter((hour) => new Date(hour.time).getHours() >= currentHour)
    .map((hour) => ({
      time: new Date(hour.time).getHours() + ":00",
      date: new Date(hour.time).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
      temp: hour.temp_c,
      rain: hour.chance_of_rain || 0,
      snow: hour.chance_of_snow || 0,
      humidity: hour.humidity,
      // wind: hour.wind_kph,
      icon: hour.condition.icon,
    }));


  const filtered_tommorow = tommorow_data
    .map((hour) => ({
      time: new Date(hour.time).getHours() + ":00",
      date: new Date(hour.time).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }),
      isDummy: false,
      temp: hour.temp_c,
      rain: hour.chance_of_rain || 0,
      snow: hour.chance_of_snow || 0,
      humidity: hour.humidity,
      // wind: hour.wind_kph,
      icon: hour.condition.icon,
    }));

  const combinedData = [...filtered_today, ...filtered_tommorow];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setPageSize(4);          // mobile
      else if (width < 768) setPageSize(6);     // tablets
      else if (width < 1024) setPageSize(8);    // small desktops
      else setPageSize(10);                     // large screens
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const pagedData = useMemo(() => {
    const pages = [];
    for (let i = 0; i < combinedData.length; i += pageSize) {
      pages.push(combinedData.slice(i, i + pageSize));
    }
  
    if (pages.length > 0) {
      const lastPage = pages[pages.length - 1];
      const dummyCount = pageSize - lastPage.length;
      if (dummyCount > 0) {
        for (let i = 0; i < dummyCount; i++) {
          lastPage.push({
            time: `dummy-${pages.length - 1}-${i}`,
            date: "",
            isDummy: true,
            rain: null,
            snow: null,
            humidity: null,
          });
        }
      }
    }

    return pages;
  }, [combinedData, pageSize]);




  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { temp, icon } = payload[0].payload;
      const value = payload[0].payload[select]
      return (
        <div className="bg-white p-2 rounded shadow text-sm">
          <div className="flex items-center gap-2 mb-1">
            <img src={icon} alt="icon" className="w-6 h-6" />
            <p className="font-semibold">{label}</p>
          </div>
          <p>Temp: {temp}°C</p>
          <p>{select.charAt(0).toUpperCase() + select.slice(1)}: {value}{select === "humidity" || select === "rain" || select === "snow" ? "%" : " km/h"}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-cyan-500 rounded-xl shadow p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
      {/* <div className="flex justify-between items-center"> */}
        <h2 className="text-lg font-semibold">Upcoming Hours</h2>
        <select name="weather" id="weather" className="w-fit border border-b-black rounded px-2 py-1 text-sm" value={select} onChange={(e)=>{setSelect(e.target.value)}}>
          <option value="rain">Rain Chance (%)</option>
          <option value="humidity">Humidity (%)</option>
          <option value="snow">Snow Chance (%)</option>
          {/* <option value="wind">Wind (km/h)</option> */}
        </select>
      </div>

      <div className="relative px-5">
        <Swiper 
          modules={[Navigation]} 
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          slidesPerView={1} 
          spaceBetween={20} 
          className="w-full"
        >
          {pagedData.map((page, pageIndex) => (
            <SwiperSlide key={pageIndex}>
              <div className="flex justify-between mt-4 text-center">
                {page.map((hour, i) => (
                  <div key={hour.time} className="flex flex-col items-center text-sm w-10 h-20 mb-3">
                    {!hour.isDummy &&
                      <>
                        <span className="font-semibold mb-1">{hour.date}</span>
                        { pageIndex === 0 && i === 0 ? <span className="font-semibold">Now</span> : <span>{hour.time}</span> }
                        <img src={hour.icon} alt="icon" className="w-6 h-6 mb-1" />
                        <span className="font-semibold">{hour.temp}°</span>
                      </>
                    }
                  </div>
                ))}
              </div>

              <ResponsiveContainer width="100%" height={95}>
                <AreaChart data={page}>
                  <YAxis domain={[0, 100]} hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={select}
                    stroke="#0e7490"
                    fill="#bfdbfe"
                    strokeWidth={2}
                    connectNulls={false}
                  />
                  <CartesianGrid vertical={true} horizontal={false} stroke="black" />
                </AreaChart>
              </ResponsiveContainer>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 -left-3 z-10 bg-white/20 hover:bg-white/40 p-1 rounded-full transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 -right-3 z-10 bg-white/20 hover:bg-white/40 p-1 rounded-full transition">
          <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
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

