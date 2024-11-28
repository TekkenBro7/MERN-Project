import Search from "./SearchComponent/Search";
import CurrentWeather from "./CurrentWeaterComponent/CurrentWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import { useState } from "react";
import './weater.css'
import Forecast from "./ForecatsComponent/Forecast";

function Weather() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(", ");
        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`)
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=ru`)

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forcastResponse = await response[1].json();

                setCurrentWeather({ city: searchData.label, ...weatherResponse });
                setForecast({ city: searchData.label, ...forcastResponse });
        })
        .catch((error) => console.error(error));

        console.log(searchData);
    }

    console.log(currentWeather);
    console.log(forecast);

    return (
        <div className="weather-container">
            <h1>Погода</h1>
            <Search onSearchChange={handleOnSearchChange}/>
            {currentWeather && <CurrentWeather data={currentWeather} /> }
            {forecast && <Forecast data={forecast} />}
        </div>
    );
}

export default Weather