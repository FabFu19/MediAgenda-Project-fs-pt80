const getState = ({ getStore, getActions, setStore }) => {
	return {
		      store: {
            user: null, 
            token: null, 
            role: null,
            appointments: [],
            availability: [],
            loading: false,
            error: null,
            url: "https://glowing-succotash-5g4p4995q9vw2v6q6-3001.app.github.dev"
          },
      
          actions: {

            register: async (userData) => {
                try {

                  setStore({loading: true, error: null})

                  const resp = await fetch(`${process.env.BACKEND_URL}/api/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                  });
        
                  if (resp.ok) {
                    setStore({ loading: false }); 
                    console.log("Registration successful.");
                  } else {
                    setStore({ loading: false, error: "Error al registrar el usuario." });
                    console.error("Failed to register.");
                  }
                } catch (error) {
                  setStore({ loading: false, error: "Error durante el registro." });
                  console.error("Error during registration:", error);
                }
              },

            login: async (email, password) => {
              try {
                // const store = getStore();
                setStore({ loading: true, error: null }); 
                
                const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password }),
                });
      
                if (resp.ok) {
                  const data = await resp.json();
                  setStore({ user: data.user, token: data.token, role: data.user.paciente ? "paciente" : "especialista", loading: false});
                  localStorage.setItem("token", data.token);
                } else {
                  setStore({ loading: false, error: "Credenciales inválidas." });
                  console.error("Error al iniciar sesion.");
                }
              } catch (error) {
                setStore({ loading: false, error: "Error durante el login." });
                console.error("Error during login:", error);
              }
              
            },

            getProfile: async () => {

              const store = getStore();
              setStore({ loading: true, error: null });

              try {
                  const token = store.token || localStorage.getItem("token");
                  // if (!token) throw new Error("Usuario no autenticado.");
          
                  const response = await fetch(`${process.env.BACKEND_URL}/api/profile`, {
                      method: "GET",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                  });
          
                  if (!response.ok) {
                      throw new Error("Error al obtener el perfil del usuario.");
                  }
          
                  const data = await response.json();
                  setStore({
                      user: data.user, profile: data.profile, role: data.user.paciente ? "paciente" : "especialista", loading: false,
                  });
              } catch (error) {
                  console.error("Error en obtener el Perfil:", error);
              }
              
            },
            
            logout: () => {
              setStore({ user: null, token: null, role: null });
              localStorage.removeItem("token");
            },
      
            
    
            fetchAppointments: async () => {
              const { token } = getStore();
              try {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/appointments`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                if (resp.ok) {
                  const data = await resp.json();
                  setStore({ appointments: data });
                }
              } catch (error) {
                console.error("Error fetching appointments:", error);
              }
            },

            // Obtener disponibilidad del médico
            fetchAvailability: async (medicoId) => {
              try {
                  setStore({ loading: true });
                  const token = getStore().token;

                  const resp = await fetch(`${getStore().url}/api/calendar/availability`, {
                      method: "POST",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          access_token: token,
                          medico_id: medicoId,
                      }),
                  });

                  if (resp.ok) {
                      const data = await resp.json();
                      setStore({ availability: data.events, loading: false });
                  } else {
                      setStore({ loading: false, error: "Error al obtener disponibilidad." });
                      console.error("Error al obtener disponibilidad.");
                  }
              } catch (error) {
                  setStore({ loading: false, error: "Error al obtener disponibilidad." });
                  console.error("Error:", error);
              }
          },

          // Crear disponibilidad del médico
          createAvailability: async (availabilityData) => {
              try {
                  setStore({ loading: true });
                  const token = getStore().token;

                  const resp = await fetch(`${getStore().url}/api/disponibilidad`, {
                      method: "POST",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(availabilityData),
                  });

                  if (resp.ok) {
                      const data = await resp.json();
                      getActions().fetchAvailability();
                      setStore({ loading: false });
                      console.log("Disponibilidad creada:", data.msg);
                  } else {
                      setStore({ loading: false, error: "Error al crear disponibilidad." });
                  }
              } catch (error) {
                  setStore({ loading: false, error: "Error al crear disponibilidad." });
                  console.error("Error:", error);
              }
          },

          // Crear una cita
          createAppointment: async (appointmentData) => {
              try {
                  setStore({ loading: true });
                  const token = getStore().token;

                  const resp = await fetch(`${getStore().url}/api/citas`, {
                      method: "POST",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(appointmentData),
                  });

                  if (resp.ok) {
                      const data = await resp.json();
                      getActions().fetchAppointments();
                      setStore({ loading: false });
                      console.log("Cita creada:", data.msg);
                  } else {
                      setStore({ loading: false, error: "Error al crear cita." });
                  }
              } catch (error) {
                  setStore({ loading: false, error: "Error al crear cita." });
                  console.error("Error:", error);
              }
          },

          // Actualizar una cita
          updateAppointment: async (appointmentId, appointmentData) => {
              try {
                  setStore({ loading: true });
                  const token = getStore().token;

                  const resp = await fetch(
                      `${getStore().url}/api/calendar/events/${appointmentId}`,
                      {
                          method: "PUT",
                          headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                          },
                          body: JSON.stringify(appointmentData),
                      }
                  );

                  if (resp.ok) {
                      const data = await resp.json();
                      getActions().fetchAppointments();
                      setStore({ loading: false });
                      console.log("Cita actualizada:", data.msg);
                  } else {
                      setStore({ loading: false, error: "Error al actualizar cita." });
                  }
              } catch (error) {
                  setStore({ loading: false, error: "Error al actualizar cita." });
                  console.error("Error:", error);
              }
          },

          // Eliminar una cita
          deleteAppointment: async (appointmentId) => {
              try {
                  setStore({ loading: true });
                  const token = getStore().token;

                  const resp = await fetch(
                      `${getStore().url}/api/calendar/events/${appointmentId}`,
                      {
                          method: "DELETE",
                          headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                          },
                      }
                  );

                  if (resp.ok) {
                      getActions().fetchAppointments();
                      setStore({ loading: false });
                      console.log("Cita eliminada.");
                  } else {
                      setStore({ loading: false, error: "Error al eliminar cita." });
                  }
              } catch (error) {
                  setStore({ loading: false, error: "Error al eliminar cita." });
                  console.error("Error:", error);
              }
          },
            
        },
	};
};

export default getState;
