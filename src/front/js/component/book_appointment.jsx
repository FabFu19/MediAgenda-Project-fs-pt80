import React, { useState } from "react";
import "../../styles/BookAppointment.css";

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("09:00");

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const days = daysInMonth(currentMonth + 1, currentYear);

  const handleDayClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="calendar-container">
      <div className="calendar">
        {/* Renderizar los días de la semana */}
        {weekDays.map((day, index) => (
          <div key={index} className="calendar-weekday">
            {day}
          </div>
        ))}

        {/* Renderizar los días del mes */}
        {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className={`calendar-day ${
              selectedDate?.getDate() === day ? "selected" : ""
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="appointment-details">
          <p>
            <strong>Fecha:</strong> {selectedDate.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="time-selector">
            <label htmlFor="time">Hora:</label>
            <input
              type="time"
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;