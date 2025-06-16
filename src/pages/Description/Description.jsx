import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp } from "lucide-react";
import { useSelector } from "react-redux";
import Comments from "../../features/Comments";
import Header from "../../widgets/Header/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Это должен быть правильный импорт
import "swiper/css/navigation"; // Для стрелок навигации
import "swiper/css/pagination"; // Для пагинации
import { Navigation, Pagination } from "swiper/modules";
function Description() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `https://api.creatifytech.online/projects/${id}`
        );
        setProject(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке проекта:", err);
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (project) {
      console.log("Images array:", project.images);
    }
  }, [project]);
  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.patch(
        `https://api.creatifytech.online/projects/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // обновляем только поля лайков, остальные оставляем как есть
      setProject((prev) => ({
        ...prev,
        likes: response.data.likes,
        likedBy: response.data.likedBy,
      }));
    } catch (err) {
      console.error("Ошибка при обновлении лайка:", err);
      console.log("Текущий пользователь:", user._id);
      console.log("Текущий список лайков:", project.likedBy);
      console.log("isLikedByCurrentUser:", isLikedByCurrentUser);
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}.${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${d.getFullYear().toString().slice(2)} — ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  };

  const isLikedByCurrentUser = () => {
    return user && project?.likedBy?.includes(user._id);
  };
  if (!project) return <div className="text-center py-10">Загрузка...</div>;

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl  shadow-md p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {project.title.length > 40
              ? project.title.slice(0, 40) + "..."
              : project.title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Автор:{" "}
            <span className="font-semibold">
              {project.user && project.user.fullName
                ? project.user.fullName
                : "Неизвестный пользователь"}
            </span>{" "}
            • {formatTime(project.createdAt)}
          </p>

          {/* Галерея изображений */}
          <div className="my-4">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10} // Расстояние между слайдами
              slidesPerView={1} // Количество слайдов на одном экране
              loop={true} // Циклический слайдер
              navigation={true} // Стрелки навигации
              pagination={{ clickable: true }} // Пагинация внизу слайдера
            >
              {project.images?.length ? (
                project.images.map((filePath, idx) => {
                  const fullUrl = `https://api.creatifytech.online${filePath}`;
                  const isVideo = /\.(mp4|webm|ogg)$/i.test(fullUrl);

                  return (
                    <SwiperSlide key={idx}>
                      {isVideo ? (
                        <video
                          src={fullUrl}
                          controls
                          className="w-[115vh] ml-[130px] h-[390px] object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <img
                          src={fullUrl}
                          alt={`media-${idx}`}
                          className="w-[115vh] ml-[130px] h-[390px] object-cover rounded-lg shadow-sm"
                        />
                      )}
                    </SwiperSlide>
                  );
                })
              ) : (
                <p className="text-gray-400">
                  Нет изображений или видео для отображения
                </p>
              )}
            </Swiper>
          </div>

          {/* Описание */}
          <h3 className="text-xl font-semibold mt-[40px] mb-4">Описание:</h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {project.description
              ? project.description.match(/.{1,80}/g).map((part, idx) => (
                  <span key={idx}>
                    {part}
                    <br />
                  </span>
                ))
              : ""}
          </p>
          {/* Лайк */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isLikedByCurrentUser()
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              {project.likes || 0}
            </button>
          </div>

          {/* Комментарии */}

          <Comments projectId={id} />
        </div>
      </main>
    </>
  );
}

export default Description;
