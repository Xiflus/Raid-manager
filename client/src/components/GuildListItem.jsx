/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

const GuildListItem = ({ guild }) => {
	if (!guild) {
		return <h1>No guilds found</h1>;
	}
	console.log("ITEM HERMANDAD", guild);
	console.log("ITEM HERMANDAD", guild.avatar);
	console.log("NOMBRE", guild.name);
	console.log("DESCRIPCION", guild.description);
	console.log("MIEMBROS", guild.members);

	return (
		<>
			<div>
				<img src={guild.avatar?.name ? `${VITE_API_URL}/${guild.avatar?.name}` : "/default-guild.jpg"} alt="" />

				<h1>{guild.name}</h1>
				<p>{guild.description}</p>
				<p>{guild.members}</p>
				<Link to={`/guild/${guild.id}`}>View</Link>
			</div>
		</>
	);
};
GuildListItem.propTypes = {
	guild: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		members: PropTypes.array.isRequired,
	}).isRequired,
};
export default GuildListItem;
