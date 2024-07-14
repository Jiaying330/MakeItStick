import React from "react";
import "./SelectButton.scss";

export default function ({ name, active, onClick }) {
  return (
    <>
      <button
        className={`select-button ${active ? "active" : ""}`}
        onClick={onClick}
        id={name.toLowerCase()}
      >
        {name}
      </button>
    </>
  );
}
