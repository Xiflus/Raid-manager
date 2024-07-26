import { useRef } from "react";
import toast from "react-hot-toast";
import { createCharacterService } from "../../services/characterService.js";
import TextInput from "../components/TextInput.jsx";
import SelectInput from "../components/SelectInput.jsx";
import FileInput from "../components/FileInput.jsx";
import Button from "../components/Button.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";

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

    const classOptions = [
        { value: "Hunter", label: "Guerrero" },
        { value: "Wizard", label: "Paladín" },
        { value: "Warlock", label: "Cazador" },
        { value: "Rogue", label: "Pícaro" },
        { value: "Priest", label: "Sacerdote" },
        { value: "Shaman", label: "Chamán" },
        { value: "Mage", label: "Mago" },
        { value: "Warlock", label: "Brujo" },
        { value: "Monk", label: "Monje" },
        { value: "Druid", label: "Druida" },
        { value: "DemonHunter", label: "Cazador de demonios" },
        { value: "DeathKnight", label: "Caballero de la muerte" },
        { value: "Evoker", label: "Evocador" },
    ];

    return (
        <PageContainer>
            <FormContainer>
                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    Creación de Personaje
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        id="name"
                        label="Nombre del personaje:"
                        placeholder="Nombre del personaje"
                        ref={nameRef}
                        required
                    />
                    <SelectInput
                        id="class"
                        label="Selecciona una clase:"
                        options={classOptions}
                        ref={characterClassRef}
                        required
                    />
                    <FileInput id="avatar" label="Avatar:" ref={avatarRef} />
                    <Button type="submit">Crear Personaje</Button>
                </form>
            </FormContainer>
        </PageContainer>
    );
};

export default CreateCharacterPage;
