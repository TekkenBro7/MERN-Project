import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from "react-accessible-accordion";
import './forecast.css';

const WEEK_DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const Forecast = ({data}) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    console.log(forecastDays);

    return (
        <>
            <label className="title">Daily</label>
            <Accordion allowZeroExpanded>
            {data.list.splice(0, 7).map((item, idx) => (
                <AccordionItem key={idx}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="daily-item">
                            <img src={`icons/${item.weather[0].icon}.png`} className="icon-small" alt="weather" />
                            <label className="day">{forecastDays[idx]}</label>
                            <label className="description">{item.weather[0].description}</label>
                            <label className="min-max">{Math.round(item.main.temp_max)}°C /{Math.round(item.main.temp_min)}°C</label>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="daily-details-grid">
                        <div className="daily-details-grid-item">
                            <label>Давление:</label>
                            <label>{item.main.pressure}</label>
                        </div>
                        <div className="daily-details-grid-item">
                            <label>Влажность:</label>
                            <label>{item.main.humidity}</label>
                        </div>
                        <div className="daily-details-grid-item">
                            <label>Облака:</label>
                            <label>{item.clouds.all}%</label>
                        </div>
                        <div className="daily-details-grid-item">
                            <label>Скорость ветра:</label>
                            <label>{item.wind.speed} м/с</label>
                        </div>
                        <div className="daily-details-grid-item">
                            <label>Уровень над морем:</label>
                            <label>{item.main.sea_level}м</label>
                        </div>
                        <div className="daily-details-grid-item">
                            <label>Чувствуется как:</label>
                            <label>{item.main.feels_like}°C</label>
                        </div>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
        ))}
            </Accordion>
        </>
    )
}

export default Forecast