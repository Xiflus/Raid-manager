/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const { VITE_API_URL } = import.meta.env;
import { getGuildService } from "../../services/guildService";
import usePosts from "../hooks/usePosts.js";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";

const GuildPage = () => {
	const { posts, prevPage, nextPage, currentPage, totalPages, totalPosts, goToPage } = usePosts();
	const { guildId } = useParams();
	const [guild, setGuild] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGuild = async () => {
			try {
				const response = await getGuildService(guildId);
				setGuild(response.guild[0]);
				setLoading(false);
			} catch (error) {
				console.log("GuildPage", error);
				toast.error("¡Error al cargar la guild!");
			}
		};
		fetchGuild();
	}, [guildId]);

	// Falta animacion de carga
	if (loading) {
		return <h1>Cargando...</h1>;
	}

	return (
		<>
			<div className="">
				<h1>{guild.name}</h1>
			</div>
			<div className="">
				{guild.avatar?.length > 0 ? <img src={`${VITE_API_URL}/${guild?.avatar}`} alt="" /> : <img src="/default-guild.png" alt="" />}
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
				<div>
					<PostList posts={posts} />
					<Pagination
						prevPage={prevPage}
						nextPage={nextPage}
						currentPage={currentPage}
						totalPages={totalPages}
						totalPosts={totalPosts}
						goToPage={goToPage}
					/>
				</div>
				<Link to={`/guilds/${guild.id}/posts/create`}>Nuevo post</Link>
				<Link to={`/guilds/${guild.id}/edit`}> Editar Hermandad </Link>
			</div>
		</>
	);
};

export default GuildPage;
