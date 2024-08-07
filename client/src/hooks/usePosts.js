/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { showToast } from "../utils/toast.jsx";
import { selectPostsPageService } from "../../services/postServices.js";
import { useParams } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContext";
const usePosts = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [posts, setPosts] = useState([]);
	const [prevPage, setPrevPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [totalPosts, setTotalPosts] = useState(null);
	const { selectedCharacter } = useContext(CharacterContext);
	const characterId = selectedCharacter[0]?.id;
	console.log("usePosts -> characterId", characterId);

	const { guildId } = useParams();

	const fetchPosts = async (page) => {
		try {
			const { posts, totalPosts, totalPages } = await selectPostsPageService(characterId, guildId, page);
			setPosts(posts);
			setPrevPage(currentPage - 1 < 1 ? null : currentPage - 1);
			setNextPage(currentPage + 1 > totalPages ? null : currentPage + 1);
			setTotalPages(totalPages);
			setTotalPosts(totalPosts);
		} catch (err) {
			showToast(err.message, "error");
		}
	};
	useEffect(() => {
		if (guildId) {
			fetchPosts(currentPage);
		}
	}, [currentPage, guildId]);
	const goToPage = (page) => {
		setCurrentPage(page);
	};
	return {
		posts,
		setPosts,
		searchTerm,
		setSearchTerm,
		prevPage,
		nextPage,
		currentPage,
		totalPages,
		totalPosts,
		goToPage,
	};
};

export default usePosts;
