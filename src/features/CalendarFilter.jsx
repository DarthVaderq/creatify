import React from "react";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

const months = [
  "Январь", "Февраль", "Март", "Апрель", 
  "Май", "Июнь", "Июль", "Август",  
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

const years = Array.from({ length: 10 }, (_, i) => 2020 + i);

export default function CalendarFilter({ onApply, onCancel }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const getCalendarDays = () => {
    const days = [];
    const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    for (let i = 0; i < offset; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);

    return days;
  };

  const handleDayClick = (day) => {
    if (day) {
      const newDate = new Date(selectedDate);
      newDate.setDate(day);
      setSelectedDate(newDate);
    }
  };

  const handleApply = () => {
    const finalDate = new Date(selectedDate);
    finalDate.setHours(selectedHour);
    finalDate.setMinutes(selectedMinute);
    onApply(finalDate);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block  text-left">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition"
      >
        <CalendarDays className="w-4 h-4 text-blue-500" />
        Календарь
      </button>

      {showDropdown && (
        <div className="absolute z-10 mt-5 left-[-140px] w-[350px] p-4 bg-white border border-gray-300 rounded-xl shadow-lg text-sm transform -translate-x-1/4">
          <div className="absolute top-[-10px] right-12  w-5 h-5 bg-white border-l border-t border-gray-300 rotate-45" />
          
          <div className="flex justify-between mb-3">
            <select
              value={selectedDate.getMonth()}
              onChange={(e) => {
                const newDate = new Date(selectedDate);
                newDate.setMonth(Number(e.target.value));
                setSelectedDate(newDate);
              }}
              className="border px-2 py-1 rounded bg-gray-100"
            >
              {months.map((month, i) => (
                <option value={i} key={i}>{month}</option>
              ))}
            </select>

            <select
              value={selectedDate.getFullYear()}
              onChange={(e) => {
                const newDate = new Date(selectedDate);
                newDate.setFullYear(Number(e.target.value));
                setSelectedDate(newDate);
              }}
              className="border px-2 py-1 rounded bg-gray-100"
            >
              {years.map((year) => (
                <option value={year} key={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-4">
            {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d, i) => (
              <span key={i} className="font-semibold">{d}</span>
            ))}
            {getCalendarDays().map((day, i) => (
              <button
                key={i}
                disabled={!day}
                onClick={() => handleDayClick(day)}
                className={`h-8 w-8 flex items-center justify-center rounded-full ${
                  day === selectedDate.getDate() 
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-200"
                } ${!day ? "opacity-50 cursor-default" : ""}`}
              >
                {day || ""}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                onCancel();
                setShowDropdown(false);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              Отменить
            </button>

            <div className="flex gap-2">
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(Number(e.target.value))}
                className="px-2 py-1 border rounded bg-gray-100"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i}>
                    {i.toString().padStart(2, "0")}:00
                  </option>
                ))}
              </select>

              <select
                value={selectedMinute}
                onChange={(e) => setSelectedMinute(Number(e.target.value))}
                className="px-2 py-1 border rounded bg-gray-100"
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>
                    {selectedHour.toString().padStart(2, "0")}:{m}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleApply}
              className="text-blue-500 hover:text-blue-600"
            >
              Подтвердить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}