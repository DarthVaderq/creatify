import React, { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Select,
  FormControl,
  Tooltip,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";
import { LanguageContext } from "../../entities/LanguageContext";
import translations from "./translations";
import { logout } from "../../entities/model/authSlice";
import { fetchUserData } from "../../entities/model/authApi";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Получаем состояние авторизации из Redux
  const { language, setLanguage } = useContext(LanguageContext); // Используем контекст
  const currentContent = translations[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // Переключатель темы
  const [isLoading, setIsLoading] = useState(true);

  const handleMenuClick = (event) => {
    setMenuOpen(!menuOpen);
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    // Имитируем процесс загрузки состояния пользователя
    const fetchUserState = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // Получаем данные пользователя
          await dispatch(fetchUserData());
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных пользователя:", error);
      } finally {
        setIsLoading(false); // Завершаем состояние загрузки
      }
    };

    fetchUserState();
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logout());
    // Перенаправляем пользователя на страницу логина после выхода
    navigate("/");
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "white" : "#121212"; // Переключение темы
  };

  return (
    <AppBar
      style={{ background: "white" }}
      position="sticky"
      className="shadow p-3 font-medium px-4 md:px-20 border-b"
    >
      <Toolbar className="flex items-center">
        {/* Логотип */}
        <Link to="/" className="flex items-center ml-8 gap-2">
          <img class="h-[80px] w-[89px]" src="/public/logo.png" alt="Home" />
        </Link>
        {/*
          Переключатель темы 
          <Tooltip title="Переключить тему">
            <Switch
              checked={darkMode}
              onChange={handleThemeToggle}
              color="default"
            />
          </Tooltip>
      */}
        <nav className="flex items-center justify-between w-full">
          {/* Выбор языка */}
          <FormControl>
            <Select
              value={language}
              onChange={handleLanguageChange}
              displayEmpty
              inputProps={{ "aria-label": "Выбор языка" }}
              sx={{
                width: 160,
                height: 40,
                marginLeft: "50px",
                borderRadius: "9999px", // Максимально скруглённый угол
                backgroundColor: "white",
                paddingX: "10px",
                fontWeight: 500,
                color: "#4B5563", // text-gray-700
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // тень
                ".MuiSelect-icon": {
                  color: "#4B5563", // цвет стрелочки
                },
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
              }}
              renderValue={(selected) => {
                if (!selected) return <span>Выберите язык</span>;
                const getLabel = (lang) => {
                  switch (lang) {
                    case "Русский":
                      return (
                        <div className="flex items-center gap-2">
                          <img src="/public/russia.png" className="w-5 h-4" />
                          Русский
                        </div>
                      );
                    case "English":
                      return (
                        <div className="flex items-center gap-2">
                          <img src="/public/english.png" className="w-5 h-4" />
                          English
                        </div>
                      );
                    case "Кыргызча":
                      return (
                        <div className="flex items-center gap-2">
                          <img
                            src="/public/kyrgyzstan.png"
                            className="w-5 h-4"
                          />
                          Кыргызча
                        </div>
                      );
                    default:
                      return selected;
                  }
                };
                return getLabel(selected);
              }}
            >
              <MenuItem value="Русский">
                <div className="flex items-center gap-2">
                  <img
                    src="/public/russia.png"
                    alt="RU"
                    className="w-5 h-4 object-cover"
                  />
                  Русский
                </div>
              </MenuItem>
              <MenuItem value="English">
                <div className="flex items-center gap-2">
                  <img
                    src="/public/english.png"
                    alt="EN"
                    className="w-5 h-4 object-cover"
                  />
                  English
                </div>
              </MenuItem>
              <MenuItem value="Кыргызча">
                <div className="flex items-center gap-2">
                  <img
                    src="public/kyrgyzstan.png"
                    alt="KG"
                    className="w-5 h-4 object-cover"
                  />
                  Кыргызча
                </div>
              </MenuItem>
            </Select>
          </FormControl>
          ;{/* Навигация */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-black">
              {currentContent.home}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-black">
              {currentContent.about}
            </Link>
            <Link to="/contacts" className="text-gray-700 hover:text-black">
              {currentContent.Contact}
            </Link>
            <Link to="/rating" className="text-gray-700 hover:text-black">
              {currentContent.Rating}
            </Link>

            {/* Кнопка Вход/Профиль */}
            {isLoading ? (
              <span>Загрузка...</span>
            ) : isAuthenticated && user?.isVerified ? (
              <Link to="/profile" className="text-gray-700 hover:text-black">
                {currentContent.profile}
              </Link>
            ) : (
              <Link to="/register" className="text-gray-700 hover:text-black">
                {currentContent.login}
              </Link>
            )}
          </div>
        </nav>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
