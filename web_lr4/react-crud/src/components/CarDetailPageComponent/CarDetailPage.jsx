import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './carDetailPage.css';
import { AuthContext } from '../../utils/AuthContext';

const CarDetailPage = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate(); 
    const [car, setCar] = useState(null);
    const [model, setModel] = useState(null);
    const [bodyType, setBodyType] = useState(null);

    const [models, setModels] = useState([]);
    const [bodyTypes, setBodyTypes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const [licensePlate, setLicensePlate] = useState('');
    const [modelId, setModelId] = useState('');
    const [bodyTypeId, setBodyTypeId] = useState('');
    const [year, setYear] = useState('');
    const [carCost, setCarCost] = useState('');
    const [rentalCostPerDay, setRentalCostPerDay] = useState('');
    const [image, setImage] = useState(null);

    const [, setErrors] = useState({});

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const carResponse = await fetch(`http://localhost:8080/api/cars/${id}`);
                if (carResponse.ok) {
                    const carData = await carResponse.json();
                    setCar(carData);

                    setLicensePlate(carData.license_plate);
                    setModelId(carData.model);
                    setBodyTypeId(carData.body_type);
                    setYear(carData.year);
                    setCarCost(carData.car_cost.$numberDecimal);
                    setRentalCostPerDay(carData.rental_cost_per_day.$numberDecimal);

                    const modelResponse = await fetch(`http://localhost:8080/api/car_models/${carData.model}`);
                    if (modelResponse.ok) {
                        const modelData = await modelResponse.json();
                        setModel(modelData);
                    }

                    const bodyTypeResponse = await fetch(`http://localhost:8080/api/body_types/${carData.body_type}`);
                    if (bodyTypeResponse.ok) {
                        const bodyTypeData = await bodyTypeResponse.json();
                        setBodyType(bodyTypeData);
                    }
                } else {
                    console.error('Не удалось получить данные машины');
                }
            } catch (error) {
                console.error('Ошибка при получении данных машины:', error);
            }
        };

        const fetchModelsAndBodyTypes = async () => {
            try {
                const modelsResponse = await fetch('http://localhost:8080/api/car_models');
                const bodyTypesResponse = await fetch('http://localhost:8080/api/body_types');

                if (modelsResponse.ok && bodyTypesResponse.ok) {
                    setModels(await modelsResponse.json());
                    setBodyTypes(await bodyTypesResponse.json());
                }
            } catch (error) {
                console.error('Ошибка при получении справочных данных:', error);
            }
        };

        fetchCarDetails();
        fetchModelsAndBodyTypes();
    }, [id]);

    const handleDelete = async (carId) => {
        try {
            console.log('ID для удаления:', carId);
            const response = await fetch(`http://localhost:8080/api/cars/${carId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                alert('Машина успешно удалена!');
                window.location.href = '/';
            } else {
                const errorResponse = await response.json();
                console.error('Не удалось удалить машину:', errorResponse.message);
            }
        } catch (error) {
            console.error('Ошибка при удалении машины:', error);
        }
    };
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
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
            const response = await fetch(`http://localhost:8080/api/cars/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                alert('Машина успешно обновлена!');
                setIsEditing(false);
                const updatedCarData = await response.json();
                setCar(updatedCarData); 
                setLicensePlate(updatedCarData.license_plate);
                setModelId(updatedCarData.model);
                setBodyTypeId(updatedCarData.body_type);
                setYear(updatedCarData.year);
                setCarCost(updatedCarData.car_cost.$numberDecimal);
                setRentalCostPerDay(updatedCarData.rental_cost_per_day.$numberDecimal);
                setErrors({});
                navigate(`/car_detail/${id}`);
            } else {
                console.error('Не удалось обновить машину');
                const errorData = await response.json();
                setErrors(errorData.errors);
                console.error('Ошибка при добавлении машины:', errorData.errors);
            }
        } catch (error) {
            console.error('Ошибка при обновлении машины:', error);
            
        }
    };
    if (!car) {
        return <p>Загрузка данных о машине...</p>;
    }
    return (
        <div className="car-detail">
            <h1>Информация о машине</h1>
            {!isEditing ? (
                <>
                    <p>Номерной знак: {car.license_plate}</p>
                    {car.image && <img src={`http://localhost:8080/${car.image}`} alt="Изображение машины" />}
                    <p>Модель: {model ? `${model.brand} ${model.name}` : 'Неизвестно'}</p>
                    <p>Тип кузова: {bodyType ? bodyType.name : 'Неизвестно'}</p>
                    <p>Год выпуска: {car.year}</p>
                    <p>Стоимость машины: {car.car_cost.$numberDecimal}</p>
                    <p>Стоимость аренды в день: {car.rental_cost_per_day.$numberDecimal}</p>
                    {isAuthenticated ? (
                        <div>
                            <button onClick={() => setIsEditing(true)} className="btn btn-edit">Изменить</button>
                            <button onClick={() => handleDelete(car.id)} className="btn btn-delete">Удалить</button>
                        </div>
                    ) : (
                        <p style={{'margin-top': '50px'}}>Для редактирования машины необходимо авторизоваться.</p>
                    )}
                </>
            ) : (
                <form onSubmit={handleUpdate} className="car-form">
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
                    <button type="submit" className="btn btn-save">Сохранить</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="btn btn-cancel">Отмена</button>
                </form>
            )}
        </div>
    );
};

export default CarDetailPage;