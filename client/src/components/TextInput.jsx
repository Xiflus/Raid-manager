import React from "react";
import PropTypes from "prop-types";

const TextInput = React.forwardRef(
    ({ id, label, placeholder, type = "text", required = false }, ref) => (
        <div className="relative">
            <label htmlFor={id} className="text-white block mb-1">
                {label}
            </label>
            <input
                type={type}
                id={id}
                ref={ref}
                className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
                placeholder={placeholder}
                required={required}
            />
        </div>
    )
);

TextInput.displayName = "TextInput";

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
};

export default TextInput;
