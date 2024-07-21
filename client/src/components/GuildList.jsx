import PropTypes from "prop-types";
import GuildListItem from "./GuildListItem";

const GuildList = ({ guilds }) => {
	console.log("GuildList GUILDS", guilds);
	if (guilds.length < 0) {
		return <h1>No guilds found</h1>;
	}
	return (
		<>
			<div>
				<h1>Guild List</h1>
				<ul>
					{guilds.map((guild) => {
						return <GuildListItem guild={guild} key={guild.id} />;
					})}
				</ul>
			</div>
		</>
	);
};
GuildList.propTypes = {
	guilds: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			members: PropTypes.array.isRequired,
		})
	).isRequired,
};

export default GuildList;
