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
        <div className="fixed top-[var(--header-height)] left-0 right-0 flex justify-center p-3 z-50">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-400 text-center"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <span>🔍</span>
                </div>
                {searchTerm.length > 0 && (
                    <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        onClick={() => handleFilter("")}
                    >
                        <span>❌</span>
                    </div>
                )}
            </div>
            {loading && <p className="text-center text-gray-400 mt-2"></p>}
        </div>
    );
};

SearchBar.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
