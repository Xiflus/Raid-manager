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
import GuildJoinReqList from "../components/GuildJoinReqList.jsx";

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
		return (
			<div className="flex items-center justify-center min-h-screen bg-black p-4">
				<p className="text-white text-lg">Todavía no has seleccionado ningún personaje, selecciona uno para ver la información de la hermandad.</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-black p-4">
				<h1 className="text-white text-lg">Cargando...</h1>
			</div>
		);
	}

	const characterGuildId = selectedCharacter[0]?.guild_id;
	const characterRole = selectedCharacter[0]?.role;
	const characterName = selectedCharacter[0]?.character_name;

	return (
		<div className="bg-black min-h-screen flex flex-col items-center p-4 pb-10">
			{guild && (
				<>
					<div className="w-full max-w-4xl  bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
						<h1 className="flex items-center justify-center text-3xl font-bold  text-white mb-4">{guild.name}</h1>
						<div className="flex items-center justify-center mb-4">
							<img
								src={guild.avatar ? `${VITE_API_URL}/${guild.avatar}` : "/default-guild.png"}
								alt={guild.name}
								className="size-48 rounded-full mt-1 shadow-orange-semi-transparent"
							/>
						</div>
						<p className="flex items-center justify-center text-white text-lg mb-4">
							<strong>Miembros:</strong> {guild.members}
						</p>
						<textarea
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg resize-none"
							readOnly
							rows="4"
							value={guild.description}
						/>
						{!characterGuildId && (
							<div className="mb-4">
								<JoinRequestButton guildId={guildId} characterName={characterName} />
							</div>
						)}
						{characterGuildId === guild.id && (
							<>
								<div className="mb-4">
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
								<Link
									to={`/guilds/${guild.id}/posts/create`}
									className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors mb-4 block text-center"
								>
									Nuevo post
								</Link>
								{characterRole === "staff" && (
									<>
										<Link
											to={`/guilds/${guild.id}/edit`}
											className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors mb-4 block text-center"
										>
											Editar Hermandad
										</Link>
										<div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
											<GuildJoinReqList guildId={guildId} />
										</div>
									</>
								)}
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};
export default GuildPage;
