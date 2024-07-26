import React from "react";
import PropTypes from "prop-types";

const TextArea = React.forwardRef(
    ({ id, label, placeholder, rows = 4 }, ref) => (
        <div className="relative">
            <label htmlFor={id} className="text-white block mb-1">
                {label}
            </label>
            <textarea
                id={id}
                ref={ref}
                className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg placeholder focus:outline-none"
                placeholder={placeholder}
                rows={rows}
            />
        </div>
    )
);

TextArea.displayName = "TextArea";

TextArea.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
};

export default TextArea;
