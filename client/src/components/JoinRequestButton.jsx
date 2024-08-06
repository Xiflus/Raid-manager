import PropTypes from "prop-types";
import { showToast } from "../utils/toast.jsx";
import Button from "./jsxComponents/Button";
import { joinGuildService } from "../../services/guildService";



const JoinRequestButton = ({guildId,characterName}) => {
  

  const handleClick = async () => {
    try {
        await joinGuildService(guildId,characterName);
        showToast("Solicitud a hermandad enviada correctamente. Recibirás un email con la confirmación pronto.", "success")
    } catch (err) {
        showToast("Error al solicitar unión.", "error")
    }
    
      };


  return (
      <Button text="Solicitar unión a hermandad" onClick={handleClick} />
    
  );
};

JoinRequestButton.propTypes = {
    guildId: PropTypes.string.isRequired,
    characterName: PropTypes.string.isRequired, // Especifica que guildId es una cadena y es requerido
  };

export default JoinRequestButton;
