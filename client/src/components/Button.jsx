import PropTypes from "prop-types";

const Button = ({ type = "button", children }) => (
    <button
        type={type}
        className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
    >
        {children}
    </button>
);

Button.displayName = "Button";

Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Button;
