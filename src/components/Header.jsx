import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";

export default function Header({onSearch}) {
  const [searchLocation, setSearchLocation] = useState('')

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchLocation)
    }

  return (
    <header className="w-full bg-white shadow-sm py-4 fixed top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 relative">
        <h1 className="font-bold text-sm sm:text-xl text-left absolute left-4">
          <span className="text-slate-500">Weather</span>
          <span className="text-slate-700">Master</span>
        </h1>

        <div className="w-full flex justify-center">
          <div className="bg-slate-100 p-2 rounded-lg flex items-center">
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
          </div>
        </div>
      </div>
    </header>
  );
}
