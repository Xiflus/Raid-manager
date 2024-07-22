import useGuilds from "../hooks/useGuilds";
import GuildList from "../components/GuildList";
import Pagination from "../components/Pagination";

const HomePage = () => {
	const { guilds, prevPage, nextPage, currentPage, totalPages, totalGuilds, goToPage } = useGuilds();

	return (
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
