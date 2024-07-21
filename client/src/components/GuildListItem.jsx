import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const GuildListItem = ({ guild }) => {
	if (!guild) {
		return <h1>No guilds found</h1>;
	}
	console.log(guild);

	return (
		<>
			<div>
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
