import React, { useState, useEffect } from "react";
import "./Home.scss";
import problems from "../problems/problems.txt";
import network_problems from "../problems/network_problems.txt";
import html_problems from "../problems/html_problems.txt";
import css_problems from "../problems/css_problems.txt";
import js_1_problems from "../problems/js-1_problems.txt";
import js_2_problems from "../problems/js-2_problems.txt";
import Card from "./Card";
import SelectButton from "./SelectButton";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [network, setNetwork] = useState(false);
  const [html, setHTML] = useState(false);
  const [css, setCSS] = useState(false);
  const [js1, setJS1] = useState(false);
  const [js2, setJS2] = useState(false);
  const [random, setRandom] = useState(false);
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
    if (js2) {
      fetchProblems(js_2_problems, setQuestions, random);
    }
  }, [network, html, css, js1, js2, random]);

  function prevQuestionOnClick() {
    if (count > 0) {
      setCurrIndex((prev) => prev - 1);
      setCount((prev) => prev - 1);
    }
  }
  function nextQuestionOnClick() {
    if (count < questions.length) {
      setCurrIndex((prev) => prev + 1);
      setCount((prev) => prev + 1);
    }
  }

  function reset() {
    setCount(0);
    setCurrIndex(0);
  }
  function selectOnClick(event) {
    const id = event.target.id;
    reset();
    if (id == "network") {
      setNetwork((prev) => !prev);
    } else if (id == "css") {
      setCSS((prev) => !prev);
    } else if (id == "html") {
      setHTML((prev) => !prev);
    } else if (id == "javascript-1") {
      setJS1((prev) => !prev);
    } else if (id == "javascript-2") {
      setJS2((prev) => !prev);
    }
  }
  function randomOnClick() {
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
          <SelectButton
            name="JavaScript-2"
            active={js2}
            onClick={selectOnClick}
          />
          <SelectButton name="Random" active={random} onClick={randomOnClick} />
        </div>
        <div className="main__count">
          Problems Solved: {count} / {questions.length}
        </div>
        <Card question={questions[currIndex]} />
        <button
          className="main__button main__button--1"
          onClick={prevQuestionOnClick}
        >
          Previous Question
        </button>
        <button
          className="main__button main__button--2"
          onClick={nextQuestionOnClick}
        >
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
