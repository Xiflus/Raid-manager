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


export const createCharacterService = async (formData) => {
    const res = await fetch(`${VITE_API_URL}/api/characters`, {
        method: "POST",
        headers: {
            authorization: localStorage.getItem("authToken"),
        },
        body: formData
    });
    const body = await res.json();
    if (body.status === "error") {
        throw new Error(body.message);
    }
    return body.data;
};