import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { LanguageContext } from "../../entities/LanguageContext";
import translations from "./translations";
function Footer() {
    const { language, setLanguage } = useContext(LanguageContext); // Используем контекст
    const currentContent = translations[language];
  return (
    <footer className="bg-[#E8E8F4] py-8">
      <div className="container mx-auto">
        {/* Верхняя часть футера */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Контактная информация */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <img src="/public/footer-images/black-email.png" alt="Email" className="w-6 h-6" />
              <span className="text-gray-800">Billshifr95@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
            <img src="/public/footer-images/contact.png" alt="Phone" className="w-6 h-6" />
              <span className="text-gray-800">+996 505 440 682</span>
            </div>
          </div>

          {/* Логотип */}
          <div className="my-6 mr-[240px] md:my-0">
            <img src="/public/logo.png" alt="Creatify Logo" className="w-16 h-16 mx-auto" />
          </div>

          {/* Социальные иконки */}
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/public/footer-images/facebook.png" className="w-8 h-8" />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">
            <img src="/public/footer-images/google.png" className="w-8 h-8" />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <img src="/public/footer-images/telegram.png" alt="Telegram" className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="border-t border-gray-400 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          {/* Навигация */}
          <div className="flex space-x-6 text-gray-800">
            <Link to="/" className="hover:underline">{currentContent.home}</Link>
            <Link to="/about" className="hover:underline">{currentContent.about}</Link>
            <Link to="/contact" className="hover:underline">{currentContent.Contact}</Link>
            <Link to="/rating" className="hover:underline">{currentContent.Rating}</Link>
            <Link to="/login" className="hover:underline">{currentContent.login}</Link>
          </div>

          {/* Копирайт */}
          <div className="text-gray-500 mt-4 md:mt-0">
            <span className="font-bold text-gray-700">CREATIFY</span> © 2025. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;