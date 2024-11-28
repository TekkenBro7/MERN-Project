import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';
import { Link } from 'react-router-dom';
import './mainPage.css';
import moment from 'moment-timezone';

const MainPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [userTimezone, setUserTimezone] = useState('');
    const [userCurrentTime, setUserCurrentTime] = useState('');
    const [utcCurrentTime, setUtcCurrentTime] = useState('');
    const [userCreatedAt, setUserCreatedAt] = useState('');
    const [userUpdatedAt, setUserUpdatedAt] = useState('');
    const [utcCreatedAt, setUtcCreatedAt] = useState('');
    const [utcUpdatedAt, setUtcUpdatedAt] = useState('');
    const [cars, setCars] = useState([]);
    const [models, setModels] = useState([]);
    const [bodyTypes, setBodyTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://localhost:8080/auth/user-info', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUsername(data.user.username);
                        setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
                        setUserCurrentTime(moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm'));
                        setUtcCurrentTime(moment().utc().format('YYYY-MM-DD HH:mm'));
                        setUserCreatedAt(moment(data.user.createdAt).format('YYYY-MM-DD HH:mm'));
                        setUserUpdatedAt(moment(data.user.updatedAt).format('YYYY-MM-DD HH:mm'));
                        setUtcCreatedAt(moment(data.user.createdAt).utc().format('YYYY-MM-DD HH:mm'));
                        setUtcUpdatedAt(moment(data.user.updatedAt).utc().format('YYYY-MM-DD HH:mm'));
                    } else {
                        console.error('Не удалось получить данные пользователя');
                    }
                } catch (error) {
                    console.error('Ошибка при получении данных пользователя:', error);
                }
            }
        };

        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/cars');
                if (response.ok) {
                    const data = await response.json();
                    setCars(data);
                } else {
                    console.error('Не удалось получить список машин');
                }
            } catch (error) {
                console.error('Ошибка при получении списка машин:', error);
            }
        };

        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/car_models');
                if (response.ok) {
                    const data = await response.json();
                    setModels(data);
                } else {
                    console.error('Не удалось получить модели');
                }
            } catch (error) {
                console.error('Ошибка при получении моделей:', error);
            }
        };
    
        const fetchBodyTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/body_types');
                if (response.ok) {
                    const data = await response.json();
                    setBodyTypes(data);
                } else {
                    console.error('Не удалось получить типы кузова');
                }
            } catch (error) {
                console.error('Ошибка при получении типов кузова:', error);
            }
        };
        if (isAuthenticated) {
            fetchUserInfo();
        }
        fetchCars();
        fetchModels();
        fetchBodyTypes();
    }, [isAuthenticated]);

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };
    const filteredAndSortedCars = cars.filter(car => {
        const carModel = models.find(model => model.id === car.model);
        const carBodyType = bodyTypes.find(bodyType => bodyType.id === car.body_type);
        const searchString = searchQuery.toLowerCase();
        return (
            car.license_plate?.toLowerCase().includes(searchString) ||
            car.year?.toString().includes(searchString) ||
            carModel?.brand?.toLowerCase().includes(searchString) ||
            carModel?.name?.toLowerCase().includes(searchString) ||
            carBodyType?.name?.toLowerCase().includes(searchString) ||
            car.car_cost.$numberDecimal?.toLowerCase().includes(searchString) ||
            car.rental_cost_per_day.$numberDecimal?.toLowerCase().includes(searchString)
        );
    })
    .sort((a, b) => {
        if (!sortField) return 0;

        const getValue = (car) => {
            const carModel = models.find(model => model.id === car.model);
            const carBodyType = bodyTypes.find(bodyType => bodyType.id === car.body_type);
            switch (sortField) {
                case 'license_plate': return car.license_plate || '';
                case 'year': return car.year || 0;
                case 'model': return (carModel?.brand || '') + (carModel?.name || '');
                case 'body_type': return carBodyType?.name || '';
                case 'car_cost': return parseFloat(car.car_cost.$numberDecimal) || 0;
                case 'rental_cost': return parseFloat(car.rental_cost_per_day.$numberDecimal) || 0;
                default: return '';
            }
        };
        const valueA = getValue(a);
        const valueB = getValue(b);
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    return (
        <div>
            <h1 className="title">Добро пожаловать в наше приложение</h1>
            <div className="main-container">
                {isAuthenticated ? (
                    <>
                        <div className="user-info">
                            <p className="info">Вы авторизованы как: <strong>{username}</strong></p>
                            <p className="info">Тайм-зона пользователя: <strong>{userTimezone}</strong></p>
                            <p className="info">Текущая дата (в тайм-зоне пользователя): <strong>{userCurrentTime}</strong></p>
                            <p className="info">Текущая дата (в UTC): <strong>{utcCurrentTime}</strong></p>
                            <p className="info">Дата создания аккаунта (тайм-зона пользователя): <strong>{userCreatedAt}</strong></p>
                            <p className="info">Дата последнего изменения (тайм-зона пользователя): <strong>{userUpdatedAt}</strong></p>
                            <p className="info">Дата создания аккаунта (UTC): <strong>{utcCreatedAt}</strong></p>
                            <p className="info">Дата последнего изменения (UTC): <strong>{utcUpdatedAt}</strong></p>
                        </div>                        
                    </>
                ) : (
                    <p className="not-authenticated">Вы не авторизованы. Пожалуйста, войдите в систему.</p>
                )}
            </div>
            <h1 style={{textAlign: 'center'}}>Список машин</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="sort-container">
                <select
                    value={sortField}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="sort-select"
                >
                    <option value="">Сортировать по</option>
                    <option value="license_plate">Номерной знак</option>
                    <option value="year">Год выпуска</option>
                    <option value="model">Модель</option>
                    <option value="body_type">Тип кузова</option>
                    <option value="car_cost">Стоимость машины</option>
                    <option value="rental_cost">Стоимость аренды</option>
                </select>
                <button
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    className="sort-button"
                >
                    Направление: {sortDirection === 'asc' ? 'Возрастание' : 'Убывание'}
                </button>
            </div>
            <div className="car-grid">
                {filteredAndSortedCars.map(car => {
                    const carModel = models.find(model => model.id === car.model);
                    const carBodyType = bodyTypes.find(bodyType => bodyType.id === car.body_type);
                    return (
                        <Link key={car.id} to={`/car_detail/${car.id}`} className="no-highlight-link">
                            <div className="car-info-wrapper">
                                <div className="car-info">
                                    <p>Номерной знак: {car.license_plate}</p>
                                    {car.image && <img src={`http://localhost:8080/${car.image}`} alt="Изображение машины" />}
                                    <p>Модель: {carModel ? carModel.brand + ' ' + carModel.name : 'Неизвестно'}</p> 
                                    <p>Тип кузова: {carBodyType ? carBodyType.name : 'Неизвестно'}</p>
                                    <p>Год выпуска: {car.year}</p>
                                    <p>Стоимость машины: {car.car_cost.$numberDecimal}</p> 
                                    <p>Стоимость аренды в день: {car.rental_cost_per_day.$numberDecimal}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPage;
