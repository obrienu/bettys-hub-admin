import React from "react";
import "./paginate.console.style.scss";

const PaginateConsole = ({ onClick, page, active }) => {
  const handleClick = () => {
    onClick(page);
  };

  return (
    <div
      onClick={handleClick}
      className={
        page === active ? "isActive PaginateConsole" : "PaginateConsole"
      }
    >
      {page}
    </div>
  );
};

export default PaginateConsole;
