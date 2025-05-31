import React, {useState, useEffect } from "react";
import axios from "axios";

function Comments({ projectId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.creatifytech.online/comments/${projectId}`)
      .then((res) => {
        console.log("Полученные комментарии:", res.data);
        setComments(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке комментариев:", err);
        console.log("projectId в Comments:", projectId); 
        setComments([]);
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    if (!text.trim()) {
      alert("Комментарий не может быть пустым!");
      return;
    }
  
    try {
      const res = await axios.post(
        "https://api.creatifytech.online/comments",
        {
          projectId,
          text, // ✅ правильно
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([res.data, ...comments]);
      setText("");
    } catch (err) {
      console.error("Ошибка отправки комментария:", err.response?.data || err);
      alert("Не удалось отправить комментарий. Попробуйте ещё раз.");
    }
  };
  
  

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Комментарии:</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Оставьте комментарий..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
        >
          Отправить
        </button>
      </form>

      {loading ? (
        <p>Загрузка комментариев...</p>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-100 rounded-xl p-4 shadow-sm mb-2"
          >
            <p className="text-sm font-medium">
              {comment.user?.fullName || "Аноним"}
            </p>
            <p className="text-gray-700 mt-1">{comment.text}</p>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
        ))
      ) : (
        <p>Пока нет комментариев.</p>
      )}
    </div>
  );
}

export default Comments;
