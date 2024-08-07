/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import GuildListItem from "./GuildListItem";
import { Link } from "react-router-dom";

const GuildList = ({ guilds }) => {
	if (!guilds || guilds.length < 0) {
		return (
			<h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl">
				Todavía no hay hermandades creadas, crea una <Link to="/guilds/create" className="text-blue-400 hover:underline">aquí</Link>
			</h1>
		);
	}
	return (
		<>
			<h1 className="text-center text-gradient text-3xl sm:text-5xl tracking-wider font-lifeCraft mb-6">
				Hermandades
			</h1>
			<ul className="flex flex-wrap justify-center gap-4">
				{guilds[0]?.map((guild) => {
					return (
						<li key={guild.id} className="flex-grow-0 flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2">
							<GuildListItem guild={guild} />
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default GuildList;
