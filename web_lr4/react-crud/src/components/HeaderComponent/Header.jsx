import React from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContext';
import './header.css';

const Header = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <img src="https://img.freepik.com/premium-vector/rent-car-logo-design-concept-vector-art-illustration_761413-36225.jpg?w=360" alt="Логотип" className="logo-img" />
                        CarRental
                    </Link>
                </div>
                <AuthContext.Consumer>
                    {({ isAuthenticated, logout }) => (
                        <div className="nav-links">
                            {isAuthenticated ? (
                                <>
                                    <Link className="nav-link" to="/add-car">Добавить машину</Link>
                                    <Link className="nav-link" to="/hacker-news">Новости</Link>
                                    <Link className="nav-link" to="/weather">Погода</Link>
                                    <Link className="nav-link" to="/vacancies">Вакансии</Link>
                                    <button className="logout-button" onClick={logout}>Выйти</button>
                                </>
                            ) : (
                                <>
                                    <Link className="nav-link" to="/register">Регистрация</Link>
                                    <Link className="nav-link" to="/login">Вход</Link>
                                </>
                            )}
                        </div>
                    )}
                </AuthContext.Consumer>
            </div>
        </nav>
    );
};

export default Header;