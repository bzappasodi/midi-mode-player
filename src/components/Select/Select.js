import React from "react";

function Select({ label, name, value, options, onChange, defaultOptionText }) {
    return (
        <label>
            {label}:
            <select name={name} value={value} onChange={onChange}>
                <option value="">{defaultOptionText}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

export default Select;
