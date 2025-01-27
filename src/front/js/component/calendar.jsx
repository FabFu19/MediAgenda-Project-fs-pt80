import React, { useState } from "react";

const specialties = [
  "Cardiologist",
  "Dermatologist",
  "Urologist",
  "Neurologist",
  "Pediatrician",
  "Oncologist",
  "Orthopedic",
  "Psychiatrist",
  "General Practitioner",
  "Endocrinologist",
  "Gastroenterologist",
  "Ophthalmologist",
  "Dentist",
];

const doctorsBySpecialty = {
  Cardiologist: [
    "Dr. Orangel Hernandez, Madrid, Madrid 28047",
    "Dr. Maria Lopez, Madrid, Madrid 28047",
    "Dr. Juan Perez, Madrid, Madrid 28047",
  ],
  Dermatologist: [
    "Dr. Laura Garcia, Madrid, Madrid 28047",
    "Dr. Ana Martinez, Madrid, Madrid 28047",
    "Dr. Sofia Gomez, Madrid, Madrid 28047",
  ],
  Urologist: [
    "Dr. Roberto Sanchez, Madrid, Madrid 28047",
    "Dr. Lucia Fernandez, Madrid, Madrid 28047",
    "Dr. Carlos Ortega, Madrid, Madrid 28047",
  ],
};

const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

export const Calendar = () => {
  const [selectedSpecialtyIndex, setSelectedSpecialtyIndex] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState("09:00");

  const handleNext = () => {
    setSelectedSpecialtyIndex((prevIndex) => (prevIndex + 1) % specialties.length);
    setSelectedDoctor(null);
    setShowCalendar(false);
  };

  const handlePrevious = () => {
    setSelectedSpecialtyIndex((prevIndex) =>
      prevIndex === 0 ? specialties.length - 1 : prevIndex - 1
    );
    setSelectedDoctor(null);
    setShowCalendar(false);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowCalendar(true);
  };

  const handleDayClick = (day) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  const handleSchedule = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-EN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
      });
      const newAppointment = `${formattedDate} at ${selectedTime} with ${selectedDoctor}`;
      setAppointments([...appointments, newAppointment]);
    }
  };

  const selectedSpecialty = specialties[selectedSpecialtyIndex];
  const doctors = doctorsBySpecialty[selectedSpecialty] || [];
  const today = new Date();
  const days = daysInMonth(today.getMonth() + 1, today.getFullYear());
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <>
      <div className="calendar-container mb-5">
        {/* Barra de búsqueda */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="e.g. Madrid, Madrid"
          />
          <button className="search-button">Search</button>
        </div>

        {/* Carrusel de especialidades */}
        <div className="carousel">
          <button className="carousel-arrow" onClick={handlePrevious}>
            &#8592;
          </button>
          <div className="carousel-item active">{selectedSpecialty}</div>
          <button className="carousel-arrow" onClick={handleNext}>
            &#8594;
          </button>
        </div>

        {/* Lista de doctores */}
        <div className="specialty-doctors">
          <ul>
            {doctors.map((doctor, index) => (
              <li
                key={index}
                className={`doctor-item ${
                  selectedDoctor === doctor ? "selected" : ""
                }`}
                onClick={() => handleSelectDoctor(doctor)}
              >
                {doctor}
              </li>
            ))}
          </ul>
        </div>

        {/* Calendario */}
        {showCalendar && (
          <div className="calendar">
            <div className="calendar-grid">
              {weekDays.map((day, index) => (
                <div key={index} className="calendar-weekday">
                  {day}
                </div>
              ))}
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

            {/* Detalles de la cita */}
            {selectedDate && (
              <div className="appointment-details">
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedDate.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <div className="time-selector">
                  <label htmlFor="time">Time:</label>
                  <input
                    type="time"
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button className="schedule-button" onClick={handleSchedule}>
              Schedule
            </button>
          </div>
        )}

        {/* Lista de citas programadas */}
        {appointments.length > 0 && (
          <div className="appointments-list">
            <h3>Scheduled</h3>
            {appointments.map((appointment, index) => (
              <p key={index} className="appointment-item">
                {appointment}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};