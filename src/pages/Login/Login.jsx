import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../entities/model/authApi";
import TelegramLogin from "../../features/telegram-button/TelegramLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // ✅ новое состояние
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Все поля должны быть заполнены!");
      return;
    }

    try {
      const response = await dispatch(login({ email, password })).unwrap();

      // ✅ сохраняем токен в зависимости от rememberMe
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", response.token);

      navigate("/");
    } catch (err) {
      setError(err.message || "Ошибка при логине");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl">
        <div className="hidden md:flex flex-1 bg-blue-50 items-center justify-center p-8 flex-col">
          <img
            src="/pc-home.png"
            alt="Login Illustration"
            className="max-w-full h-auto "
          />
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            Публикуй, голосуй и храни
          </h3>
          <p className="text-sm text-gray-600 text-center mt-2">
            Creatify — это удобная платформа для представления проектов и
            голосования за лучшие идеи.
          </p>
        </div>

        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Авторизация
          </h2>

          <a
            href="https://api.creatifytech.online/auth/google"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
          >
            <img
              src="/footer-images/google.png"
              alt="Google Icon"
              className="w-5 h-5"
            />
            <p className="text-[18px]">Войти через Google</p>
          </a>

          <TelegramLogin />

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500 transition duration-300">
                  <svg
                    className="w-3 h-3 text-white hidden peer-checked:block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    width="26"
                    height="21"
                    viewBox="0 0 26 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.89193 15.8597L23.1416 0.759497C23.4779 0.40315 23.8702 0.224976 24.3186 0.224976C24.767 0.224976 25.1593 0.40315 25.4956 0.759497C25.8319 1.11584 26 1.5393 26 2.02988C26 2.52045 25.8319 2.94331 25.4956 3.29847L10.0689 19.6905C9.73262 20.0468 9.3403 20.225 8.89193 20.225C8.44356 20.225 8.05124 20.0468 7.71496 19.6905L0.485014 12.029C0.148738 11.6726 -0.012675 11.2498 0.000776022 10.7604C0.0142271 10.271 0.189651 9.84754 0.527048 9.49001C0.864446 9.13247 1.26406 8.9543 1.72587 8.95549C2.18769 8.95667 2.58674 9.13485 2.92302 9.49001L8.89193 15.8597Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <span className="ml-2">Запомнить меня</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-blue-500 text-center hover:underline"
              >
                Забыли пароль?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Войти
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            У вас нет аккаунта?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Регистрация
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
