/* eslint-disable no-unused-vars */
const { VITE_API_URL } = import.meta.env;
const setHeaders = () => {
	const config = {
		credentials: "include",
	};
	const token = localStorage.getItem("authToken");
	if (!token) {
		return config;
	}
	config.headers = {
		authorization: token,
	};
	return config;
};

export const createCharacterService = async (formData) => {
	const res = await fetch(`${VITE_API_URL}/api/characters`, {
		method: "POST",
		headers: setHeaders().headers,
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message.character);
	}
	console.log("characterService", body.data.character);
	return body.data.character;
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
	const res = await fetch(`${VITE_API_URL}/api/characters/${characterId}`, setHeaders());
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};
