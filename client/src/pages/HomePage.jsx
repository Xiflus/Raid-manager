import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useGuilds from "../hooks/useGuilds";
import GuildList from "../components/GuildList";
import Pagination from "../components/Pagination";

const HomePage = () => {
	const { authUser } = useContext(AuthContext);
	const { guilds, prevPage, nextPage, currentPage, totalPages, totalGuilds, goToPage } = useGuilds();

	return !authUser ? (
		<h1>Debes estar logueado para ver esta página</h1>
	) : (
		<main>
			<GuildList guilds={guilds} />
			<Pagination
				prevPage={prevPage}
				nextPage={nextPage}
				currentPage={currentPage}
				totalPages={totalPages}
				goToPage={goToPage}
				totalGuilds={totalGuilds}
			/>
		</main>
	);
};

export default HomePage;
