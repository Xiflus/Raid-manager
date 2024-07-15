const { VITE_API_URL } = import.meta.env;

export const singUpService = async (username, email, password) => {
	// Obtenemos la respuesta del servidor
	const res = await fetch(`${VITE_API_URL}/api/users/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, email, password }),
	});

	const body = await res.json();

	// Si hay algún error, lo lanzamos
	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.message;
};

export const loginService = async (username, password) => {
	const res = await fetch(`${VITE_API_URL}/api/users/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});

	const body = await res.json();

	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data.token;
};

// Función que realiza una petición al servidor para validar un usuario.
export const activateUserService = async (registrationCode) => {
	// Obtenemos una respuesta.
	const res = await fetch(`${VITE_API_URL}/api/users/validate/${registrationCode}`, {
		method: "put",
	});

	// Obtenemos el body.
	const body = await res.json();

	// Si hay algún error lo lanzamos.
	if (body.status === "error") {
		throw new Error(body.message);
	}
};
