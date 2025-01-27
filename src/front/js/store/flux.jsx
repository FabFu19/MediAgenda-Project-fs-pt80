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

            //agendar cita con (Google Calendar API)
      
            
            // manejo disponibilidad (Google Calendar API)
            
          },
	};
};

export default getState;
