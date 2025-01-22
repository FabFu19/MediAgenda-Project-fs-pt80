const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// current_user: null,
            // user_token: null,
            // citas: [],
            // especialistas: [],
            // paciente_citas: [],
            // disponibilidad: [],
		},
		actions: {
			// user_register: async (formData) => {
			// 	const url = "https://ideal-disco-97q4qxxw959v2pvwv-3001.app.github.dev/";
				
            //     try {
            //         const respo = await fetch(`${url}/api/register`, {
            //             method: "POST",
            //             headers: { 
			// 				"Content-Type": "application/json" 
			// 			},
            //             body: JSON.stringify(formData),
            //         });
            //         if (!respo.ok) throw new Error("Error en el registro");
            //         const data = await response.json();
            //         console.log("Usuario registrado:", data);
            //     } catch (error) {
            //         console.error("Error en registro:", error);
            //     }
            // },
		}
	};
};

export default getState;
