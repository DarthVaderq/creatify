import React, { useContext } from "react";
import Header from "../../widgets/Header/Header";
import Footer from "../../widgets/Footer/Footer";
import "normalize.css";
import { LanguageContext } from "../../entities/LanguageContext";
import translations from "./translations-contact";
function Contact() {
  const { language } = useContext(LanguageContext); // Получаем текущий язык
  const currentContent = translations[language]; // Получаем текст на выбранном языке

  return (
    <>
    <main className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header />
      {/* Контакты */}
      <section className="bg-[#E8E8F4] py-16">
        <div className="container mx-auto text-center">
          <h2
            style={{ color: "rgba(97, 97, 195, 1)" }}
            className="text-3xl font-[550] text-[24px]"
          >
            {currentContent.title || "Контакты"}
          </h2>
          <p className="text-[38px] font-bold mt-4">
            {currentContent.description}
          </p>

          {/* Контактная информация */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center bg-white rounded-[15px] shadow-md p-6">
              <img
                src="src/shared/assets/contacts-images/phone.png"
                alt="Позвонить"
                className="w-12 h-12 mb-4"
              />
              <p className="text-lg font-medium text-gray-800">
                {currentContent.Cart1}
              </p>
              <p className="text-gray-600 mt-2">+996 505 440 682</p>
            </div>
            <div className="flex  flex-col items-center bg-white rounded-[15px] shadow-md p-6">
              <img
                src="src/shared/assets/contacts-images/email.png"
                alt="Написать"
                className="w-12 mt-[5px] h-10 mb-4"
              />
              <p className="text-lg font-medium text-gray-800">
                {currentContent.Cart2}
              </p>
              <p className="text-gray-600 mt-2">Billshifr95@gmail.com</p>
            </div>
            <div className="flex flex-col items-center bg-white rounded-[15px] shadow-md p-6">
              <img
                src="src/shared/assets/contacts-images/map.png"
                alt="Местоположение"
                className="w-9 h-12 mb-4"
              />
              <p className="text-lg font-medium text-gray-800">
                {currentContent.Cart3}
              </p>
              <p className="text-gray-600 mt-2">Бишкек, 720072, Кыргызстан</p>
            </div>
          </div>
        </div>
      </section>
      {/* Форма обратной связи */}
      <section className="bg-[white] py-16">
        <div className="flex flex-col items-center container mx-auto">
          <p className="text-center flex justify-center items-center rounded-[17px] mb-10 bg-[#E8E8F4] h-[41px] w-[351px]">
            <img
              className="mr-2"
              src="src/shared/assets/contacts-images/smile.png"
              alt="smile"
            />
            {currentContent.contactSubtitle}
          </p>
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            {currentContent.contactTitle}
          </h3>
          <p className="text-gray-600 text-center mt-4">
            {currentContent.contactDescription}
          </p>

          <form className="mt-8 max-w-3xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder={currentContent.contactLastName}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder={currentContent.contactFirstName}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <input
              type="email"
              placeholder={currentContent.contactEmail}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder={currentContent.contactMessage}
              rows="5"
              className="w-full resize-none p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-4 rounded-lg hover:bg-purple-600 transition"
            >
              {currentContent.contactButton}
            </button>
          </form>
        </div>
      </section>
      {/* Карта */}
      <section className="bg-[#E8E8F4] py-16">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 text-center">
            {currentContent.ourLocation}
          </h3>
          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.123456789!2d74.567890!3d42.876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ecf123456789%3A0xabcdef123456789!2sZelenaya%20Zona!5e0!3m2!1sen!2skg!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
    </>
  );
}

export default Contact;
