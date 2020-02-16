import "./icon.style.scss";
import React from "react";

const Icon = props => {
  const handleClick = () => {
    props.onClick(props.style);
  };

  return (
    <div
      title={props.style}
      onClick={handleClick}
      className={props.isActive ? "EditorIcon isActive" : "EditorIcon"}
    >
      {props.label}
    </div>
  );
};

export default Icon;
