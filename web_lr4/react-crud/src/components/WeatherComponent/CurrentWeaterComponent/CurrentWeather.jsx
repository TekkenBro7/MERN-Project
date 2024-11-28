import React from "react";
import './currentWeather.css'
const CurrentWeather = ({ data }) => {
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="weather-description">{data.weather[0].description}</p>
                </div>
                <img alt="weather" className='weather-icon' src={`icons/${data.weather[0].icon}.png`} />
            </div>
            <div className="bottom">
                <p className="temperature">{Math.round(data.main.temp)}°C</p>
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Детали</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Чувствуется как</span>
                        <span className="parameter-value">{Math.round(data.main.feels_like)}°C</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Ветер</span>
                        <span className="parameter-value">{data.wind.speed} м/с</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Влажность</span>
                        <span className="parameter-value">{data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Давление</span>
                        <span className="parameter-value">{data.main.pressure} ммРтСт</span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default CurrentWeather;