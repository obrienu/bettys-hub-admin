import React from "react";
import "./custom.textarea.style.scss";

const CustonInput = ({
  onChange,
  label,
  value,
  name,
  placeholder,
  isRequired
}) => {
  return (
    <div className="CustomTextArea">
      {label ? (
        <label className="CustomTextAreaLabel" htmlFor={name}>
          {name.toUpperCase()}
        </label>
      ) : null}

      <textarea
        row="6"
        required={isRequired === true}
        className="CustomTextAreaInput"
        id={name}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustonInput;
