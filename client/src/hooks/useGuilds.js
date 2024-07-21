/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { selectGuildsPageService } from "../../services/guildService";

const useEntries = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [guilds, setGuilds] = useState([]);
	const [prevPage, setPrevPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [totalGuilds, setTotalGuilds] = useState(null);
	const fetchEntries = async (page) => {
		try {
			const { guilds, totalPages, totalGuilds } = await selectGuildsPageService(page, searchTerm);

			setGuilds(guilds);
			setPrevPage(currentPage - 1 < 1 ? null : currentPage - 1);
			setNextPage(currentPage + 1 > totalPages ? null : currentPage + 1);
			setTotalPages(totalPages);
			setTotalGuilds(totalGuilds);
		} catch (error) {
			toast.error(error.message);
		}
	};
	useEffect(() => {
		fetchEntries(currentPage);
	}, [currentPage]);
	const goToPage = (page) => {
		setCurrentPage(page);
	};
	return { searchTerm, setSearchTerm, guilds, prevPage, nextPage, currentPage, totalPages, totalGuilds, goToPage };
};

export default useEntries;
