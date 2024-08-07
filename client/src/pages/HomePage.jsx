import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import useGuilds from "../hooks/useGuilds";
import GuildList from "../components/GuildList";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import SearchBar from "../components/jsxComponents/SearchBar";

const HomePage = () => {
	const { authUser } = useContext(AuthContext);
	const { guilds, prevPage, nextPage, currentPage, totalPages, totalGuilds, goToPage } = useGuilds();
	const [filteredGuilds, setFilteredGuilds] = useState(guilds);

	// Este useEffect actualiza filteredGuilds cuando guilds cambia
	useEffect(() => {
		setFilteredGuilds(guilds);
	}, [guilds]);

	const handleSearch = (searchResults) => {
		setFilteredGuilds(searchResults);
	};

	return !authUser ? (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black">
      <img
        src="raidManager.png"
        alt="Profile"
        className="w-48 h-48 rounded-full mb-6"
      />
      <div className="flex space-x-4">
        <Link to="/login" className="text-orange-500 text-2xl hover:text-orange-700">
          Iniciar sesión
        </Link>
        <Link to="/register" className="text-orange-500 text-2xl hover:text-orange-700">
          Registrarse
        </Link>
      </div>
    </main>
  ) : (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black pb-16"> 
      <SearchBar placeholder="Buscar guilds..." onSearch={handleSearch} />
      <div className="flex flex-col items-center w-full">
        <GuildList guilds={filteredGuilds} />
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          totalGuilds={totalGuilds}
        />
      </div>
    </main>
  );
};

export default HomePage;
