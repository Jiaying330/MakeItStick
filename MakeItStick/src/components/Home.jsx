import React, { useState, useEffect } from "react";
import "./Home.scss";
import problems from "../assets/problems.txt";
import Card from "./Card";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // console.log(problems);
    fetch(problems)
      .then((res) => res.text())
      .then((res) => {
        const q = res.split("\n");
        console.log(q);
        setQuestions(q);
      });
  }, []);
  function nextQuestionOnClick() {
    if (count < questions.length) {
      setCurrIndex((prev) => prev + 1);
      setCount((prev) => prev + 1);
      //   questions.shift();
    }
    // const nextIndex = Math.floor(Math.random() * (questions.length - 1));
  }
  return (
    <>
      <main className="main">
        <div className="main__count">Problems Solved: {count}</div>
        <Card question={questions[currIndex]} />
        <button className="main__button" onClick={nextQuestionOnClick}>
          Next Question
        </button>
      </main>
    </>
  );
}
