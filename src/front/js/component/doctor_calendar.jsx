import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.APP_CLIENT_ID;
const API_KEY = process.env.APP_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar";

const DoctorCalendar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  
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

  const handleAuthClick = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOutClick = () => {
    gapi.auth2.getAuthInstance().signOut();
    setEvents([]);
  };

  const fetchEvents = async () => {
    if (!isSignedIn) return;

    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 100,
        orderBy: "startTime",
      });

      setEvents(response.result.items || []);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  const addAvailability = async (start, end) => {
    if (!isSignedIn) return;

    const event = {
      summary: "Disponibilidad Médica",
      description: "Horario disponible para citas",
      start: { dateTime: start.toISOString(), timeZone: "Europe/Madrid" },
      end: { dateTime: end.toISOString(), timeZone: "Europe/Madrid" },
    };

    try {
      await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });

      fetchEvents();
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  return (
    <div>
      <h2>Doctor's Calendar</h2>
      {!isSignedIn ? (
        <button onClick={handleAuthClick}>Sign In with Google</button>
      ) : (
        <>
          <button onClick={handleSignOutClick}>Sign Out</button>
          <button onClick={fetchEvents}>Refresh Events</button>
          
          <h3>Your Available Slots</h3>
          <ul>
            {events.map((event) => (
              <li key={event.id}>{event.summary} - {event.start.dateTime}</li>
            ))}
          </ul>

          <button onClick={() => addAvailability(new Date(), new Date(new Date().getTime() + 60 * 60 * 1000))}>
            Add Availability (Next Hour)
          </button>
        </>
      )}
    </div>
  );
};

export default DoctorCalendar;
