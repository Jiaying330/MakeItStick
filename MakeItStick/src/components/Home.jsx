import React, { useState, useEffect } from "react";
import "./Home.scss";
import problems from "../../public/problems.txt";
import network_problems from "../../public/network_problems.txt";
import html_problems from "../../public/html_problems.txt";
import css_problems from "../../public/css_problems.txt";
import Card from "./Card";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [network_questions, setNetworkQuestions] = useState([]);
  const [html_questions, setHTMLQuestions] = useState([]);
  const [css_questions, setCSSQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(problems)
      .then((res) => res.text())
      .then((res) => {
        const q = res.split("\n");
        setQuestions(q);
      });
    // fetch(network_problems)
    //   .then((res) => res.text())
    //   .then((res) => {
    //     const q = res.split("\n");
    //     setNetworkQuestions(q);
    //   });
    // fetch(html_problems)
    //   .then((res) => res.text())
    //   .then((res) => {
    //     const q = res.split("\n");
    //     setHTMLQuestions(q);
    //   });
    // fetch(css_problems)
    //   .then((res) => res.text())
    //   .then((res) => {
    //     const q = res.split("\n");
    //     setCSSQuestions(q);
    //   });
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
        <div className="main__count">
          Problems Solved: {count} / {questions.length}
        </div>
        <Card question={questions[currIndex]} />
        <button className="main__button" onClick={nextQuestionOnClick}>
          Next Question
        </button>
      </main>
    </>
  );
}

// function fetchProblems(path) {
//   fetch(path)
//   .then((res) => res.text())
//   .then((res) => {
//     const q = res.split("\n");
//     setCSSQuestions(q);
//   });
// }
