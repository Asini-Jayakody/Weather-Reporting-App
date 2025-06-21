import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { fetchLocation } from '../services/weatherAPI';

export default function Search({onSearch}) {
    const [searchLocation, setSearchLocation] = useState('')
    const [suggestions, setSuggestions] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchLocation)
        setSearchLocation('');
        setSuggestions([])
    }

    const handleSuggestionClick = (location) => {
        onSearch(location);
        setSearchLocation('');
        setSuggestions([]);
    }

    useEffect(() => {
        const fetchLocationData = async () => {
        if (searchLocation.trim() !== '') {
            try {
            const locationData = await fetchLocation(searchLocation);
            if (locationData && locationData.length > 0) {
                setSuggestions(locationData);
            } else {
                setSuggestions([]);
            }
            } catch (error) {
            console.error('Error fetching location:', error);
            }
        }
        };

        if (searchLocation) {
        fetchLocationData();
        }
    }, [searchLocation]);

    return (
        <div className="w-full flex justify-center">
            <div className="relative w-full max-w-md">
            <div className="bg-cyan-100 p-2 rounded-lg flex items-center">
                <input
                type="text"
                placeholder="Search Location"
                className="w-full px-4 rounded-md focus:outline-none"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                    handleSearch(e);
                    }
                }}
                />
                <button onClick={handleSearch} className="hover:cursor-pointer ml-2">
                <IoIosSearch />
                </button>
            </div>

            {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-md z-50 text-sm">
                {suggestions.map((item) => (
                    <li
                    key={item.id}
                    className="px-4 py-2 hover:bg-cyan-100 cursor-pointer"
                    onClick={() =>
                        handleSuggestionClick(`${item.lat},${item.lon}`)
                    }
                    >
                    {item.name}, {item.region ? `${item.region},` : ''} {item.country}
                    </li>
                ))}
                </ul>
            )}
            </div>
        </div>
    );



}

// return (
//   <div className="w-full flex">
//       <div className="bg-cyan-100 p-2 rounded-lg flex items-center">
//           <input
//               type="text"
//               placeholder="Search Location"
//               className="w-full max-w-full px-4 rounded-md focus:outline-none"
//               value={searchLocation}
//               onChange={(e) => setSearchLocation(e.target.value)}
//               onKeyDown={(e) => {
//               if (e.key === 'Enter') {
//                   handleSearch(e);
//               }}}
//           />
//           <button onClick={handleSearch} className='hover:cursor-pointer'><IoIosSearch /></button>
//           {suggestions.length > 0 && (
//           <ul className="absolute top-22 bg-white w-64 rounded-md shadow-md z-50 text-sm">
//               {suggestions.map((item) => (
//               <li
//                   key={item.id}
//                   className="px-4 py-2 hover:bg-cyan-100 cursor-pointer"
//                   onClick={() => handleSuggestionClick(`${item.lat},${item.lon}`)}
//               >
//                   {item.name}, {item.region ? `${item.region},` : ''} {item.country}
//               </li>
//               ))}
//           </ul>
//           )}
//       </div>
//   </div>
// )