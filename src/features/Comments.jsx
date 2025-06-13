import React, { useState, useEffect } from "react";
import axios from "axios";

function Comments({ projectId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  // Получаем id текущего пользователя
  const [currentUserId, setCurrentUserId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditingText(comment.text);
  };

  useEffect(() => {
    let isMounted = true; // Флаг для предотвращения изменений состояния после размонтирования компонента

    setLoading(true);

    axios
      .get(`https://api.creatifytech.online/comments/${projectId}`)
      .then((res) => {
        if (isMounted) {
          setComments(Array.isArray(res.data) ? res.data : []);
        }
      })
      .catch(() => {
        if (isMounted) setComments([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false; // При размонтировании флаг станет false
    };
  }, [projectId]);

  useEffect(() => {
    // Получаем id текущего пользователя (например, из профиля)
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://api.creatifytech.online/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setCurrentUserId(res.data.user._id))
        .catch(() => setCurrentUserId(null));
    }
  }, []);

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
          text,
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
      alert("Не удалось отправить комментарий. Попробуйте ещё раз.");
    }
  };

  const handleDelete = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Удалить этот комментарий?")) return;
    try {
      await axios.delete(
        `https://api.creatifytech.online/comments/${commentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("Ошибка при удалении комментария");
    }
  };

  const saveEdit = async (commentId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `https://api.creatifytech.online/comments/${commentId}`,
        { text: editingText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(
        comments.map((c) =>
          c._id === commentId ? { ...c, text: res.data.text } : c
        )
      );
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      alert("Ошибка при редактировании комментария");
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
            className="bg-white rounded-xl p-5 shadow flex flex-col mb-4 border border-gray-200"
          >
            <div className="flex items-center mb-2">
              <img
                src={comment.user?.avatarUrl || "/default-avatar.png"}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover border mr-4"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800">
                    {comment.user?.fullName || "Аноним"}
                  </span>
                  <span className="text-xs text-gray-400 ml-3">
                    {new Date(comment.createdAt).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {currentUserId && comment.user?._id === currentUserId && (
                  <div className="mt-1 flex gap-2">
                    <button
                      onClick={() => startEdit(comment)}
                      className="text-blue-500 text-xs font-medium hover:underline"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-red-500 text-xs font-medium hover:underline"
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2">
              {editingId === comment._id ? (
                <div className="flex flex-col">
                  <textarea
                    className="w-full border rounded-xl px-2 py-1 mb-2"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows={2}
                  />
                  <div>
                    <button
                      onClick={() => saveEdit(comment._id)}
                      className="mr-2 px-3 py-1 bg-green-500 text-white rounded-full text-xs"
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingText("");
                      }}
                      className="px-3 py-1 bg-gray-300 rounded-full text-xs"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 ml-1.5 text-sm">{comment.text}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Пока нет комментариев.</p>
      )}
    </div>
  );
}

export default Comments;
