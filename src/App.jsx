import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import { useSearchParams } from 'react-router-dom'

function AppWrapper() {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = searchParams.get('location') || 'Colombo'

  const handleLocationChange = (newLocation) => {
    setSearchParams({ location: newLocation })
  }

  return (
    <>
      <Header onSearch={handleLocationChange} />
      <Routes>
        <Route path="/" element={<Home location={location} />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  )
}





// import { BrowserRouter, Route, Routes, useSearchParams } from 'react-router-dom'
// import Home from './pages/Home'
// import Header from './components/Header'
// import { useState } from 'react'

// function App() {
//   const [location, setLocation] = useState('Colombo')


//   return <BrowserRouter>
//   <Header onSearch={setLocation} /> 

//   <Routes>
//     <Route path='/' element={<Home location={location} />} />
//   </Routes>
//   </BrowserRouter>
// }

// export default App
