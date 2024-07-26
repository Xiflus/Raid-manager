import React from "react";
import PropTypes from "prop-types";

const FileInput = React.forwardRef(({ id, label }, ref) => (
    <div className="relative">
        <label htmlFor={id} className="text-white block mb-1">
            {label}
        </label>
        <input
            type="file"
            id={id}
            ref={ref}
            className="w-full text-white border border-orange-500 rounded-lg"
        />
    </div>
));

FileInput.displayName = "FileInput";

FileInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default FileInput;
