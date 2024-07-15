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

export const activateUserService = async (registrationCode) => {
	const res = await fetch(`${VITE_API_URL}/api/users/validate/${registrationCode}`, {
		method: "put",
  });
  const body = await res.json();
  if (body.status === 'error') {
		throw new Error(body.message);
	}
};

export const getPrivateProfileService = async (authToken) => {
	const res = await fetch(`${VITE_API_URL}/api/users`, {
		headers: {
			Authorization: authToken,
		},
	});
const body = await res.json();
if (body.status === "error") {
		throw new Error(body.message);
	}	
	return body.data.user;
};
