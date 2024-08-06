/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from "react";
import { showToast } from "../utils/toast.jsx";
import { selectGuildsPageService } from "../../services/guildService";

const useGuilds = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [guilds, setGuilds] = useState([]);
	const [prevPage, setPrevPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [totalGuilds, setTotalGuilds] = useState(null);
	const fetchGuilds = async (page) => {
		try {
			const { guilds, totalPages, totalGuilds } = await selectGuildsPageService(page);
			setGuilds(guilds);
			setPrevPage(currentPage - 1 < 1 ? null : currentPage - 1);
			setNextPage(currentPage + 1 > totalPages ? null : currentPage + 1);
			setTotalPages(totalPages);
			setTotalGuilds(totalGuilds);
		} catch (err) {
			showToast(err.message, "error");
		}
	};
	useEffect(() => {
		fetchGuilds(currentPage);
	}, [currentPage]);
	const goToPage = (page) => {
		setCurrentPage(page);
	};
	return { searchTerm, setSearchTerm, setGuilds, guilds, prevPage, nextPage, currentPage, totalPages, totalGuilds, goToPage };
};

export default useGuilds;
