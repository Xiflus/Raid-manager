import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useGuilds from "../hooks/useGuilds";
import GuildList from "../components/GuildList";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { authUser } = useContext(AuthContext);
  const {
    guilds,
    prevPage,
    nextPage,
    currentPage,
    totalPages,
    totalGuilds,
    goToPage,
  } = useGuilds();

  return !authUser ? (
	<main className="flex flex-col items-center justify-center flex-1 bg-black text-orange-500">
	<img
	  src="raidManager.png" // Reemplaza esto con la URL de tu imagen
	  alt="Profile"
	  className="w-48 h-48 rounded-full mb-6" 
	/>
	<div className="flex space-x-4">
	  <Link to="/login" className="text-orange-500  text-2xl hover:text-orange-700">
		Iniciar sesión
	  </Link>
	  <Link to="/register" className="text-orange-500 text-2xl hover:text-orange-700">
		Registrarse
	  </Link>
	</div>
  </main>
  ) : (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-orange-500">
      <div className="flex flex-col items-center">
        <GuildList guilds={guilds} />
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
