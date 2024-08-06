import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { showToast } from "../utils/toast.jsx";
const { VITE_API_URL } = import.meta.env;
import { getGuildService } from "../../services/guildService";
import usePosts from "../hooks/usePosts.js";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import JoinRequestButton from "../components/JoinRequestButton.jsx";
import { CharacterContext } from "../context/CharacterContext";
import { AuthContext } from "../context/AuthContext";

const GuildPage = () => {
	const { authUser } = useContext(AuthContext);
	!authUser && window.location.replace("/login");
	const { selectedCharacter } = useContext(CharacterContext);
	const { guildId } = useParams();
	const [guild, setGuild] = useState(null);
	const [loading, setLoading] = useState(true);
	const { posts, prevPage, nextPage, currentPage, totalPages, totalPosts, goToPage } = usePosts();

	useEffect(() => {
		// Si no hay personaje seleccionado, no intentar cargar la guild
		if (!selectedCharacter || selectedCharacter.length === 0) {
			setLoading(false);
			return;
		}

		const fetchGuild = async () => {
			try {
				const response = await getGuildService(guildId);
				setGuild(response?.guild[0]);
			} catch (error) {
				showToast("¡Error al cargar la guild!", "error");
			} finally {
				setLoading(false);
			}
		};
		fetchGuild();
	}, [guildId, selectedCharacter]);

	// Si no hay personaje seleccionado, mostrar un mensaje
	if (!selectedCharacter || selectedCharacter.length === 0) {
		return <p>Todavía no has seleccionado ningún personaje, selecciona uno para ver la información de la hermandad.</p>;
	}

	// Mostrar animación de carga si está cargando
	if (loading) {
		return <h1>Cargando...</h1>;
	}

	const characterGuildId = selectedCharacter[0]?.guild_id;
	const characterRole = selectedCharacter[0]?.role;
	const characterName = selectedCharacter[0]?.character_name;

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
				{!characterGuildId && <JoinRequestButton guildId={guildId} characterName={characterName} />}

				{characterGuildId === guild.id && (
					<>
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
						{characterRole === "staff" && (
							<>
								<Link to={`/guilds/${guild.id}/edit`}>Editar Hermandad</Link>
								<div>
									<p>Crear un componente para mostrar las solicitudes de unión a un admin</p>
								</div>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default GuildPage;
