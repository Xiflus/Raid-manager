import { useRef } from "react";
import toast from "react-hot-toast";
import { createGuildService } from "../../services/guildService.js";
import { Link } from "react-router-dom";
import TextInput from "../components/TextInput.jsx";
import TextArea from "../components/TextArea.jsx";
import FileInput from "../components/FileInput.jsx";
import Button from "../components/Button.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";

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
        <PageContainer>
            <FormContainer>
                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    Creación de Hermandad
                </h2>
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
                    <Button
                        type="submit"
                        onClick={() => console.log("Button clicked")}
                        onSubmit={() => console.log("Form submitted")}
                    >
                        Crear Hermandad
                    </Button>
                </form>
                <div className="text-center mt-6">
                    <h4 className="text-white">
                        Si todavía no tienes un personaje. Puedes hacerlo{" "}
                        <Link
                            to="/characters/create"
                            className="text-orange-500 hover:underline"
                        >
                            aquí
                        </Link>
                        .
                    </h4>
                </div>
            </FormContainer>
        </PageContainer>
    );
};

export default CreateGuildPage;
