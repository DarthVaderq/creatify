// src/features/auth/TelegramLogin.jsx
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const TelegramLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.setAttribute("data-telegram-login", "TheCreatifybot"); // username бота
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "true");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.async = true;

    const container = document.getElementById("telegram-login-btn");
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

    // Глобальный callback
    window.onTelegramAuth = function (user) {
      fetch("http://localhost:4444/auth/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/");
        })
        .catch((err) => {
          console.error("Ошибка авторизации через Telegram", err);
        });
    };
  }, [navigate]);

  return <div className="w-full flex items-center justify-center gap-2 bg-[#54a9eb] text-gray-700 py-1 rounded-md  transition duration-300 mb-6">
  <div id="telegram-login-btn" />
</div>
};

export default TelegramLogin;
