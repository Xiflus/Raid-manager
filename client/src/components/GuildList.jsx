/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import GuildListItem from "./GuildListItem";
import { Link } from "react-router-dom";

const GuildList = ({ guilds }) => {
	console.log("HERMANDADES", guilds);
	if (!guilds || guilds.length < 0) {
		return (
			<h1>
				Todavía no hay hermandades creadas, crea una <Link to="/guild/create">aquí</Link>
			</h1>
		);
	}
	return (
		<>
			<h1>Guild List</h1>
			<ul>
				{guilds[0].map((guild) => {
					return <GuildListItem guild={guild} key={guild.id} />;
				})}
			</ul>
		</>
	);
};

export default GuildList;
