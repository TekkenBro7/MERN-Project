import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const { username, email, password } = this.state;
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                alert('Пользователь успешно зарегистрирован!');
                this.setState({ username: '', email: '', password: '' });
            } else {
                alert('Ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert(error);
        }
    };
    render() {
        const { username, email, password } = this.state;
        return (
            <div className="container-register">
                <h2>Регистрация</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Имя пользователя:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Зарегистрироваться</button>
                </form>
                <p>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
            </div>
        );
    }
}

export default RegisterPage;
