import React from "react";
import "./Card.scss";

export default function Card({ question, checkSaved, checkOnClick }) {
  const { id, problem } = question;
  return (
    <>
      <div className="card">
        {problem}
        <button className="card__save-button" onClick={() => checkOnClick(id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
            fill={checkSaved(id) ? "#FFB200" : "none"}
          >
            <path
              d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
              stroke="#EB5B00"
              strokeLinejoin="round"
              strokeWidth="10"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
