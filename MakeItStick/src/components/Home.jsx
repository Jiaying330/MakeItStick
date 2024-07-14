import React, { useState, useEffect } from "react";
import "./Home.scss";
import problems from "../../public/problems.txt";
import network_problems from "../../public/network_problems.txt";
import html_problems from "../../public/html_problems.txt";
import css_problems from "../../public/css_problems.txt";
import Card from "./Card";
import SelectButton from "./SelectButton";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [network, setNetwork] = useState(false);
  const [html, setHTML] = useState(false);
  const [css, setCSS] = useState(false);
  // const [network_questions, setNetworkQuestions] = useState([]);
  // const [html_questions, setHTMLQuestions] = useState([]);
  // const [css_questions, setCSSQuestions] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // fetchProblems(problems, setQuestions);
    if (network) {
      fetchProblems(network_problems, setQuestions);
    } else if (html) {
      fetchProblems(html_problems, setQuestions);
    } else if (css) {
      fetchProblems(css_problems, setQuestions);
    }
  }, [network, html, css]);

  function nextQuestionOnClick() {
    if (count < questions.length) {
      setCurrIndex((prev) => prev + 1);
      setCount((prev) => prev + 1);
      //   questions.shift();
    }
    // const nextIndex = Math.floor(Math.random() * (questions.length - 1));
  }

  function selectOnClick(event) {
    const id = event.target.id;
    if (id == "network") {
      // const nextVal = !network;
      // console.log(nextVal);
      setNetwork(true);
      setCSS(false);
      setHTML(false);
    } else if (id == "css") {
      // const nextVal = !network;
      // console.log(nextVal);
      setCSS(true);
      setNetwork(false);
      setHTML(false);
    } else {
      // const nextVal = !network;
      // console.log(nextVal);
      setHTML(true);
      setCSS(false);
      setNetwork(false);
    }
  }

  return (
    <>
      <main className="main">
        <div className="main__select-buttons">
          <SelectButton
            name="Network"
            active={network}
            onClick={selectOnClick}
          />
          <SelectButton name="HTML" active={html} onClick={selectOnClick} />
          <SelectButton name="CSS" active={css} onClick={selectOnClick} />
        </div>
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

function fetchProblems(path, setFunction) {
  fetch(path)
    .then((res) => res.text())
    .then((res) => {
      const q = res.split("\n");
      // setCSSQuestions(q);
      // console.log("in function, q = ", q);
      setFunction(q);
    });
}
