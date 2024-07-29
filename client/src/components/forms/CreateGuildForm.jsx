import { useRef } from "react";
import toast from "react-hot-toast";
import { createGuildService } from "../../../services/guildService.js";
import TextInput from "../jsxComponents/TextInput.jsx";
import TextArea from "../jsxComponents/TextArea.jsx";
import FileInput from "../jsxComponents/FileInput.jsx";
import Button from "../jsxComponents/Button.jsx";
import PropTypes from "prop-types";

const CreateGuildForm = ({ onSubmit }) => {
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
            if (onSubmit) onSubmit();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
                id="charactername"
                label="Nombre del personaje, GM:"
                placeholder="Nombre del personaje"
                ref={characterRef}
                required
            />
            <TextInput
                id="guildname"
                label="Nombre de la hermandad:"
                placeholder="Nombre de la hermandad"
                ref={guildnameRef}
                required
            />
            <TextArea
                id="description"
                label="Descripción:"
                placeholder="Descripción (opcional)"
                ref={descriptionRef}
            />
            <FileInput id="avatar" label="Avatar:" ref={avatarRef} />
            <Button type="submit" text="Crear Personaje" />
        </form>
    );
};

CreateGuildForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default CreateGuildForm;
