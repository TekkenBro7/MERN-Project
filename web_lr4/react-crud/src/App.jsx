import './App.css';
import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/RegisterComponent/RegisterPage';
import LoginPage from './components/LoginComponent/LoginPage';
import MainPage from './components/MainPageComponent/MainPage';
import AddCar from './components/AddCarComponent/AddCar';
import CarDetailPage from './components/CarDetailPageComponent/CarDetailPage';
import { AuthContext } from './utils/AuthContext';
import ProtectedRoute from './components/ProtectedRouteComponent/ProtectedRoute';
import AuthRoute from './components/AuthRouteComponent/AuthRoute';
import Header from './components/HeaderComponent/Header';
import Footer from './components/FooterComponent/Footer';
import HackerNews from './components/HackerNewsComponent/HackerNews';
import Weather from './components/WeatherComponent/Weather';
import Vacancies from './components/VacanciesComponent/Vacancies';

function App() {
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (token) {
            login(token);
            window.history.replaceState({}, document.title, '/');
        }
    }, [login]);

    return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <br/><br/><br/><br/><br/>
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<MainPage/> } />
                            <Route path="/register" element={<AuthRoute element={RegisterPage} />} />
                            <Route path="/login" element={<AuthRoute element={LoginPage} />} />
                            <Route path="/add-car" element={<ProtectedRoute element={AddCar} redirectTo="/login" />} />
                            <Route path="/car_detail/:id" element={<CarDetailPage />} />
                            <Route path="/hacker-news" element={<ProtectedRoute element={HackerNews} redirectTo="/login" />} />
                            <Route path="/weather" element={<ProtectedRoute element={Weather} redirectTo="/login" />} />
                            <Route path="/vacancies" element={<ProtectedRoute element={Vacancies} redirectTo="/login" />} />
                        </Routes>
                    </main>
                    <br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/>
                    <Footer />
                </div>
            </BrowserRouter>
    );
}

export default App;