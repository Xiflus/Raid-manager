import Heading from "./Heading";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CreateGuildMessage = ({ link }) => {
    return (
        <div className="text-center mt-6">
            <Heading level={4} className="text-white">
                Si todavía no tienes un personaje. Puedes hacerlo{" "}
                <Link to={link} className="text-orange-500 hover:underline">
                    aquí
                </Link>
                .
            </Heading>
        </div>
    );
};

CreateGuildMessage.propTypes = {
    link: PropTypes.string.isRequired,
};

export default CreateGuildMessage;
