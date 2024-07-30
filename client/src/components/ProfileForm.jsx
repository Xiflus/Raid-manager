import { useRef } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types"; // Importar PropTypes
import TextInput from "../components/jsxComponents/TextInput.jsx";
import FileInput from "../components/jsxComponents/FileInput.jsx";
import Button from "../components/jsxComponents/Button.jsx";
import FormContainer from "./FormContainer.jsx";
import PageContainer from "./PageContainer.jsx";
import { updateUserService, updateAvatarService } from "../../services/userService.js";

const ProfileForm = () => {
    const usernameRef = useRef();
    const avatarRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        let avatar = avatarRef.current.files[0];
        /* avatar = avatar ? avatar : null; */
        const formData = new FormData();
        formData.append("username", username);
        if (avatar) formData.append("avatar", avatar);
        try {
          if (username) {
            await updateUserService(username);
            usernameRef.current.value = "";
            toast.success("Usuario actualizado correctamente");
          }
          if (avatar) {
            await updateAvatarService(avatar);
            avatarRef.current.value = "";
            toast.success("Avatar actualizado correctamente");
          }
        } catch (err) {
          toast.error(err.message);
        }
      };
  return (
    <>
      <PageContainer>
        <FormContainer>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              id="username"
              label="Tu nombre:"
              placeholder="Tu nombre"
              ref={usernameRef}
              required
            />
            <FileInput id="avatar" label="Avatar:" ref={avatarRef} />
            <Button type="submit" text="Modificar Perfil" />
          </form>
        </FormContainer>
      </PageContainer>
    </>
  );
};
ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  avatarRef: PropTypes.string,
  usernameRef: PropTypes.string,
};

export default ProfileForm;