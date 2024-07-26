import { useRef } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { editGuildService } from "../../services/guildService.js";
import TextInput from "../components/TextInput.jsx";
import Textarea from "../components/Textarea.jsx";
import FileInput from "../components/FileInput.jsx";
import Button from "../components/Button.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";

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
            toast.success("Hermandad modificada correctamente");
            guildnameRef.current.value = "";
            descriptionRef.current.value = "";
            avatarRef.current.value = "";
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <PageContainer>
            <FormContainer>
                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    Modificación de Hermandad
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        id="guildname"
                        label="Nombre de la hermandad:"
                        placeholder="Nombre de la hermandad"
                        ref={guildnameRef}
                        required
                    />
                    <Textarea
                        id="description"
                        label="Descripción:"
                        placeholder="Descripción (opcional)"
                        ref={descriptionRef}
                        rows={4}
                    />
                    <FileInput id="avatar" label="Avatar:" ref={avatarRef} />
                    <Button type="submit">Modificar Hermandad</Button>
                </form>
            </FormContainer>
        </PageContainer>
    );
};

export default EditGuildPage;
