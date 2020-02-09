import React from "react";
import "./select.style.scss";

const SelectInput = props => {
  const { label, options, value, onChange, name, isRequired } = props;
  return (
    <div className="DivSelectInput">
      <label className="SelectInputLabel" htmlFor={label}>
        {" "}
        {label.toUpperCase()}
      </label>
      <select
        required={isRequired === true}
        id={label}
        className="SelectInput"
        onChange={onChange}
        value={value}
        name={name}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
