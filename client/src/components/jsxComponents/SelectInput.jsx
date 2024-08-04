import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const applyGradientToText = (text) => {
    return text.split('').map((char, index) => (
        <span key={index} className="letter" data-letter={char}>
            {char}
        </span>
    ));
};

const SelectInput = React.forwardRef(
    ({ id, label, options, required }, ref) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            if (ref.current) {
                ref.current.value = options[currentIndex].value;
            }
        }, [currentIndex, options, ref]);

        const handlePrevCharacter = () => {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? options.length - 1 : prevIndex - 1
            );
        };

        const handleNextCharacter = () => {
            setCurrentIndex((prevIndex) =>
                prevIndex === options.length - 1 ? 0 : prevIndex + 1
            );
        };

        return (
            <div className="relative">
                <label htmlFor={id} className="text-white block mb-1">
                    {label}
                </label>
                <div className="flex items-center justify-center mb-4">
                    <button
                        type="button"
                        onClick={handlePrevCharacter}
                        className="text-white text-2xl mx-2 bg-orange-600 hover:bg-orange-700 p-2 rounded-full"
                    >
                        {"<"}
                    </button>
                    <div className="text-center">
                        <img
                            src={options[currentIndex].img}
                            alt={options[currentIndex].label}
                            className="w-48 h-48 md:w-80 md:h-80 object-cover mb-2"
                        />
                        <p className="text-gradient text-3xl tracking-wider font-lifeCraft">{options[currentIndex].label}</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleNextCharacter}
                        className="text-white text-2xl mx-2 bg-orange-600 hover:bg-orange-700 p-2 rounded-full"
                    >
                        {">"}
                    </button>
                </div>
                <select
                    id={id}
                    ref={ref}
                    className="hidden"
                    required={required}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

SelectInput.displayName = "SelectInput";

SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired, // Añadir esta línea para la imagen
        })
    ).isRequired,
    required: PropTypes.bool,
};

export default SelectInput;