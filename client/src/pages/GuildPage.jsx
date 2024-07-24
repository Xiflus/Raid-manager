/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const { VITE_API_URL } = import.meta.env;
import { getGuildService } from "../../services/guildService";

const GuildPage = () => {
	const { guildId } = useParams();
	console.log("GuildPage - ID", guildId);
	const [guild, setGuild] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGuild = async () => {
			try {
				const { guild } = getGuildService(guildId);
				console.log("GuildPage", guild);
				setGuild(guild);
			} catch (error) {
				console.log("GuildPage", error);
				toast.error("¡Error al cargar la guild!");
			} finally {
				setLoading(false);
			}
		};
		fetchGuild();
	}, [guildId]);

	return (
		<>
			<div className="">
				<h1>{guild.name}</h1>
			</div>
			<div className="">
				{guild.avatar?.length > 0 ? <img src={`${VITE_API_URL}/${guild.avatar?.name}`} alt="" /> : <img src="/default-guild.png" alt="" />}
			</div>
			<div className="">
				<p>
					<strong>Miembros: </strong>
					{guild.members}
				</p>
				<p>
					<strong>Descripción: </strong>
					{guild.description}
				</p>
				<Link to={`/guilds/${guild.id}/posts/create`}>Nuevo post</Link>
			</div>
		</>
	);
};

export default GuildPage;
