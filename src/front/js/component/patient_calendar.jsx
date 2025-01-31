import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar";

const PatientCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          scope: SCOPES,
        })
        .then(() => {
          const auth = gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(setIsSignedIn);
        });
    }

    gapi.load("client:auth2", start);
  }, []);

  const fetchAvailableSlots = async () => {
    if (!isSignedIn) return;

    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        q: "Disponibilidad Médica",
        orderBy: "startTime",
      });

      setAvailableSlots(response.result.items || []);
    } catch (error) {
      console.error("Error fetching availability: ", error);
    }
  };

  const scheduleAppointment = async (slot) => {
    if (!isSignedIn) return;

    const event = {
      summary: "Cita Médica",
      description: "Consulta médica agendada.",
      start: { dateTime: slot.start.dateTime, timeZone: "Europe/Madrid" },
      end: { dateTime: slot.end.dateTime, timeZone: "Europe/Madrid" },
      attendees: [{ email: "doctor@example.com" }, { email: "patient@example.com" }],
    };

    try {
      await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      fetchAvailableSlots();
    } catch (error) {
      console.error("Error scheduling appointment: ", error);
    }
  };

  return (
    <div>
      <h2>Patient's Booking</h2>
      {!isSignedIn ? (
        <button onClick={() => gapi.auth2.getAuthInstance().signIn()}>Sign In with Google</button>
      ) : (
        <>
          <button onClick={fetchAvailableSlots}>Refresh Available Slots</button>
          <h3>Available Appointments</h3>
          <ul>
            {availableSlots.map((slot) => (
              <li key={slot.id}>
                {slot.start.dateTime}
                <button onClick={() => scheduleAppointment(slot)}>Book</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PatientCalendar;
