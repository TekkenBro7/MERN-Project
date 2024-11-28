import React, { useEffect, useState } from 'react';
import './vacancies.css';

const Vacancies = () => {
    const [vacancies, setVacancies] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/vacancies')
            .then((response) => response.json())
            .then((data) => setVacancies(data))
            .catch((error) => console.error('Ошибка при загрузке вакансий:', error));
    }, []);

    return (
        <div>
            <h1>Список вакансий</h1>
            <div className="vacancies-container">
                <ul>
                    {vacancies.map((vacancy) => (
                        <li className="vacancy" key={vacancy._id}>
                            <h2>{vacancy.title}</h2>
                            <img
                                src={'vacancy.jpg'}
                                alt="vacancy"
                                className="vacancy-image"
                            />
                            <p><strong>Описание:</strong> {vacancy.description}</p>
                            <p><strong>Требования:</strong> {vacancy.requirements}</p>
                            <p><strong>Оплата:</strong> {vacancy.payment}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Vacancies;
