import React, { useContext } from "react";
import Header from "../../widgets/Header/Header";
import Footer from "../../widgets/Footer/Footer";
import "normalize.css";
import { Link, useNavigate } from "react-router-dom";
import { LanguageContext } from "../../entities/LanguageContext";
import translations from "./translations-about";
function About() {
  const { language } = useContext(LanguageContext); // Получаем текущий язык
  const currentContent = translations[language]; // Получаем текст на выбранном языке

  if (!currentContent) {
    return <p>Переводы для выбранного языка отсутствуют.</p>;
  }

  return (
    <>
    <main className="bg-[#F9FAFE] min-h-screen">
      {/* Header */}
      <Header />
      <section className="bg-[F9FAFE]  py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            {currentContent.title}
          </h1>
          <p className="text-gray-600 text-[18px] mt-[43px] max-w-2xl mx-auto">
            {currentContent.description}
          </p>
        </div>
      </section>
      {/* Преимущества */}
      <section className="bg-[#F9FAFE] py-16">
        <div className="container flex flex-col mx-auto">
          <img className="mr-10" src="src\shared\assets\about-images\Инфо.png" alt="" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {currentContent.advantages.map((advantage, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3
                  className={`text-xl mt-[35px] font-bold ${
                    index === 0
                      ? "text-red-600"
                      : index === 1
                      ? "text-yellow-500"
                      : "text-gray-800"
                  }`}
                >
                  {advantage.title}
                </h3>
                <p className="text-gray-500 mt-[18px] text-[15px] leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Как это работает */}
      <section className="bg-[#F9FAFE] mt-[150px] py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            {currentContent.howItWorksTitle || "Как это работает?"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
            {currentContent.howItWorks.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-[140px] h-[140px] object-contain mb-6"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm max-w-[220px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Почему выбирают наш сервис? */}
      <section className="bg-[#F9FAFE] py-16">
        <div className="container mx-auto ">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            {currentContent.whyChooseUsTitle}
          </h2>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {currentContent.whyChooseUs.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col  justify-center text-start p-8 rounded-[25px] transition ${
                  item.isCTA
                    ? "bg-[#7357F5] text-white cursor-pointer hover:bg-[#5f45d9]"
                    : "bg-white shadow text-gray-800"
                }`}
              >
                {item.icon && !item.isCTA && (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-[50px] h-[50px] object-contain mb-4"
                  />
                )}
                <h3
                  className={`text-[18px] font-bold mb-2 ${
                    item.isCTA ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>
                {item.description && !item.isCTA && (
                  <p className="text-[13px] text-gray-600 max-w-[250px]">
                    {item.description}
                  </p>
                )}
                {item.isCTA && (
                  <Link
                    to="/login"
                    className="flex items-center mt-[120px] tracking-wide text-[16px] font-medium"
                  >
                    {currentContent.buttonUsTitle ||
                      "Зарегистрироваться и начать создавать проекты"}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Вопросы и ответы */}
      <section className="bg-[#F9FAFE] py-16">
        <div className="container mx-auto max-w-4xl text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800">
            {currentContent.faqTitle || "Вопросы и Ответы"}
          </h2>
          <div className="mt-12 space-y-6 text-left">
            {currentContent.faq.map((item, index) => (
              <details
                key={index}
                className="group bg-white shadow-md rounded-[25px] p-6"
              >
                <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
                  <span>{item.question}</span>
                  <span className="transition-transform duration-300 group-open:rotate-45 w-8 h-8 rounded-full flex items-center justify-center bg-purple-100">
                    <img
                      src="src/shared/assets/about-images/плюс.png"
                      alt="Плюс"
                      className="w-4 h-4"
                    />
                  </span>
                </summary>
                <p className="text-gray-600 mt-4">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
    </>
  );
}

export default About;
