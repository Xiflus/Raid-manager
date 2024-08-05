import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Button from "./jsxComponents/Button";
import { joinGuildService } from "../../services/guildService";



const JoinRequestButton = ({guildId,characterName}) => {
  

  const handleClick = async () => {
    try {
        await joinGuildService(guildId,characterName);
        toast.success("Solicitud a hermandad enviada correctamente. Recibirás un email con la confirmación pronto.")
    } catch (err) {
        toast.error("Error al solicitar unión.")
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
