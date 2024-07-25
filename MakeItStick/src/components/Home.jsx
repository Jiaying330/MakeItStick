import React, { useState, useEffect } from "react";
import "./Home.scss";
import Card from "./Card";
import SelectButton from "./SelectButton";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { problems } from "../problems/problems";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState(problems);
  const [network, setNetwork] = useState(false);
  const [html, setHTML] = useState(false);
  const [css, setCSS] = useState(false);
  const [javascript, setJavascript] = useState(false);
  const [random, setRandom] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [savedQuestions, setSavedQuestions] = useLocalStorage(
    "savedQuestions",
    []
  );
  useEffect(() => {
    reset();
    setQuestions([]);
    if (network) {
      setProblems(setQuestions, "network", random, allQuestions);
    }
    if (html) {
      setProblems(setQuestions, "html", random, allQuestions);
    }
    if (css) {
      setProblems(setQuestions, "css", random, allQuestions);
    }
    if (javascript) {
      setProblems(setQuestions, "javascript", random, allQuestions);
    }
  }, [network, html, css, javascript, random]);

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
    } else if (id == "javascript") {
      setJavascript((prev) => !prev);
    } else if (id == "random") {
      setRandom((prev) => !prev);
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
          <SelectButton
            name="JavaScript"
            active={javascript}
            onClick={selectOnClick}
          />
          <SelectButton name="Random" active={random} onClick={selectOnClick} />
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

function setProblems(setFunction, type, random, allQuestions) {
  let questions = allQuestions.filter((q) => q.type == type);
  questions = questions.map((q) => q.problem);
  setFunction((prev) => {
    return random
      ? shuffleArray([...prev, ...questions])
      : [...prev, ...questions];
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
