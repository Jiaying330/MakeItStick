import React from "react";
import "./Card.scss";

export default function Card({ question }) {
  return (
    <>
      <div className="Card">{question}</div>
    </>
  );
}
