import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../entities/model/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Проверка на заполненность полей
    if (!lastName || !firstName || !fullName || !email || !password) {
      setError("Все поля должны быть заполнены!");
      return;
    }

    // Проверка длины пароля и наличия цифр
    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Пароль должен содержать не менее 8 символов, включая цифры.");
      return;
    }

    try {
      await dispatch(register({ email, password, lastName, firstName, fullName })).unwrap();
      setSuccessMessage("Проверьте электронную почту для подтверждения регистрации ✅");
    } catch (err) {
      // Показываем подробное сообщение от сервера, если оно есть
      const errorMessage = err.response?.data?.message || err.message || "Ошибка при регистрации";
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl">
        {/* Левая часть с изображением */}
        <div className="hidden md:flex flex-1 bg-blue-50 items-center justify-center p-8 flex-col">
          <img
            src="\src\shared\assets\notebook.png"
            alt="Register Illustration"
            className="h-[70vh] w-[90vh] ml-5"
          />
        </div>

        {/* Правая часть с формой */}
        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Аутентификация
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Фамилия"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Имя"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Пользователь"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Зарегистрироваться
            </button>
          </form>

          {successMessage && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 text-sm rounded-md">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 text-sm rounded-md">
              {error}
            </div>
          )}

          <p className="mt-4 text-sm text-center text-gray-600">
            Уже есть аккаунт?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Войти
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;