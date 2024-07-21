import useGuilds from "../hooks/useGuilds";
import GuildList from "../components/GuildList";
import Pagination from "../components/Pagination";

const HomePage = () => {
	const { guilds, prevPage, nextPage, currentPage, totalPages, goToPage } = useGuilds();
	console.log("HomePage GUILDS", guilds);

	return (
		<main>
			<GuildList guilds={guilds} />
			<Pagination prevPage={prevPage} nextPage={nextPage} currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
		</main>
	);
};

export default HomePage;
