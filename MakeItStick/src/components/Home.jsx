import { useState, useEffect } from "react";
import "./Home.scss";
import Card from "./Card";
import SelectButton from "./SelectButton";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { problems } from "../problems/problems";

export default function Home() {
  const [questions, setQuestions] = useLocalStorage("questions", []);
  const [allQuestions] = useState(problems);
  const [currIndex, setCurrIndex] = useLocalStorage("currIndex", 0);
  const [savedQuestions, setSavedQuestions] = useLocalStorage(
    "savedQuestions",
    []
  );
  const [filters, setFilters] = useLocalStorage("filters", {
    network: false,
    html: false,
    css: false,
    javascript: false,
    typescript: false,
    react: false,
    // react_performance: false,
    redux: false,
    behavioral: false,
    random: false,
    review: false,
  });

  useEffect(() => {
    console.log(allQuestions);
    if (questions.length) return;

    const problemTypes = Object.keys(filters).filter(
      (type) => filters[type] && type !== "random" && type !== "review"
    );

    problemTypes.forEach((type) =>
      setProblems(setQuestions, type, filters.random, allQuestions)
    );

    if (filters.review) {
      const reviewQuestions = allQuestions.filter((q) =>
        savedQuestions.includes(q.id)
      );
      setQuestions((prev) =>
        filters.random
          ? shuffleArray([...prev, ...reviewQuestions])
          : [...prev, ...reviewQuestions]
      );
    }
  }, [filters, questions.length]);

  function handlePrevClick() {
    if (currIndex > 0) setCurrIndex(currIndex - 1);
  }

  function handleNextClick() {
    if (currIndex < questions.length - 1) setCurrIndex(currIndex + 1);
  }

  function resetQuestions() {
    setCurrIndex(0);
    setQuestions([]);
  }

  function toggleFilter(type) {
    resetQuestions();
    setFilters((prev) => ({ ...prev, [type]: !prev[type] }));
  }

  function toggleSaveQuestion(id) {
    setSavedQuestions((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  }

  return (
    <main className="main">
      <div className="main__select-buttons">
        {Object.keys(filters).map((type) => (
          <SelectButton
            key={type}
            name={type}
            active={filters[type]}
            onClick={() => toggleFilter(type)}
          />
        ))}
      </div>
      <div className="main__count">
        Problem: {currIndex + 1} / {questions.length}
      </div>
      {questions.length > 0 && currIndex < questions.length && (
        <Card
          question={questions[currIndex]}
          checkSaved={(id) => savedQuestions.includes(id)}
          checkOnClick={toggleSaveQuestion}
        />
      )}
      <div className="main__control-buttons">
        <button
          className="main__button main__button--1"
          onClick={handlePrevClick}
        >
          Previous Question
        </button>
        <button
          className="main__button main__button--2"
          onClick={handleNextClick}
        >
          Next Question
        </button>
      </div>
    </main>
  );
}

function setProblems(setFunction, type, random, allQuestions) {
  const questions = allQuestions.filter((q) => q.type === type);
  setFunction((prev) =>
    random ? shuffleArray([...prev, ...questions]) : [...prev, ...questions]
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
