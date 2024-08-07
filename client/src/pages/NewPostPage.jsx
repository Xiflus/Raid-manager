import { useRef, useContext } from "react";
import { showToast } from "../utils/toast.jsx";
import { createPostServices } from "../../services/postServices";
import { CharacterContext } from "../context/CharacterContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
	const { authUser } = useContext(AuthContext);
	!authUser && window.location.replace("/login");
	const { selectedCharacter } = useContext(CharacterContext);
	const titleRef = useRef();
	const contentRef = useRef();
	const photosRef = useRef();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = titleRef.current.value;
		const content = contentRef.current.value;
		const photos = photosRef.current.files;
		const guildId = window.location.pathname.split("/")[2];
		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		for (let i = 0; i < photos.length; i++) {
			formData.append("photos", photos[i]);
		}
		try {
			formData.append("characterId", selectedCharacter[0].id);
			await createPostServices({ guildId, formData });
			titleRef.current.value = "";
			contentRef.current.value = "";
			photosRef.current.value = "";
			showToast("¡Post creado, vuelve a la hermandad para verlo!", "success");
			//volvemos a la página de perfil
			navigate(`/guilds/${guildId}`);
		} catch (err) {
			showToast(err.message, "error");
		}
	};
	return (
		<div className="bg-black flex flex-col items-center justify-center min-h-screen p-4">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg xl:max-w-xl">
				<h2 className="text-white text-2xl font-bold mb-6 text-center">Crear Nuevo Post</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<label htmlFor="title" className="text-white block mb-1">
							Título:
						</label>
						<input
							type="text"
							id="title"
							ref={titleRef}
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
							placeholder="Título del post"
							required
						/>
					</div>
					<div className="relative">
						<label htmlFor="content" className="text-white block mb-1">
							Contenido:
						</label>
						<textarea
							id="content"
							ref={contentRef}
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
							placeholder="Contenido del post"
							rows="6"
							required
						/>
					</div>
					<div className="relative">
						<label htmlFor="photo" className="text-white block mb-1">
							Foto:
						</label>
						<input type="file" id="photo" ref={photosRef} className="w-full text-white border border-orange-500 rounded-lg" multiple />
					</div>
					<div>
						<button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
							Crear Post
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewPostPage;
