import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../widgets/Header/Header";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://api.creatifytech.online/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data.user);
        setProjects(res.data.createdProjects || []);
        setLikedProjects(res.data.likedProjects || []);
      } catch (err) {
        console.error("Ошибка при загрузке профиля:", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://api.creatifytech.online/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error("Ошибка при удалении проекта:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <div className="text-center py-10">Загрузка профиля...</div>;

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-6 mb-10">
            <img
              src={user.avatarUrl || "/default-avatar.png"}
              alt="Аватар"
              className="w-28 h-28 rounded-full object-cover shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.fullName}</h1>
              <div className="text-gray-600 mt-2 space-y-1">
                <p>Имя: {user.firstName}</p>
                <p>Фамилия: {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Местоположение: {user.location || "Не указано"}</p>
                <p>
                  Всего лайков на твоих проектах:{" "}
                  <span className="font-semibold">
                    {projects.reduce((sum, p) => sum + (p.likes || 0), 0)}
                  </span>
                </p>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate("/edit-profile")}
                  className="px-4 py-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition text-sm"
                >
                  ✏️ Редактировать профиль
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 transition text-sm"
                >
                  🚪 Выйти
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Твои проекты ({projects.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.title}
                </h3>
                <div className="text-sm text-gray-500 mt-1">
                  <p>👍 {project.likes} лайков</p>
                  <p>Создано: {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => navigate(`/edit-project/${project._id}`)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="text-red-600 text-sm hover:underline"
                    onClick={() => handleDelete(project._id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Проекты, которые ты лайкнул ({likedProjects.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {likedProjects.map((project) => (
              <div
                key={project._id}
                className="bg-blue-50 border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">👍 {project.likes} лайков</p>
                <p className="text-sm text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
