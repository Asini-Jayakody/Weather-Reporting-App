const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export const getCurrentWeather = async (location,num_days, date) => {
    try {
        // const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${location}&key=${API_KEY}`)
        // const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${location}&days=${num_days}&dt=${date}&key=${API_KEY}`)
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${location}&days=${num_days}&key=${API_KEY}`)
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`${errorData.error.code}: ${errorData.error.message}`)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        throw error
    }
}


export const fetchLocation = async (query) => {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?q=${query}&key=${API_KEY}`)

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(`${errorData.error.code}: ${errorData.error.message}`)
        }

        const data = await response.json()
        return data
        
    } catch (error) {
        throw error
    }
}