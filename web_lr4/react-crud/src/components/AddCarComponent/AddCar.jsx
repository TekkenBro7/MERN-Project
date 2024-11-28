import React, { useState, useEffect } from 'react';
import './addCar.css'; 
import { useNavigate, useLocation } from 'react-router-dom'; 

const CarForm = () => {
    const [licensePlate, setLicensePlate] = useState('');
    const [modelId, setModelId] = useState('');
    const [bodyTypeId, setBodyTypeId] = useState('');
    const [year, setYear] = useState('');
    const [carCost, setCarCost] = useState('');
    const [rentalCostPerDay, setRentalCostPerDay] = useState('');
    const [image, setImage] = useState(null);
    const [models, setModels] = useState([]);
    const [bodyTypes, setBodyTypes] = useState([]);
    const [, setErrors] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/car_models');
                if (response.ok) {
                    const data = await response.json();
                    setModels(data);
                } else {
                    console.error('Ошибка при загрузке моделей');
                }
            } catch (error) {
                console.error('Ошибка при загрузке моделей:', error);
            }
        };
        const fetchBodyTypes = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/body_types');
                if (response.ok) {
                    const data = await response.json();
                    setBodyTypes(data);
                } else {
                    console.error('Ошибка при загрузке типов кузова');
                }
            } catch (error) {
                console.error('Ошибка при загрузке типов кузова:', error);
            }
        };
        fetchModels();
        fetchBodyTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('license_plate', licensePlate);
        formData.append('model', modelId);
        formData.append('body_type', bodyTypeId);
        formData.append('year', year);
        formData.append('car_cost', carCost);
        formData.append('rental_cost_per_day', rentalCostPerDay);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:8080/api/cars', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Машина успешно добавлена');
                setErrors({});
                navigate(from, { replace: true });
            } else {
                alert('Ошибка при добавлении машины');
                const errorData = await response.json();
                setErrors(errorData.errors);
                console.error('Ошибка при добавлении машины:', errorData.errors);
            }
        } catch (error) {
            console.error('Ошибка при добавлении машины:', error);
        }
    };

    return (
        <div>
        <h1>Добавление машины</h1>
            <form onSubmit={handleSubmit} className="car-form">
                <div className="form-group">
                    <label>Номерной знак:</label>
                    <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Модель:</label>
                    <select
                        value={modelId}
                        onChange={(e) => setModelId(e.target.value)}
                        required
                        className="form-select"
                    >
                        <option value="">Выберите модель</option>
                        {models.map((model) => (
                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Тип кузова:</label>
                    <select
                        value={bodyTypeId}
                        onChange={(e) => setBodyTypeId(e.target.value)}
                        required
                        className="form-select"
                    >
                        <option value="">Выберите тип кузова</option>
                        {bodyTypes.map((bodyType) => (
                            <option key={bodyType.id} value={bodyType.id}>
                                {bodyType.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Год выпуска:</label>
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Стоимость машины:</label>
                    <input
                        type="number"
                        value={carCost}
                        onChange={(e) => setCarCost(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Стоимость аренды в день:</label>
                    <input
                        type="number"
                        value={rentalCostPerDay}
                        onChange={(e) => setRentalCostPerDay(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Изображение:</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="form-input-file"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Добавить машину
                </button>
            </form>
        </div>
    );
};

export default CarForm;
