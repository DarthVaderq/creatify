import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Введите ваш email");
      return;
    }

    try {
      const res = await fetch("https://api.creatifytech.online/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Произошла ошибка");

      setMessage("Ссылка для восстановления отправлена на ваш email.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 flex flex-col items-center rounded-md shadow-md w-full max-w-md text-center">
        <img src="/keys.png" className="w-[100px] mb-5 h-[100px]" alt="" />
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Забыли пароль?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Введите ваш email, и мы отправим вам ссылку для сброса пароля.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Сбросить пароль
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6">
          <a
            href="/login"
            className="text-purple-600 hover:underline transition duration-300"
          >
            Вернуться к входу
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;