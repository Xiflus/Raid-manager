import React from "react";
import PropTypes from "prop-types";

const SelectInput = React.forwardRef(
    ({ id, label, options, required }, ref) => (
        <div className="relative">
            <label htmlFor={id} className="text-white block mb-1">
                {label}
            </label>
            <select
                id={id}
                ref={ref}
                className="w-full p-3 bg-gray-900 text-white border border-orange-500 rounded-lg focus:outline-none"
                required={required}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
);

SelectInput.displayName = "SelectInput";

SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    required: PropTypes.bool,
};

export default SelectInput;
