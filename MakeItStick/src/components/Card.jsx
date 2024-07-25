import React from "react";
import "./Card.scss";

export default function Card({ question, checkSaved, checkOnClick }) {
  const { id, problem } = question;
  return (
    <>
      <div className="card">
        {problem}
        <input
          id={id}
          type="checkbox"
          className="card__input"
          checked={checkSaved(id)}
          onChange={checkOnClick}
        />
      </div>
    </>
  );
}
