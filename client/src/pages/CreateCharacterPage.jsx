import { useRef } from "react";

import toast from "react-hot-toast";

import { createCharacterService } from "../../services/characterService.js";

const CreateCharacterPage = () => {
	const nameRef = useRef();
	const characterClassRef = useRef();
	const avatarRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const characterClass = characterClassRef.current.value;
		let avatar = avatarRef.current.files[0];
		avatar = avatar ? avatar : null;

		const formData = new FormData();
		formData.append("characterName", name);
		formData.append("characterClass", characterClass);
		if (avatar) formData.append("avatar", avatar);

		try {
			console.log("formData", formData);
			await createCharacterService(formData);
			toast.success("Personaje creado correctamente");
			nameRef.current.value = "";
			characterClassRef.current.value = "";
			avatarRef.current.value = "";
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="bg-black flex flex-col items-center justify-center flex-1 p-4">
			<div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg xl:max-w-xl">
				<h2 className="text-white text-2xl font-bold mb-6 text-center">Creación de Personaje</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="relative">
						<label htmlFor="name" className="text-white block mb-1">
							Nombre del personaje:
						</label>
						<input
							type="text"
							id="name"
							ref={nameRef}
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
							placeholder="Nombre del personaje"
							required
						/>
					</div>
					<div className="relative">
						<label htmlFor="class" className="text-white block mb-1">
							Selecciona una clase:
						</label>
						<select
							ref={characterClassRef}
							id="class"
							className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg focus:outline-none"
							required
						>
							<option value="Hunter">Cazador</option>
							<option value="Wizard">Mago</option>
							<option value="Warlock">Brujo</option>
						</select>
					</div>
					<div className="relative">
						<label htmlFor="avatar" className="text-white block mb-1">
							Avatar:
						</label>
						<input type="file" id="avatar" ref={avatarRef} className="w-full text-white border border-orange-500 rounded-lg" />
					</div>
					<div>
						<button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors">
							Crear Personaje
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateCharacterPage;
