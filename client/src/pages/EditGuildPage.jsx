import { useRef } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { editGuildService } from "../../services/guildService.js";

const EditGuildPage = () => {
    const guildnameRef = useRef();
    const descriptionRef = useRef();
    const avatarRef = useRef();
    const { guildId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = guildnameRef.current.value;
        let description = descriptionRef.current.value;
        let avatar = avatarRef.current.files[0];
        description = description === "" ? null : description;
        avatar = avatar ? avatar : null;

        const formData = new FormData();
        formData.append("name", name);
        if (description) formData.append("description", description);
        if (avatar) formData.append("avatar", avatar);

        try {
            await editGuildService({ guildId, formData });
            toast.success("Hermandad creada correctamente");
            guildnameRef.current.value = "";
            descriptionRef.current.value = "";
            avatarRef.current.value = "";
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-black flex flex-col items-center justify-center flex-1 p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg xl:max-w-xl">
                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    Modificación de Hermandad
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label
                            htmlFor="guildname"
                            className="text-white block mb-1"
                        >
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
                        <label
                            htmlFor="description"
                            className="text-white block mb-1"
                        >
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
                        <label
                            htmlFor="avatar"
                            className="text-white block mb-1"
                        >
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
                            Modificar Hermandad
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGuildPage;
