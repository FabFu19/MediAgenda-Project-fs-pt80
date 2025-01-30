import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

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
  const { store, actions } = useContext(Context);
  const [selectedSpecialtyIndex, setSelectedSpecialtyIndex] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState("09:00");

  useEffect(() => {
    if (actions.fetchAppointments) {
      actions.fetchAppointments();
    }
  }, [actions]);

  const handleCreateEvent = async () => {
    if (!selectedDoctor) {
      console.error("No doctor selected");
      return;
    }
    if (!selectedDate) {
      console.error("No date selected");
      return;
    }
    try {
      const appointmentData = {
        medico_id: selectedDoctor,
        appointment_date: selectedDate.toISOString().split("T")[0],
        appointment_time: selectedTime,
        notes: "Consulta médica",
      };
      await actions.createAppointment(appointmentData);
      setAppointments([...appointments, appointmentData]);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
    }
  };

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

  const selectedSpecialty = specialties[selectedSpecialtyIndex];
  const doctors = doctorsBySpecialty[selectedSpecialty] || [];
  const today = new Date();
  const days = daysInMonth(today.getMonth() + 1, today.getFullYear());
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <>
      <div className="appointment-calendar-container mb-5 text-center">
        <div className="appointment-search-bar">
          <input
            type="text"
            className="appointment-search-input"
            placeholder="e.g. Madrid, Madrid"
          />
          <button className="appointment-search-button">Search</button>
        </div>

        <div className="appointment-carousel">
          <button className="appointment-carousel-arrow" onClick={handlePrevious}>
            &#8592;
          </button>
          <div className="appointment-carousel-item active">{selectedSpecialty}</div>
          <button className="appointment-carousel-arrow" onClick={handleNext}>
            &#8594;
          </button>
        </div>

        <div className="appointment-specialty-doctors ms-2">
          <ul>
            {doctors.map((doctor, index) => (
              <li
                key={index}
                className={`appointment-doctor-item ${
                  selectedDoctor === doctor ? "selected" : ""
                }`}
                onClick={() => handleSelectDoctor(doctor)}
              >
                {doctor}
              </li>
            ))}
          </ul>
        </div>

        {showCalendar && (
          <div className="appointment-calendar">
            <div className="appointment-calendar-grid">
              {weekDays.map((day, index) => (
                <div key={index} className="appointment-calendar-weekday">
                  {day}
                </div>
              ))}
              {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
                <div
                  key={day}
                  className={`appointment-calendar-day ${
                    selectedDate?.getDate() === day ? "selected" : ""
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>

            {selectedDate && (
              <div className="appointment-details-container">
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedDate.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <div className="appointment-time-selector">
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

            <button
              className="appointment-schedule-button"
              onClick={handleCreateEvent}
            >
              Schedule
            </button>
          </div>
        )}

        {appointments.length > 0 && (
          <div className="appointment-list mt-3">
            {appointments.map((appointment, index) => (
              <p key={index} className="appointment-list-item">
                {`Appointment on ${appointment.appointment_date} at ${appointment.appointment_time} with ${appointment.medico_id}`}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
