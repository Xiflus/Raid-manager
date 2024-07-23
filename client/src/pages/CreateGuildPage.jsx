import { useRef } from "react";
import toast from "react-hot-toast";
import { createGuildService } from "../../services/guildService.js";
import { Link } from "react-router-dom";

const CreateGuildPage = () => {
	const guildnameRef = useRef();
	const descriptionRef = useRef();
	const characterRef = useRef();
	const avatarRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = guildnameRef.current.value;
		let description = descriptionRef.current.value;
		const character = characterRef.current.value;
		let avatar = avatarRef.current.files[0];
		description = description === "" ? null : description;
		avatar = avatar ? avatar : null;

		const formData = new FormData();
		formData.append("name", name);
		if (description) formData.append("description", description);
		formData.append("characterName", character);
		if (avatar) formData.append("avatar", avatar);

		try {
			console.log("formData", formData);
			await createGuildService(formData);
			toast.success("Hermandad creada correctamente");
			guildnameRef.current.value = "";
			descriptionRef.current.value = "";
			characterRef.current.value = "";
			avatarRef.current.value = "";
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
<div className="bg-black flex flex-col items-center justify-center flex-1 p-4">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-white text-2xl font-bold mb-6 text-center">
					Creación de Hermandad
				</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<label htmlFor="charactername" className="text-white block mb-1">
							Nombre del personaje, GM:
						</label>
						<input
							type="text"
							id="charactername"
							ref={characterRef}
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
							placeholder="Nombre del personaje"
							required
						/>
					</div>
					<div className="relative">
						<label htmlFor="guildname" className="text-white block mb-1">
							Nombre de la hermandad:
						</label>
						<input
							type="text"
							id="guildname"
							ref={guildnameRef}
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
							placeholder="Nombre de la hermandad"
							required
						/>
					</div>
					<div className="relative">
						<label htmlFor="description" className="text-white block mb-1">
							Descripción:
						</label>
						<textarea
							id="description"
							ref={descriptionRef}
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
							placeholder="Descripción (opcional)"
							rows="4"
						/>
					</div>
					<div className="relative">
						<label htmlFor="avatar" className="text-white block mb-1">
							Avatar:
						</label>
						<input
							type="file"
							id="avatar"
							ref={avatarRef}
							className="w-full text-white border border-orange-500 rounded-lg"
						/>
					</div>
					<div>
						<button
							type="submit"
							className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
						>
							Crear Hermandad
						</button>
					</div>
				</form>
				<div className="text-center mt-6">
					<h4 className="text-white">
						Si todavía no tienes un personaje. Puedes hacerlo{" "}
						<Link to="/characters/create" className="text-orange-500 hover:underline">
							aquí
						</Link>
						.
					</h4>
				</div>
			</div>
		</div>
	);
};

export default CreateGuildPage;
