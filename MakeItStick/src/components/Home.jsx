import React, { useState, useEffect } from "react";
import "./Home.scss";
import Card from "./Card";
import SelectButton from "./SelectButton";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { problems } from "../problems/problems";

export default function Home() {
  const [questions, setQuestions] = useLocalStorage("questions", []);
  const [allQuestions, setAllQuestions] = useState(problems);
  const [network, setNetwork] = useLocalStorage("network", false);
  const [html, setHTML] = useLocalStorage("html", false);
  const [css, setCSS] = useLocalStorage("css", false);
  const [javascript, setJavascript] = useLocalStorage("javascript", false);
  const [random, setRandom] = useLocalStorage("random", false);
  const [review, setReview] = useLocalStorage("review", false);
  const [currIndex, setCurrIndex] = useLocalStorage("currIndex", 0);
  const [savedQuestions, setSavedQuestions] = useLocalStorage(
    "savedQuestions",
    []
  );
  useEffect(() => {
    if (questions.length) return;
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
    if (review) {
      const reviewQuestions = allQuestions.filter((q) =>
        savedQuestions.includes(q.id)
      );
      setQuestions((prev) => {
        return random
          ? shuffleArray([...prev, ...reviewQuestions])
          : [...prev, ...reviewQuestions];
      });
    }
  }, [network, html, css, javascript, random, review]);

  function prevQuestionOnClick() {
    if (currIndex > 0) {
      setCurrIndex((prev) => prev - 1);
    }
  }

  function nextQuestionOnClick() {
    if (currIndex < questions.length - 1) {
      setCurrIndex((prev) => prev + 1);
    }
  }

  function reset() {
    setCurrIndex(0);
    setQuestions([]);
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
    } else if (id == "review") {
      setReview((prev) => !prev);
    } else if (id == "random") {
      setRandom((prev) => !prev);
    }
  }

  function checkSaved(id) {
    for (let saved of savedQuestions) {
      if (saved == id) return true;
    }
    return false;
  }

  function saveQuestionOnClick(id) {
    if (!checkSaved(id)) {
      setSavedQuestions((prev) => [...prev, id]);
    } else {
      setSavedQuestions((prev) => prev.filter((curr) => curr != id));
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
          <SelectButton name="Review" active={review} onClick={selectOnClick} />
          <SelectButton name="Random" active={random} onClick={selectOnClick} />
        </div>
        <div className="main__count">
          Problem: {currIndex + 1} / {questions.length}
        </div>
        {questions.length > 0 && currIndex < questions.length && (
          <Card
            question={questions[currIndex]}
            checkSaved={checkSaved}
            checkOnClick={saveQuestionOnClick}
          />
        )}
        <div className="main__control-buttons">
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
        </div>
      </main>
    </>
  );
}

function setProblems(setFunction, type, random, allQuestions) {
  let questions = allQuestions.filter((q) => q.type == type);
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
