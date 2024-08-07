import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const { VITE_API_URL } = import.meta.env;

const GuildListItem = ({ guild }) => {
	if (!guild) {
		return <h1>No hay guilds creadas actualmente</h1>;
	}

	return (
		<div className="rounded-lg p-4 m-2 bg-gray-800 text-white flex flex-col items-center shadow-orange-semi-transparent transition-transform duration-300 hover:scale-105">
			<div className="w-full h-32 sm:h-48 flex items-center justify-center">
				<img
					src={guild?.avatar ? `${VITE_API_URL}/${guild?.avatar}` : "/default-guild.png"}
					alt={guild.name}
					className="max-w-full max-h-full object-cover object-center "
				/>
			</div>
			<div className="text-center mt-4">
				<h1 className="text-xl font-semibold mb-2">{guild.name}</h1>
				<p className="mb-2 break-words whitespace-normal overflow-hidden">{guild.description}</p>
				<p className="mb-2">Miembros: {guild.members}</p>
				<Link to={`/guilds/${guild.id}`} className="text-blue-400 hover:underline">+ Info</Link>
			</div>
		</div>
	);
};

GuildListItem.propTypes = {
	guild: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string,
		description: PropTypes.string,
		members: PropTypes.number,
		avatar: PropTypes.string,
	}).isRequired,
};
export default GuildListItem;
