const { VITE_API_URL } = import.meta.env;
const setHeaders = () => {
	const config = {};
	const token = localStorage.getItem("token");
	if (!token) {
		return config;
	}
	config.headers = {
		authorization: token,
	};
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

export const selectPostsPageService = async (page = 1) => {
	// Ajustar la URL para incluir el parámetro de página
	const res = await fetch(`${VITE_API_URL}/api/posts?page=${page}`, setHeaders());

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
			authorization: localStorage.getItem("token"),
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
		headers: {
			authorization: localStorage.getItem("token"),
		},
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const getPostService = async (postsId) => {
	const res = await fetch(`${VITE_API_URL}/api/posts/${postsId}`);
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const likePostsService = async (postsId, rating) => {
	const res = await fetch(`${VITE_API_URL}/api/posts/${postsId}/votes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: localStorage.getItem("token"),
		},
		body: JSON.stringify({ value: rating }),
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};
