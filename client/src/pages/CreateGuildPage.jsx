import CreateGuildForm from "../components/forms/CreateGuildForm.jsx";
import CreateGuildContainer from "../components/CreateGuildContainer.jsx";
import CreateGuildMessage from "../components/CreateGuildMessage.jsx";

const CreateGuildPage = () => {
    return (
        <CreateGuildContainer title="Creación de Hermandad">
            <CreateGuildForm />
            <CreateGuildMessage link="/characters/create" />
        </CreateGuildContainer>
    );
};

export default CreateGuildPage;
