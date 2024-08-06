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

export const singUpService = async (username, email, password) => {
	// Obtenemos la respuesta del servidor
	const res = await fetch(`${VITE_API_URL}/api/users/register`, {
		method: "POST",
		headers: setHeaders().headers,
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
			"content-type": "application/json",
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
	if (body.status === "error") {
		throw new Error(body.message);
	}
};

export const getPrivateProfileService = async () => {
	const res = await fetch(`${VITE_API_URL}/api/users`, setHeaders());
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data.user;
};

export const updateUserService = async (username) => {
	const res = await fetch(`${VITE_API_URL}/api/users`, {
		method: "put",
		headers: {"content-type": "application/json",
			authorization:localStorage.getItem("authToken")
		},
		body: JSON.stringify({
			username,
		}),
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data.user;
};

export const updateAvatarService = async (avatar) => {
	const formData = new FormData();
	formData.append("avatar", avatar);
	const res = await fetch(`${VITE_API_URL}/api/users/avatar`, {
		method: "put",
		headers: {
			authorization:localStorage.getItem("authToken")
		},
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data.avatar.name;
};

export const recoverPasswordService = async ({ email }) => {
	const res = await fetch(`${VITE_API_URL}/api/users/password/recover`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({ email }),
	});

	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body;
};

export const resetPasswordService = async (recoverPassCode, newPassword) => {
	const res = await fetch(`${VITE_API_URL}/api/users/password/reset/${recoverPassCode}`, {
		method: "PUT",
		headers:{ "content-type": "application/json"},
		body: JSON.stringify({ newPassword }),
	});

	const body = await res.json();

	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.message;
};

export const changePasswordService = async (currentPassword, newPassword) => {
	const res = await fetch(`${VITE_API_URL}/api/users/password/change`, {
		method: "PUT",
		headers: {"content-type": "application/json",
			authorization:localStorage.getItem("authToken")
		},
		body: JSON.stringify({ currentPassword, newPassword }),
	});

	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};
