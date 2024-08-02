import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

const GuildListItem = ({ guild }) => {
	if (!guild) {
		return <h1>No hay guilds creadas actualmente</h1>;
	}
	console.log("GuildListItem", guild);

	return (
		<>
			<div>
				<img src={guild?.avatar ? `${VITE_API_URL}/${guild?.avatar}` : "/default-guild.png"} alt="" />

				<h1>{guild.name}</h1>
				<p>{guild.description}</p>
				<p>Miembros: {guild.members}</p>
				<Link to={`/guilds/${guild.id}`}>+ Info</Link>
			</div>
		</>
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
