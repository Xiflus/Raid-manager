import PropTypes from "prop-types";

const FormContainer = ({ children }) => {
    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg xl:max-w-xl">
            {children}
        </div>
    );
};

FormContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FormContainer;
