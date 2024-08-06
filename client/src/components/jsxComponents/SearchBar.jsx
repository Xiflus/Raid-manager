/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { selectAllGuildsService } from "../../../services/guildService.js";

const SearchBar = ({ placeholder, onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [loading, setLoading] = useState(false);

	const fetchGuilds = async (searchWord) => {
		setLoading(true);
		try {
			const data = await selectAllGuildsService(searchWord);
			onSearch(data.guilds);
		} catch (error) {
			onSearch([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Cargar todas las guilds inicialmente
		fetchGuilds("");
	}, []);

	const handleFilter = async (searchWord) => {
		setSearchTerm(searchWord);

		if (searchWord === "") {
			// Cuando el input esté vacío, carga todas las guilds
			fetchGuilds("");
			return;
		}

		fetchGuilds(searchWord);
	};

	const handleChange = (event) => {
		handleFilter(event.target.value);
	};

	return (
		<div className="search">
			<div className="searchInputs">
				<input type="text" placeholder={placeholder} value={searchTerm} onChange={handleChange} />
				<div className="searchIcon">{searchTerm.length === 0 ? <span>🔍</span> : <span onClick={() => handleFilter("")}>❌</span>}</div>
			</div>
			{loading && <p>Cargando...</p>}
		</div>
	);
};

SearchBar.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
