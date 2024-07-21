/* eslint-disable no-unused-vars */
const { VITE_API_URL } = import.meta.env;
const setHeaders = () => {
	const config = {};
	const token = localStorage.getItem("authToken");
	if (!token) {
		return config;
	}
	config.headers = {
		authorization: token,
	};
	return config;
};
export const createGuildService = async (formData) => {
	const res = await fetch(`${VITE_API_URL}/api/guilds`, {
		method: "POST",
		headers: {
			authorization: localStorage.getItem("authToken"),
		},
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};
export const editGuildService = async ({ guildId, formData }) => {
	console.log(formData);
	const res = await fetch(`${VITE_API_URL}/api/guilds/${guildId}`, {
		method: "PUT",
		headers: {
			authorization: localStorage.getItem("authToken"),
		},
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const selectAllGuildsService = async (searchTerm = "") => {
	const res = await fetch(`${VITE_API_URL}/api/guilds`, setHeaders());

	const body = await res.json();

	// Si hay algún error, lo lanzamos
	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data;
};

export const selectGuildsPageService = async (page = 1, searchTerm = "") => {
	const res = await fetch(`${VITE_API_URL}/api/guilds?page=${page}`, setHeaders());

	const body = await res.json();

	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data;
};
