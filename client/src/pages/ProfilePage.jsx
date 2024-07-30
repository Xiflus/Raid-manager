import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { editGuildService } from "../../services/guildService.js";
import TextInput from "../components/jsxComponents/TextInput.jsx";
import FileInput from "../components/jsxComponents/FileInput.jsx";
import Button from "../components/jsxComponents/Button.jsx";
import PageContainer from "../components/PageContainer.jsx";
import FormContainer from "../components/FormContainer.jsx";

const ProfilePage = () => {
    const usernameRef = useRef();
    const avatarRef = useRef();
    const { userId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        let avatar = avatarRef.current.files[0];
        avatar = avatar ? avatar : null;

        const formData = new FormData();
        formData.append("username", username);
        if (avatar) formData.append("avatar", avatar);

        try {
            await editGuildService({ userId, formData });
            toast.success("Perfil modificado correctamente");
            usernameRef.current.value = "";
            avatarRef.current.value = "";
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChangePasswordClick = () => {
        navigate("/change/password");
    };

    return (
        <PageContainer>
            <FormContainer>
                {/* Falta crear componentes h1-h2-h3 modularizados */}
                <h2 className="text-white text-2xl font-bold mb-6 text-center">
                    Mi Perfil
                </h2>
                {/* Modularizar también los formularios */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <TextInput
                        id="username"
                        label="Tu nombre:"
                        placeholder="Tu nombre"
                        ref={usernameRef}
                        required
                    />
                    {/* <TextInput id="battletag" label="Tu BatteTag:" placeholder="Tu BattleTag" ref={usernameRef} required /> */}
                    <FileInput id="avatar" label="Avatar:" ref={avatarRef} />
                    <Button type="submit" text="Modificar Perfil" />
                </form>
                <div>
                <Button type="submit" text="Cambiar contraseña" onClick={handleChangePasswordClick}/>
                </div>
                
            </FormContainer>
        </PageContainer>
    );
};

export default ProfilePage;
