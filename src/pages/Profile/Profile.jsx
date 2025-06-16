import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import Header from "../../widgets/Header/Header";
import { useNavigate, Link } from "react-router-dom";
import { LanguageContext } from "../../entities/LanguageContext";
import translations from "./translations-profile";
function Profile() {
  const [user, setUser] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const { language } = useContext(LanguageContext); // Получаем текущий язык
  const currentContent = translations[language]; // Получаем текст на выбранном языке
  const [avatarUrl, setAvatarUrl] = useState("");
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    fullName: "",
    email: "",
    country: "",
  });
  const [projects, setProjects] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://api.creatifytech.online/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setAvatarUrl(res.data.user.avatarUrl || "/default-avatar.png");
        setForm({
          lastName: res.data.user.lastName || "",
          firstName: res.data.user.firstName || "",
          fullName: res.data.user.fullName || "",
          email: res.data.user.email || "",
          country: res.data.user.country || "",
        });
        setProjects(res.data.createdProjects || []);
        setLikedProjects(res.data.likedProjects || []);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleDelete = async (projectId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://api.creatifytech.online/projects/${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error("Ошибка при удалении проекта:", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) setAvatarUrl(URL.createObjectURL(file));
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://api.creatifytech.online/profile/avatar",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Получаем обновленные данные пользователя и аватар
      const res = await axios.get("https://api.creatifytech.online/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setAvatarUrl(res.data.user.avatarUrl || "/default-avatar.png");
      alert("Аватар успешно обновлён!");
    } catch (err) {
      alert("Ошибка при загрузке аватара");
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.put("https://api.creatifytech.online/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Получаем обновленные данные пользователя из базы
      const res = await axios.get("https://api.creatifytech.online/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setForm({
        lastName: res.data.user.lastName || "",
        firstName: res.data.user.firstName || "",
        fullName: res.data.user.fullName || "",
        email: res.data.user.email || "",
        country: res.data.user.country || "",
      });
      alert("Данные успешно обновлены!");
    } catch (err) {
      alert("Ошибка при обновлении данных");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  if (!user)
    return (
      <div className="text-center py-10">{currentContent.loadingProfile}</div>
    );

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Верхний блок */}
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 mb-8">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div className="flex-1">
            <div className="font-medium text-gray-800 mb-1">
              {currentContent.uploadImage}
            </div>

            <div className="text-gray-500 text-sm mb-2">
              {avatarFile ? avatarFile.name : "Profile-pic.jpg"}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex items-center ">
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-1 border rounded  text-sm"
              >
                {currentContent.selectFile}
              </button>

              <button
                onClick={handleAvatarUpload}
                className="px-4 py-1 border rounded text-sm ml-2 bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {currentContent.updateImage}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-1 border flex rounded ml-[200px] bg-red-100 text-red-600 hover:bg-red-200 transition text-sm"
              >
              🚪 {currentContent.getout}
              </button>
            </div>
          </div>
        </div>

        {/* Форма */}
        <form
          className="bg-white rounded-xl shadow p-8"
          onSubmit={handleUpdate}
          autoComplete="off"
        >
          <h2 className="text-2xl text-center font-bold mb-6 text-gray-800">
            {currentContent.infoaboutUser}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                {currentContent.lastName}*
              </label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                required
                maxLength={12}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {currentContent.firstName}*
              </label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                required
                maxLength={12}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {currentContent.fullName}*
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                required
                maxLength={12}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {currentContent.email}*
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {currentContent.country}
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="">{currentContent.chooseCountry}</option>
                <option value="Bangladesh">🇧🇩 Bangladesh</option>
                <option value="Russia">🇷🇺 Russia</option>
                <option value="USA">🇺🇸 USA</option>
                {/* Добавьте другие страны по необходимости */}
              </select>
            </div>
            <div className="bg-white shadow p-2  mt-5 mb-8">
              <div className="text-[15px]  ">
                {currentContent.numberLikes}:{" "}
                <span className="text-blue-700">
                  {projects.reduce((sum, p) => sum + (p.likes || 0), 0)}
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white rounded py-3 mt-4 font-semibold text-lg hover:bg-blue-800 transition"
          >
            {currentContent.updateProfile}
          </button>
        </form>

        {/* Всего лайков на твоих проектах */}

        {/* Твои проекты */}
        <div className="bg-white rounded-xl shadow p-6 mt-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {currentContent.yourProjects} ({projects.length})
          </h2>
          {projects.length === 0 ? (
            <div className="text-gray-500">У тебя пока нет проектов.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-50 border rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg text-gray-800">
                    {" "}
                    {project.title.length > 40
                      ? project.title.slice(0, 40) + "..."
                      : project.title}
                  </h3>
                  <div className="text-sm text-gray-500">
                    <p>
                      👍 {project.likes} {currentContent.likes}
                    </p>
                    <p className="mt-2">
                      {currentContent.created}{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => navigate(`/edit-project/${project._id}`)}
                    >
                      {currentContent.edit}
                    </button>
                    <button
                      className="text-red-600 text-sm hover:underline"
                      onClick={() => handleDelete(project._id)}
                    >
                      {currentContent.delete}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Проекты, которые ты лайкнул */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentContent.projectyourLiked} ({likedProjects.length})
          </h2>
          {likedProjects.length === 0 ? (
            <div className="text-gray-500">
              Ты еще не лайкнул ни одного проекта.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5">
              {likedProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-blue-50 border rounded-lg p-4 shadow hover:shadow-md transition"
                >
                  <h3 className="text-lg  text-gray-800">
                    {" "}
                    {project.title.length > 40
                      ? project.title.slice(0, 40) + "..."
                      : project.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    👍 {project.likes} {currentContent.likes}
                  </p>
                  <div className="flex items-center align-center justify-between">
                    <p className="text-sm text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                    <Link
                      to={`/description/${project._id}`}
                      className="text-sm text-black font-[650]  bg-white px-8 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                    >
                      {currentContent.furtherButton}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Profile;
