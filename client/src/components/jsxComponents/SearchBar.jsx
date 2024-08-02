import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { selectAllGuildsService } from "../../../services/guildService.js";

const SearchBar = ({ placeholder }) => {
    const allGuilds = useRef([]);
    const wordEntered = useRef("");
    const filteredData = useRef([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await selectAllGuildsService();
                console.log("Fetched data:", data); // Verificar los datos obtenidos

                if (!data || !data.guilds || !Array.isArray(data.guilds)) {
                    throw new Error(
                        "Fetched data is not in the expected format"
                    );
                }

                // Aplanar el array de arrays de guilds
                allGuilds.current = data.guilds.flat();
            } catch (error) {
                console.error("Error fetching guilds:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleFilter = (searchWord) => {
        wordEntered.current = searchWord;

        if (searchWord === "") {
            filteredData.current = [];
            return;
        }

        // Filtrar solo por la propiedad name
        filteredData.current = allGuilds.current.filter(
            (value) =>
                value.name &&
                value.name.toLowerCase().includes(searchWord.toLowerCase())
        );
    };

    const handleChange = (event) => {
        const searchWord = event.target.value;
        handleFilter(searchWord);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleFilter(wordEntered.current);
            if (filteredData.current.length === 1) {
                redirectToGuild(filteredData.current[0].id);
            }
        }
    };

    const handleClick = (guildId) => {
        redirectToGuild(guildId);
    };

    const redirectToGuild = (guildId) => {
        window.location.href = `/guilds/${guildId}`;
    };

    const clearInput = () => {
        filteredData.current = [];
        wordEntered.current = "";
        document.getElementById("searchInput").value = ""; // Limpiar el input manualmente
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    id="searchInput"
                    type="text"
                    placeholder={placeholder}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} // Agrega el manejo de la tecla Enter
                />
                <div className="searchIcon">
                    {wordEntered.current.length === 0 ? (
                        <span>🔍</span>
                    ) : (
                        <span onClick={clearInput}>❌</span>
                    )}
                </div>
            </div>
            {loading && <p>Cargando...</p>}
            {filteredData.current.length !== 0 && (
                <div className="dataResult">
                    {filteredData.current.map((value, key) => (
                        <div key={key} onClick={() => handleClick(value.id)}>
                            <p>{value.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

SearchBar.propTypes = {
    placeholder: PropTypes.string.isRequired,
};

export default SearchBar;
