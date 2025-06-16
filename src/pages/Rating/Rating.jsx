import React, { useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import Header from "../../widgets/Header/Header";

function Button({ children, active, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

function Avatar({ src, alt }) {
  return (
    <img
      src={src || "https://ui-avatars.com/api/?name=User"}
      alt={alt}
      className="w-10 h-10 rounded-full object-cover border"
    />
  );
}

function Rating() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("Всё");
  const [categories, setCategories] = useState(["Всё"]);
  const { ref, inView } = useInView();

  useEffect(() => {
    document.title = "Рейтинг проектов | Creatify";
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.creatifytech.online/categories"
        );
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
    setProjects([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchProjects();
    }
  }, [inView, category]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`https://api.creatifytech.online/projects`, {
        params: { page, category: category === "Всё" ? undefined : category },
      });
      const filtered = res.data.filter((p) => (p.likes || 0) > 99);
      if (filtered.length === 0) {
        setHasMore(false);
      } else {
        setProjects((prev) => [...prev, ...filtered]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Ошибка загрузки проектов", error);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  return (
    <>
      <Header />
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Рейтинг проектов
          </h1>
          <div className="bg-white rounded-xl shadow p-6 mb-6 text-center">
            <div className="flex justify-center mt-6 gap-6">
              <div className="flex flex-col items-center">
                <span className="text-2xl">🥇</span>
                <span className="font-bold mt-1">1 000 ❤</span>
                <span className="text-xs text-gray-500">за 1-е место</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">🥈</span>
                <span className="font-bold mt-1">500 ❤</span>
                <span className="text-xs text-gray-500">за 2-е место</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl">🥉</span>
                <span className="font-bold mt-1">300 ❤</span>
                <span className="text-xs text-gray-500">за 3-е место</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                active={category === cat}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="bg-white shadow rounded-xl overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-200">
                  <tr className="text-left">
                    <th className="p-4">#</th>
                    <th className="p-4">Проект</th>
                    <th className="p-4">Категория</th>
                    <th className="p-4">Автор</th>
                    <th className="p-4 text-center">❤ Лайки</th>
                    <th className="p-4 text-center">Подробнее</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr
                      key={project._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-semibold">{index + 1}</td>
                      <td className="p-4 max-w-xs">
                        <div className="font-medium line-clamp-2">
                          {project.title}
                        </div>
                        {project.description && (
                          <div className="text-gray-500 text-xs line-clamp-2">
                            {project.description}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {Array.isArray(project.category)
                          ? project.category
                              .filter((c) => c !== "Всё")
                              .join(", ")
                          : project.category}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Avatar src={project.author?.avatar} />
                          <a
                            href={`/profile/${project.author?._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {project.author?.name || "Неизвестно"}
                          </a>
                        </div>
                      </td>
                      <td className="p-4 text-center">{project.likes}</td>
                      <td className="p-4 text-center">
                        <a
                          href={`/description/${project._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Подробнее →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {hasMore && (
              <div ref={ref} className="text-center text-gray-500 py-4">
                Загрузка...
              </div>
            )}

            {!hasMore && projects.length === 0 && (
              <div className="text-center text-gray-400 py-6">
                Нет проектов для отображения.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Rating;
