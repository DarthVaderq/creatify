import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "normalize.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
function Card() {
  const [categories, setCategories] = useState([]); // Список категорий
  const [projects, setProjects] = useState([]); // Список проектов
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Изменяем состояние для загрузки нескольких файлов
  const [imageFiles, setImageFiles] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]); // Предпросмотр изображений
  const [category, setCategory] = useState(""); // Выбранная категория
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  // Загрузка категорий
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.creatifytech.online/categories");
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError("Не удалось загрузить категории");
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Загрузка проектов
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://api.creatifytech.online/projects");
        setProjects(response.data);
      } catch (err) {
        console.error(
          "Ошибка при добавлении проекта:",
          err.response?.data || err.message
        );
        alert(
          err.response?.data?.message ||
            "Не удалось добавить проект. Попробуйте снова."
        );
        console.error("Не удалось загрузить проекты");
      }
    };
    fetchProjects();
  }, []);

  // Обработка выбора нескольких изображений
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files); // это уже не только "images", но можно пока оставить

    const previews = files.map((file) => ({
      type: file.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(file),
    }));
    setImagesPreview(previews);
  };
  // Добавление проекта
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      alert("Заполните все поля перед отправкой");
      return;
    }
    const token = localStorage.getItem("token"); // Получаем токен из localStorage
    if (!token) {
      alert("Пожалуйста, войдите в систему!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    // Проверим что добавлено в FormData
    console.log("FormData перед отправкой:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "https://api.creatifytech.online/projects",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects([...projects, response.data]);
      setTitle("");
      setDescription("");
      setImageFiles([]);
      setImagesPreview([]);
      setCategory("");
      setSuccessMessageOpen(true);
    } catch (err) {
      console.error("Не удалось добавить проект", err.message);
    }
  };
  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSuccessMessageOpen(false);
  };
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Добавить проект
      </h2>
      <form
        onSubmit={handleAddProject}
        className="space-y-5 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6"
      >
        <input
          type="text"
          placeholder="Наименование"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
           maxLength={22}
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full resize-none px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center ">
          <input
            accept="image/*,video/*"
            multiple
            type="file"
            id="upload-images"
            style={{ display: "none" }}
            onChange={handleMediaChange}
          />

          <label htmlFor="upload-images">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadIcon />}
              sx={{
                borderRadius: 2,
                paddingY: 1.2,
                paddingX: 3,
                borderColor: "#d1d5db",
                color: "#3b82f6",
                textTransform: "none",
                "&:hover": {
                  borderColor: "#3b82f6",
                  backgroundColor: "rgba(59, 130, 246, 0.04)",
                },
              }}
            >
              Загрузить изображения или видео!
            </Button>
          </label>
          <p className="text-sm text-gray-500 ml-5">
            {imageFiles.length > 0
              ? `${imageFiles.length} файл(ов) выбрано`
              : "Файлы не выбраны"}
          </p>
        </div>
        {imagesPreview.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagesPreview.map((preview, index) =>
              preview.type === "image" ? (
                <img
                  key={index}
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded-xl shadow-sm"
                />
              ) : (
                <video
                  key={index}
                  src={preview.url}
                  controls
                  className="w-full h-40 object-cover rounded-xl shadow-sm"
                />
              )
            )}
          </div>
        )}

        <FormControl fullWidth sx={{ marginTop: 1 }}>
          <InputLabel id="category-select-label">Выберите категорию</InputLabel>
          <Select
            labelId="category-select-label"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Выберите категорию"
            sx={{
              borderRadius: 2,
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#60a5fa",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3b82f6",
              },
            }}
          >
            <MenuItem value="">Выберите категорию</MenuItem>
            {categories
              .filter((cat) => cat.name !== "Всё")
              .map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium transition"
          >
            Добавить
          </button>
        </div>
      </form>
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Проект успешно добавлен!
        </Alert>
      </Snackbar>
    </main>
  );
}

export default Card;
