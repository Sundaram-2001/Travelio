import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENWEATHER_API_KEY;

export async function fetchWeather(city) {
    try {
        // 1. Corrected the URL syntax: q=${city} and appid=${apiKey}
        const geoResponse = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        );

        // 2. You must await the .json() before checking the data length
        const geoData = await geoResponse.json();

        // 3. Check if the API returned an empty list (city not found)
        if (!geoData || geoData.length === 0) {
            console.error(`Geocoding error: No coordinates found for ${city}`);
            return null;
        }

        // 4. Extract lat and lon from the first result
        const { lat, lon } = geoData[0];

        // 5. Fetch the actual weather using the coordinates
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        const weatherResult = await weatherResponse.json();

        // 6. Return a cleaned object for your UI
        return {
            temp: Math.round(weatherResult.main.temp),
            description: weatherResult.weather[0].description,
            icon: weatherResult.weather[0].icon,
            city: geoData[0].name // Use the name from geoData
        };

    } catch (error) {
        console.error("Code break in fetching weather:", error.message);
        return null;
    }
}