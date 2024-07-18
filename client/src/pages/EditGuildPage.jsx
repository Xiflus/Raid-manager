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
        <main className="">
            <h2>Modificación de hermandad</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="guildname">Nombre de la hermandad:</label>
                <input type="text" id="guildname" ref={guildnameRef} required />

                <label htmlFor="description">Descripción:</label>
                <textarea
                    type="textarea"
                    id="description"
                    ref={descriptionRef}
                />

                <label htmlFor="avatar">Avatar:</label>
                <input type="file" id="avatar" ref={avatarRef} />
                <div>
                    <button type="submit">Crear Hermandad</button>
                </div>
            </form>
        </main>
    );
};

export default EditGuildPage;
