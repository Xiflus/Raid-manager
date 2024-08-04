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
export const selectAllPostsServices = async () => {
	const res = await fetch(`${VITE_API_URL}/api/posts`, setHeaders());

	const body = await res.json();

	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const selectPostsPageService = async (guildId, page = 1) => {
	// Ajustar la URL para incluir el parámetro de página
	const res = await fetch(`${VITE_API_URL}/api/guilds/${guildId.guildId}/posts?page=${page}`, setHeaders());

	const body = await res.json();

	// Si hay algún error, lo lanzamos
	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data;
};

export const createPostServices = async ({ guildId, formData }) => {
	const res = await fetch(`${VITE_API_URL}/api/guilds/${guildId}/posts`, {
		method: "POST",
		headers: {
			Authorization: localStorage.getItem("authToken"),
		},
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const insertFileService = async ({ postsId, formData }) => {
	const res = await fetch(`${VITE_API_URL}/api/posts/${postsId}/files`, {
		method: "POST",
		headers: setHeaders().headers,
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const getPostService = async (postsId) => {
	const res = await fetch(`${VITE_API_URL}/api/posts/${postsId}`, setHeaders());
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const likePostsService = async (guildId, postId, value, characterId) => {
	console.log("likePostService", guildId, postId, value);
	const res = await fetch(`${VITE_API_URL}/api/guilds/${guildId}/posts/${postId}/likes`, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: localStorage.getItem("authToken"),
		},
		body: JSON.stringify({ value, characterId }),
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};
