import React, { use, useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { fetchLocation } from '../services/weatherAPI';

export default function Header({onSearch}) {
  const [searchLocation, setSearchLocation] = useState('')
  const [suggestions, setSuggestions] = useState([]);

  console.log(suggestions)

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchLocation)
        setSearchLocation('');
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
    <header className="w-full bg-cyan-200 shadow-sm py-4 fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 relative">
        <h1 className="font-bold text-sm sm:text-xl text-left absolute left-4">
          <span className="text-">Weather</span>
          <span className="text-slate-700">Master</span>
        </h1>

        <div className="w-full flex justify-center">
          <div className="bg-cyan-100 p-2 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search Location"
              className="bg-transparent focus:outline-none w-24 sm:w-64 text-sm"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }}}
            />
            <button onClick={handleSearch} className='hover:cursor-pointer'><IoIosSearch /></button>
            {suggestions.length > 0 && (
            <ul className="absolute top-12 bg-white w-64 rounded-md shadow-md z-50 text-sm">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-cyan-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(`${item.lat},${item.lon}`)}
                >
                  {item.name}, {item.region ? `${item.region},` : ''} {item.country}
                </li>
              ))}
            </ul>
          )}
          </div>
        </div>
      </div>
    </header>
  );
}
