import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="container-footer">
                <div className="footer-content">
                    <h3>О компании</h3>
                    <p>© 2024 ООО «Прокат Прериум» — прокат и аренда автомобилей в Минске</p>
                    <p>Оплата аренды автомобиля картой Visa. Принимаем к оплате Mastercard. Сделать платеж за прокат автомобиля через Belcart, Zaka, Assist.</p>
                </div>
                <div className="footer-content">
                    <h3>Быстрые ссылки</h3>
                    <ul className="list">
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Services</a></li>
                        <li><a href="/">Products</a></li>
                        <li><a href="/">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-content">
                    <h3>Наши контакты</h3>
                    <p>Почта: info@example.com</p>
                    <p>Телефон: +121 56556 565556</p>
                    <p>Адресс: г. Минск, ул. Колесникова, 44, офис 3а</p>
                </div>
                <div className="footer-content">
                    <h3>Подпишись на нас</h3>
                    <ul className="social-icons">
                        <li><a href="/"><img src="https://cdn.pixabay.com/photo/2018/05/08/18/25/facebook-3383596_960_720.png" alt="Facebook" /></a></li>
                        <li><a href="/"><img src="https://cdn-icons-png.flaticon.com/512/3938/3938028.png" alt="Twitter" /></a></li>
                        <li><a href="/"><img src="https://cdn.pixabay.com/photo/2018/05/08/18/25/facebook-3383596_960_720.png" alt="Instagram" /></a></li>
                        <li><a href="/"><img src="https://cdn.worldvectorlogo.com/logos/linkedin-icon.svg" alt="LinkedIn" /></a></li>
                    </ul>
                </div>
            </div>
            <div className="bottom-bar">
                <p>&copy; 2024. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;