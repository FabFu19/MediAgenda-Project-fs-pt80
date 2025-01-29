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
          googleAuthUrl: "",
      },

      actions: {
          register: async (userData) => {
              try {
                  setStore({ loading: true, error: null });
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/register`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(userData),
                  });

                  if (resp.ok) {
                      setStore({ loading: false });
                      console.log("Registro exitoso.");
                  } else {
                      setStore({ loading: false, error: "Error al registrar el usuario." });
                  }
              } catch (error) {
                  setStore({ loading: false, error: "Error en el registro." });
                  console.error("Error:", error);
              }
          },

          login: async (email, password) => {
              try {
                  setStore({ loading: true, error: null });

                  const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email, password }),
                  });

                  if (resp.ok) {
                      const data = await resp.json();
                      setStore({
                          user: data.user,
                          token: data.token,
                          role: data.user.paciente ? "paciente" : "especialista",
                          loading: false,
                      });
                      localStorage.setItem("token", data.token);
                  } else {
                      setStore({ loading: false, error: "Credenciales inválidas." });
                  }
              } catch (error) {
                  setStore({ loading: false, error: "Error en el login." });
                  console.error("Error:", error);
              }
          },

          logout: () => {
              setStore({ user: null, token: null, role: null });
              localStorage.removeItem("token");
          },

          getProfile: async () => {
              const store = getStore();
              setStore({ loading: true, error: null });

              try {
                  const token = store.token || localStorage.getItem("token");

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
                      user: data.user,
                      profile: data.profile,
                      role: data.role,
                      loading: false,
                  });
              } catch (error) {
                  console.error("Error en getProfile:", error);
              }
          },

          fetchAppointments: async () => {
              const { token } = getStore();
              try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/citas`, {
                      headers: { Authorization: `Bearer ${token}` },
                  });

                  if (resp.ok) {
                      const data = await resp.json();
                      setStore({ appointments: data });
                  }
              } catch (error) {
                  console.error("Error al obtener citas:", error);
              }
          },

          fetchAvailability: async () => {
              const { token } = getStore();
              try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/disponibilidad`, {
                      headers: { Authorization: `Bearer ${token}` },
                  });

                  if (resp.ok) {
                      const data = await resp.json();
                      setStore({ availability: data });
                  }
              } catch (error) {
                  console.error("Error al obtener disponibilidad:", error);
              }
          },

          createAvailability: async (availabilityData) => {
              const { token } = getStore();
              try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/disponibilidad`, {
                      method: "POST",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(availabilityData),
                  });

                  if (resp.ok) {
                      actions.fetchAvailability();
                      console.log("Disponibilidad creada con éxito.");
                  } else {
                      console.error("Error al crear disponibilidad.");
                  }
              } catch (error) {
                  console.error("Error en createAvailability:", error);
              }
          },

          updateAvailability: async (id, updatedData) => {
              const { token } = getStore();
              try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/disponibilidad/${id}`, {
                      method: "PUT",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(updatedData),
                  });

                  if (resp.ok) {
                      actions.fetchAvailability();
                      console.log("Disponibilidad actualizada con éxito.");
                  }
              } catch (error) {
                  console.error("Error en updateAvailability:", error);
              }
          },

          deleteAvailability: async (id) => {
              const { token } = getStore();
              try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/disponibilidad/${id}`, {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                  });

                  if (resp.ok) {
                      actions.fetchAvailability();
                      console.log("Disponibilidad eliminada con éxito.");
                  }
              } catch (error) {
                  console.error("Error en deleteAvailability:", error);
              }
          },

          scheduleAppointment: async (appointmentData) => {
              const { token } = getStore();
              try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/citas`, {
                      method: "POST",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(appointmentData),
                  });

                  if (resp.ok) {
                      actions.fetchAppointments();
                      console.log("Cita agendada con éxito.");
                  } else {
                      console.error("Error al agendar la cita.");
                  }
              } catch (error) {
                  console.error("Error en scheduleAppointment:", error);
              }
          },

          updateAppointment: async (id, updatedData) => {
              const { token } = getStore();
              try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/citas/actualizar/${id}`, {
                      method: "PUT",
                      headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(updatedData),
                  });

                  if (resp.ok) {
                      actions.fetchAppointments();
                      console.log("Cita actualizada con éxito.");
                  }
              } catch (error) {
                  console.error("Error en updateAppointment:", error);
              }
          },

          cancelAppointment: async (id) => {
              const { token } = getStore();
              try {
                  const resp = await fetch(`${process.env.BACKEND_URL}/api/citas/cancelar/${id}`, {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                  });

                  if (resp.ok) {
                      actions.fetchAppointments();
                      console.log("Cita cancelada con éxito.");
                  }
              } catch (error) {
                  console.error("Error en cancelAppointment:", error);
              }
          },
      },
  };
};

export default getState;