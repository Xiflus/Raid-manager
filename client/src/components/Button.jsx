import PropTypes from "prop-types";

const Button = ({ type = "button", children, onClick, onSubmit }) => (
    <button
        type={type}
        className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
        onClick={onClick}
        onSubmit={onSubmit}
    >
        {children}
    </button>
);

Button.displayName = "Button";

Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    onSubmit: PropTypes.func,
};

export default Button;
