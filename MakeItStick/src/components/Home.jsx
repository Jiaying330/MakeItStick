import React, { useState, useEffect } from "react";
import "./Home.scss";
import problems from "../problems/problems.txt";
import network_problems from "../problems/network_problems.txt";
import html_problems from "../problems/html_problems.txt";
import css_problems from "../problems/css_problems.txt";
import js_1_problems from "../problems/js-1_problems.txt";
import Card from "./Card";
import SelectButton from "./SelectButton";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [network, setNetwork] = useState(false);
  const [html, setHTML] = useState(false);
  const [css, setCSS] = useState(false);
  const [js1, setJS1] = useState(false);
  const [random, setRandom] = useState(false);
  const [indices, setIndices] = useState([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    reset();
    setQuestions([]);
    if (network) {
      fetchProblems(network_problems, setQuestions, random);
    }
    if (html) {
      fetchProblems(html_problems, setQuestions, random);
    }
    if (css) {
      fetchProblems(css_problems, setQuestions, random);
    }
    if (js1) {
      fetchProblems(js_1_problems, setQuestions, random);
    }
  }, [network, html, css, js1, random]);

  function nextQuestionOnClick() {
    if (count < questions.length) {
      // let index = random ? Math.floor(Math.random() * (questions.length - 1)) : currIndex;
      setCurrIndex((prev) => prev + 1);
      // setCurrIndex(index);
      setCount((prev) => prev + 1);
    }
    // const nextIndex = Math.floor(Math.random() * (questions.length - 1));
  }

  function reset() {
    setCount(0);
    setCurrIndex(0);
    // setNetwork(false);
    // setCSS(false);
    // setHTML(false);
    // setJS1(false);
  }
  function selectOnClick(event) {
    const id = event.target.id;
    reset();
    if (id == "network") {
      // reset();
      setNetwork((prev) => !prev);
    } else if (id == "css") {
      // reset();
      setCSS((prev) => !prev);
    } else if (id == "html") {
      // reset();
      setHTML((prev) => !prev);
    } else if (id == "javascript-1") {
      // reset();
      setJS1((prev) => !prev);
    }
  }
  function randomOnClick() {
    // const nextValue = !random;
    // if (!nextValue) {

    // } else {

    // }
    setRandom((prev) => !prev);
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
          <SelectButton
            name="JavaScript-1"
            active={js1}
            onClick={selectOnClick}
          />
          <SelectButton name="Random" active={random} onClick={randomOnClick} />
          {/* <button className="main__button main__button-randomize">
            Randomize
          </button> */}
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

function fetchProblems(path, setFunction, random) {
  fetch(path)
    .then((res) => res.text())
    .then((res) => {
      const q = res.split("\n");
      setFunction((prev) => {
        return random ? shuffleArray([...prev, ...q]) : [...prev, ...q];
      });
    });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
