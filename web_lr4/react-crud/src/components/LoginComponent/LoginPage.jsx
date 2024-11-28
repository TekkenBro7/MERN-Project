import React, { useState, useContext } from 'react';
import './login.css'
import { useNavigate, useLocation  } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';

const LoginPage = ({ onLogin, isAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Хук для навигации
    const location = useLocation(); // Хук для получения текущей путей
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                login(data.token);
                navigate(from, { replace: true });
            } else {
                setMessage('Ошибка при входе. Пожалуйста, проверьте ваши данные.');
            }
        } catch (error) {
            console.log('Ошибка при получении ответа:', error);
            setMessage('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
        }
    };

    return (
        <div className="container">
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputBox">
                    <label htmlFor="username">Имя пользователя:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="inputBox">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
            {message && <div className="message">{message}</div>}
            <div class="social-login">
                <a href="http://localhost:8080/auth/google">Войти через Google<img src="https://static-00.iconduck.com/assets.00/google-icon-256x256-wita02d9.png" alt="Google"></img></a>
                <a href="http://localhost:8080/auth/facebook">Войти через Facebook <img src="https://cdn.pixabay.com/photo/2018/05/08/18/25/facebook-3383596_960_720.png" alt="Facebook"></img></a>
            </div>
        </div>
    );
};

export default LoginPage;