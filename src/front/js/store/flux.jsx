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
            
        },

        actions: {
            // Registro de usuario
            register: async (userData) => {
                try {
                    setStore({ loading: true, error: null });
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/register`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userData),
                    });

                    if (resp.ok) {
                        console.log("Registro exitoso.");
                        setStore({ loading: false });
                    } else {
                        setStore({ loading: false, error: "Error al registrar el usuario." });
                    }
                } catch (error) {
                    setStore({ loading: false, error: "Error durante el registro." });
                    console.error("Error durante el registro:", error);
                }
            },

            // Inicio de sesión
            login: async (email, password) => {
                try {
                    setStore({ loading: true, error: null });
                    const resp = await fetch(`${getStore().apiUrl}/api/login`, {
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
                    setStore({ loading: false, error: "Error durante el inicio de sesión." });
                    console.error("Error durante el login:", error);
                }
            },

            // Obtener perfil del usuario
            getProfile: async () => {
                const store = getStore();
                try {
                    const token = store.token || localStorage.getItem("token");
                    setStore({ loading: true, error: null });

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/profile`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({
                            user: data.user,
                            role: data.role,
                            profile: data.profile,
                            loading: false,
                        });
                    } else {
                        setStore({ loading: false, error: "Error al obtener el perfil." });
                    }
                } catch (error) {
                    setStore({ loading: false, error: "Error al obtener el perfil." });
                    console.error("Error en getProfile:", error);
                }
            },

            // Cerrar sesión
            logout: () => {
                setStore({ user: null, token: null, role: null });
                localStorage.removeItem("token");
            },

            // Obtener disponibilidad del médico (paciente)
            fetchAvailability: async (medicoId) => {
                try {
                    setStore({ loading: true });
                    const token = getStore().token;

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/calendar/availability`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ medico_id: medicoId }),
                    });

                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ availability: data.events, loading: false });
                    } else {
                        setStore({ loading: false, error: "Error al obtener disponibilidad." });
                    }
                } catch (error) {
                    setStore({ loading: false, error: "Error al obtener disponibilidad." });
                    console.error("Error en fetchAvailability:", error);
                }
            },

            // Crear disponibilidad (médico)
            createAvailability: async (availabilityData) => {
                try {
                    setStore({ loading: true });
                    const token = getStore().token;

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/disponibilidad`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(availabilityData),
                    });

                    if (resp.ok) {
                        console.log("Disponibilidad creada exitosamente.");
                        setStore({ loading: false });
                        getActions().fetchAvailability(availabilityData.medico_id);
                    } else {
                        setStore({ loading: false, error: "Error al crear disponibilidad." });
                    }
                } catch (error) {
                    setStore({ loading: false, error: "Error al crear disponibilidad." });
                    console.error("Error en createAvailability:", error);
                }
            },

            // Crear cita (paciente)
            createAppointment: async (appointmentData) => {
                try {
                    setStore({ loading: true });
                    const token = getStore().token;

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/citas`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(appointmentData),
                    });

                    if (resp.ok) {
                        console.log("Cita creada exitosamente.");
                        setStore({ loading: false });
                        getActions().fetchAppointments();
                    } else {
                        setStore({ loading: false, error: "Error al crear cita." });
                    }
                } catch (error) {
                    setStore({ loading: false, error: "Error al crear cita." });
                    console.error("Error en createAppointment:", error);
                }
            },

            // Cancelar o eliminar cita
            deleteAppointment: async (appointmentId) => {
                try {
                    setStore({ loading: true });
                    const token = getStore().token;

                    const resp = await fetch(`${process.env.BACKEND_URL}/api/calendar/events/${appointmentId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (resp.ok) {
                        console.log("Cita eliminada exitosamente.");
                        setStore({ loading: false });
                        getActions().fetchAppointments();
                    } else {
                        setStore({ loading: false, error: "Error al eliminar cita." });
                    }
                } catch (error) {
                    setStore({ loading: false, error: "Error al eliminar cita." });
                    console.error("Error en deleteAppointment:", error);
                }
            },
        },
    };
};

export default getState;