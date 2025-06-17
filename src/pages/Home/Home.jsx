import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../widgets/Header/Header";
import Footer from "../../widgets/Footer/Footer";
import { LanguageContext } from "../../entities/LanguageContext";
import translations from "./translations";
import "normalize.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  UserRound,
  ThumbsUp,
  SlidersHorizontal,
  CalendarDays,
} from "lucide-react";
import CalendarFilter from "../../features/CalendarFilter";
import { fetchUserData } from "../../entities/model/authApi";

function Home() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Всё");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const currentContent = translations[language].home;
  const [searchQuery, setSearchQuery] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [minVotes, setMinVotes] = useState("");
  const [maxVotes, setMaxVotes] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({
    min: null,
    max: null,
    sort: null,
    date: null, // ✅ Добавьте это поле
  });

  useEffect(() => {
    // Проверяем наличие токена
    const token = localStorage.getItem("token");
    if (!token) {
      // Нет токена — пользователь гость, не делаем запрос к /auth/me
      return;
    }
    // Если токен есть — пробуем получить пользователя
    axios
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(fetchUserData());
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // Токен невалиден — считаем гостем, не показываем ошибку
          localStorage.removeItem("token");
        } else {
          // Другие ошибки можно залогировать
          console.error("Ошибка при получении пользователя:", err);
        }
      });
  }, [dispatch]);

  const handleLike = async (projectId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.patch(
        `https://api.creatifytech.online/projects/${projectId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId
            ? {
                ...p,
                likes: response.data.likes,
                likedBy: response.data.likedBy, // 👈 важно
              }
            : p
        )
      );
    } catch (err) {
      console.error("Ошибка лайка:", err);
    }
  };

  const toggleFilterDropdown = () => setShowFilterDropdown((prev) => !prev);

  const handleApply = () => {
    setAppliedFilters({
      min: minVotes || 0,
      max: maxVotes || Infinity,
      sort: sortOrder,
      date: appliedFilters.date, // ✅ Сохраняем значение даты
    });
    setShowFilterDropdown(false); // ✅ Исправлено имя
  };

  const handleCancel = () => {
    setMinVotes("");
    setMaxVotes("");
    setSortOrder(null);
    setAppliedFilters({
      min: null,
      max: null,
      sort: null,
      date: null, // ✅ Сбрасываем дату
    });
    setShowFilterDropdown(false); // ✅ Исправлено имя
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.creatifytech.online/categories");
        const uniqueCategories = response.data
          .map((cat) => cat.name)
          .filter((cat) => cat !== "Всё");
        setCategories(["Всё", ...uniqueCategories]);
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://api.creatifytech.online/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProjects(response.data);
      } catch (err) {
        setError("Ошибка загрузки проектов");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects
    .filter((project) => {
      const categoryMatch =
        selectedCategory === "Всё" ||
        project.category.includes(selectedCategory);

      const searchMatch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const votesMatch =
        (appliedFilters.min === null || project.likes >= appliedFilters.min) &&
        (appliedFilters.max === null || project.likes <= appliedFilters.max);

      // Добавляем фильтрацию по дате
      const dateMatch =
        !appliedFilters.date ||
        new Date(project.createdAt) <= new Date(appliedFilters.date);

      return categoryMatch && searchMatch && votesMatch && dateMatch;
    })
    .sort((a, b) => {
      if (appliedFilters.sort === "min") return a.likes - b.likes;
      if (appliedFilters.sort === "max") return b.likes - a.likes;
      return 0;
    });

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear().toString().slice(-2)} || ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      {/* Главная */}
      <section className="flex items-center bg-blue-50">
        <div className="container mx-auto flex flex-col items-start">
          <h2 className="text-[64px] ml-[130px] font-bold text-[#241C68]">
            {currentContent.title}
          </h2>
          <h3 className="text-[30px] ml-[130px] font-[600] mt-[10px]">
            {currentContent.subtitle}
          </h3>
          <p className="text-[14px] ml-[130px] text-[#505050] mt-[20px]">
            {currentContent.description}
          </p>
          <button
            onClick={() => {
              if (isAuth) {
                navigate("/card");
              } else {
                navigate("/login"); // или '/auth/login' — в зависимости от твоего роутинга
              }
            }}
            className="ml-[130px] h-[64px] w-[191px] bg-[#4A47B4] rounded-[30px] text-white font-[20px] font-bold mt-[36px]"
          >
            {currentContent.button}
          </button>
        </div>
        <img class="h-[450px] w-[843px]" src="/home.png" alt="Home" />
      </section>
      <section className="container mx-auto py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Поисковый блок */}
          <div className="flex ml-4 items-center bg-yellow-400 rounded-[13px] px-5 py-1 w-full md:w-auto">
            {/* Иконка слева  */}
            <div className="text-black mr-2 pl-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="65"
                height="60"
                fill="none"
                viewBox="0 0 59 60"
              >
                <path
                  fill="#000202"
                  d="M54.584 20.643 43.534 32.26a6 6 0 0 1-8.373.314l-3.493-3.16a6 6 0 0 1-1.795-5.905l.316-1.267A1 1 0 0 0 29.22 21H16.088a6 6 0 0 0-4.883 2.513l-.246.345a6 6 0 0 0-.736 1.38l-.477 1.273a6 6 0 0 0-.074 4.004l.305.916c.347 1.04.847 2.023 1.484 2.915l.442.618a6 6 0 0 0 2.876 2.167l5.11 1.813a36.7 36.7 0 0 1 14.786 9.792l.77.841A15.43 15.43 0 0 1 39.5 60h-7l-1.162-2.904a11 11 0 0 0-2.434-3.692l-.81-.81a6 6 0 0 0-1.329-1.002L23 49.5l-7.5-3-3.862-2.06a27.7 27.7 0 0 1-6.554-4.856l-.14-.14a13.55 13.55 0 0 1-3.42-5.76 15.36 15.36 0 0 1 .534-10.181l.604-1.469a11 11 0 0 1 2.394-3.59l2.292-2.292q.152-.152.326-.278l1.02-.743A16.37 16.37 0 0 1 18.325 12h4.581c.891 0 1.301-1.109.625-1.689a1.92 1.92 0 0 1-.147-2.776l4.648-4.921a4.185 4.185 0 0 1 5.425-.567l8.235 5.7a2.85 2.85 0 0 0 3.48-.179 2.85 2.85 0 0 1 3.68-.025l5.227 4.355a6 6 0 0 1 .506 8.745"
                ></path>
                <path
                  fill="#fff"
                  d="M45.622 30.148c1.101 1.035 2.59 1.568 4.14 1.48a6.17 6.17 0 0 0 4.122-1.946 6.17 6.17 0 0 0 1.691-4.234c-.007-1.552-.63-3.005-1.73-4.04l-4.112 4.37z"
                ></path>
              </svg>
            </div>

            {/* Поле поиска */}
            <div className="flex items-center  bg-white rounded-full px-3 py-1 flex-grow">
              <input
                type="text"
                placeholder={currentContent.searchPlaceholder}
                className="ml-2 outline-none w-full bg-transparent text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Кнопка поиска */}
            <button className="ml-3 px-4 py-1 bg-black text-white rounded-[10px] hover:bg-gray-900 transition">
              {currentContent.searchButton}
            </button>
          </div>

          {/* Кнопки фильтра и сортировки */}
          <div className="flex items-center gap-2">
            <div className="relative inline-block text-left">
              <button
                onClick={toggleFilterDropdown} // ✅ Исправленное имя
                className="flex items-center gap-1 px-9 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {currentContent.filterButton}
              </button>

              {showFilterDropdown && (
                <div className="absolute z-10  mt-5 w-64 p-4 bg-white border border-gray-300 rounded-xl shadow-lg text-sm">
                  <div className="absolute top-[-10px] left-16 w-5 h-5 bg-white border-l border-t border-gray-300 rotate-45" />
                  <p className="font-medium text-center mb-3">
                    {currentContent.filter_voice}
                  </p>

                  <div className="flex items-center justify-center gap-2 mb-3">
                    <input
                      type="number"
                      placeholder={currentContent.from}
                      value={minVotes}
                      onChange={(e) => setMinVotes(e.target.value)}
                      className="w-20 py-1 px-2 border border-gray-300 rounded-md text-center outline-none"
                    />
                    <span>:</span>
                    <input
                      type="number"
                      placeholder={currentContent.to}
                      value={maxVotes}
                      onChange={(e) => setMaxVotes(e.target.value)}
                      className="w-20 py-1 px-2 border border-gray-300 rounded-md text-center outline-none"
                    />
                  </div>

                  <div className="flex justify-center items-center gap-6 mb-4">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="sortOrder"
                        checked={sortOrder === "min"}
                        onChange={() => setSortOrder("min")}
                        className="accent-blue-500 w-4 h-4"
                      />
                      <span>{currentContent.Least}</span>
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name="sortOrder"
                        checked={sortOrder === "max"}
                        onChange={() => setSortOrder("max")}
                        className="accent-blue-500 w-4 h-4"
                      />
                      <span>{currentContent.Most}</span>
                    </label>
                  </div>

                  <div className="flex justify-between text-sm font-medium">
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={handleCancel}
                    >
                      {currentContent.cancel}
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      onClick={handleApply}
                    >
                      {currentContent.confirm}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <CalendarFilter
              onApply={(date) =>
                setAppliedFilters((prev) => ({ ...prev, date }))
              }
              onCancel={() =>
                setAppliedFilters((prev) => ({ ...prev, date: null }))
              }
            />
          </div>
        </div>
      </section>

      {/* Категории проектов и список проектов */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {currentContent.projectRecommendation}
        </h2>
        <p className="text-gray-500 mb-6">{currentContent.text}</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Категории слева */}
          <div className="flex flex-col space-y-4 w-full lg:w-1/4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-left px-5 py-3 rounded-md font-semibold shadow ${
                  selectedCategory === cat
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100 text-black"
                }`}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Список проектов */}
          <div className="w-full lg:w-3/4 flex flex-col space-y-6 gap-">
            {loading ? (
              <p>{currentContent.loading}</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredProjects.length === 0 ? (
              <p>{currentContent.projects_not_found}</p>
            ) : (
              currentProjects.map((project) => {
                // Получаем первую категорию (основную)
                const mainCategory = project.category.find(
                  (cat) => cat !== "Всё"
                );

                // Задаём стили по категориям
                const categoryStyles = {
                  "UI-UX Дизайн":
                    "border-l-4 border-[#E8618A] bg-[white] shadow-[inset_0px_-84px_0px_-4px_#FAF4F8]",
                  "Мобильные приложения":
                    "border-l-4 border-[#F5C346] bg-[white] shadow-[inset_0px_-84px_0px_-4px_#FEFCF0]",
                  "Веб-приложения":
                    "border-l-4 border-[#6B5AE0] bg-[white] shadow-[inset_0px_-84px_0px_-4px_#F2F4FF]",
                  "Игровые проекты":
                    " border-l-4  border-[#A06BF2] bg-[white] shadow-[inset_0px_-84px_0px_-4px_#F5EAFF] ",
                };
                const categoryColors = {
                  "UI-UX Дизайн": "text-[#E8618A]",
                  "Мобильные приложения": "text-[#F5C346]",
                  "Веб-приложения": "text-[#6B5AE0]",
                  "Игровые проекты": "text-[#A06BF2]",
                };
                const iconColor =
                  categoryColors[mainCategory] || "text-gray-500";
                const style =
                  categoryStyles[mainCategory] ||
                  "border-l-4 border-gray-300 bg-white";
                const svgFillColors = {
                  "UI-UX Дизайн": "#FDE9EF",
                  "Мобильные приложения": "#FFF7E0",
                  "Веб-приложения": "#EEF1FF",
                  "Игровые проекты": "#F5EDFF",
                };
                return (
                  <div
                    key={project._id}
                    className={`rounded-xl p-6 shadow ${style} transition`}
                  >
                    <div className="flex justify-between items-start">
                      {/* Левая часть */}
                      <div className="flex-1">
                        {/* Иконка + Категория */}
                        <div className="flex items-center gap-4">
                          <div className="w-[46px] h-[47px]">
                            <svg
                              style={{ marginTop: 17 }}
                              xmlns="http://www.w3.org/2000/svg"
                              width="46"
                              height="47"
                              fill="none"
                              viewBox="0 0 46 47"
                              className={iconColor}
                            >
                              <path
                                fill={svgFillColors[mainCategory] || "none"}
                                d="M0 0h46v47H0z"
                              />
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M22 17.882V31.24a1.76 1.76 0 0 1-3.418.592l-2.146-6.15m0 0A4 4 0 0 1 18 18h1.831c4.1 0 7.625-1.234 9.169-3v14c-1.544-1.766-5.067-3-9.169-3H18a4 4 0 0 1-1.564-.318M29 25a3 3 0 0 0 0-6"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-500">
                            <span className="text-gray-500">Категория: </span>
                            <span className="text-black font-bold ml-1">
                              {project.category
                                .filter((cat) => cat !== "Всё")
                                .join(", ")}
                            </span>
                          </p>
                        </div>

                        {/* Название проекта */}
                        <h3 className="text-lg font-bold mt-4 ml-[60px]">
                          {project.description.length > 60
                            ? project.description.slice(0, 20) + "..."
                            : project.description}
                        </h3>

                        {/* Описание */}
                        <p className="text-sm ml-[60px] text-gray-600 max-w-xl mt-1">
                          {project.description.length > 30
                            ? project.description.slice(0, 20) + "..."
                            : project.description}
                        </p>
                      </div>

                      {/* Правая часть: Время и лайк */}

                      <div
                        className={`mt-1  flex justify-center  items-center text-xl  ${
                          project.liked ? "text-blue-500" : "text-gray-500"
                        }`}
                      >
                        <span className="flex text-[15px] ml-[60px] text-black mt-2.5">
                          <p className="text-sm flex gap-2 text-gray-500 mb-4">
                            Добавлено:{" "}
                            <a className="text-black  flex font-[900]">
                              {formatDate(project.createdAt)}
                            </a>
                          </p>
                        </span>
                        <ThumbsUp
                          className={`cursor-pointer ml-[60px] mr-2 mb-3 transition-colors ${
                            project.likedBy?.includes(user?._id)
                              ? "text-blue-500"
                              : "text-gray-400"
                          }`}
                          onClick={() => handleLike(project._id)}
                        />
                        <span className="mr-[15px]  mb-2">
                          {project.likes || 0}
                        </span>
                      </div>
                    </div>

                    {/* Нижняя часть */}
                    <div className="flex justify-between items-center text-sm text-gray-500 mt-12">
                      <div className="flex mt-3 items-center gap-2">
                        <MapPin size={20} className={`${iconColor}`} />
                        <span>Кыргызстан</span>
                        <span className="mx-2">|</span>
                        <span className="flex items-center gap-2">
                          <UserRound size={20} className={`${iconColor}`} />
                          {project.user && project.user.fullName
                            ? project.user.fullName
                            : "Неизвестный пользователь"}
                        </span>
                      </div>
                      <Link
                        to={`/description/${project._id}`}
                        className="text-sm text-black font-[650]  bg-white px-8 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                      >
                        {currentContent.furtherButton}
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <div className="flex justify-center mt-8 mb-12">
        <div className="flex items-center gap-2 bg-[#f9fafb] gap px-4 py-2 rounded-full shadow-sm">
          {/* Кнопка "Назад" */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
              currentPage === 1
                ? "bg-[#fefeff] text-[#50C5A1] opacity-50 cursor-not-allowed"
                : "bg-[#fefeff] text-[#50C5A1] hover:shadow"
            }`}
          >
            &larr;
          </button>

          {/* Номера страниц */}
          {Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNumber)}
                className={`w-10 h-10 rounded-full flex font-[650] items-center justify-center transition font-medium ${
                  currentPage === pageNumber
                    ? "bg-gradient-to-br from-[#50C5A1] to-[#3FB48F] text-white shadow-md"
                    : "text-[#50C5A1] hover:bg-[#e6f9f3]"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Кнопка "Вперёд" */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
              currentPage === totalPages
                ? "bg-[#fefeff] text-[#50C5A1] opacity-50 cursor-not-allowed"
                : "bg-[#fefeff] text-[#50C5A1] hover:shadow"
            }`}
          >
            &rarr;
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Home;
