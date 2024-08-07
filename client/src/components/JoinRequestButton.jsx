import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast.jsx";
import Button from "./jsxComponents/Button";
import { joinGuildService } from "../../services/guildService";

const JoinRequestButton = ({ guildId, characterName }) => {
    const navigate = useNavigate(); // Hook para navegar a otra página

    const handleClick = async () => {
        try {
            await joinGuildService(guildId, characterName);
            showToast(
                "Solicitud a hermandad enviada correctamente. Recibirás un email con la confirmación pronto.",
                "success"
            );
            navigate("/"); // Navega a otra página después de enviar la solicitud
        } catch (err) {
            showToast("Error al solicitar unión.", "error");
        }
    };

    return <Button text="Solicitar unión a hermandad" onClick={handleClick} />;
};

JoinRequestButton.propTypes = {
    guildId: PropTypes.string.isRequired,
    characterName: PropTypes.string.isRequired,
};

export default JoinRequestButton;
