import React from "react";
import "./custom.input.style.scss";

const CustonInput = ({
  onChange,
  value,
  type,
  name,
  placeholder,
  isRequired,
  label
}) => {
  return (
    <div className="CustomInput">
      {type !== "file" ? (
        <label
          className={
            value.length > 0 ? "CustomInputLabel Shrink" : "CustomInputLabel"
          }
          htmlFor={name}
        >
          {label ? label.toUpperCase() : name.toUpperCase()}
        </label>
      ) : null}
      <input
        required={isRequired}
        className="CustomInputInput"
        id={name}
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustonInput;
