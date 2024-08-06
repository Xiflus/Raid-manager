/* eslint-disable no-unused-vars */
const { VITE_API_URL } = import.meta.env;
const setHeaders = () => {
	const config = {
		credentials: "include",
		headers: {
			"content-type": "application/json",
		},
	};
	const token = localStorage.getItem("authToken");
	if (token) {
		config.headers.authorization = token;
	}

	return config;
};

export const createCharacterService = async (formData) => {
	try {
		const res = await fetch(`${VITE_API_URL}/api/characters`, {
			method: "POST",
			headers: {
				authorization: localStorage.getItem("authToken"),
			},
			body: formData,
		});

		if (!res.ok) {
			// Manejar los errores HTTP
			const errorBody = await res.json();
			throw new Error(errorBody.message);
		}

		const body = await res.json();
		if (body.status === "error") {
			// Manejar los errores del cuerpo de la respuesta
			throw new Error(body.message.character);
		}

		return body.data.character;
	} catch (error) {
		// Re-lanzar el error para que pueda ser manejado por el consumidor del servicio
		console.error("Error en createCharacterService:", error); // Para depuración
		throw error;
	}
};

export const getUserCharacterService = async () => {
	const res = await fetch(`${VITE_API_URL}/api/characters`, setHeaders());
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const selectCharacterService = async (characterId) => {
	const res = await fetch(`${VITE_API_URL}/api/characters/select`, {
		method: "POST",
		headers: setHeaders().headers,
		body: JSON.stringify({ characterId }),
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};
