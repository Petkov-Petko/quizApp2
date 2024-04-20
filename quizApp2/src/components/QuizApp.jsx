import { data } from "../data/data.js";
import { DSA } from "../data/DSA.js";
import { js } from "../data/jsData.js";

import { useState, useRef, useEffect } from "react";
import Title from "./Title";

function QuizApp() {
  const [currentData, setData] = useState(data);
  const randomNumb = Math.floor(Math.random() * currentData.length);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(currentData[randomNumb]);
  const [answered, setAnswered] = useState(false);
  const ulRef = useRef(null);
  const [counter, setCounter] = useState({
    correct: 0,
    count: 1,
  });
  const [category, setCategory] = useState("Choose category");

  function correctAnswer() {
    setCounter({ ...counter, correct: counter.correct + 1 });
  }
  function incrementCounter() {
    setCounter({ ...counter, count: counter.count + 1 });
  }

  function handleAnswer(event, option) {
    if (!answered) {
      if (option === question.answer) {
        event.target.classList.add("right-answer");
        correctAnswer();
      } else {
        event.target.classList.add("wrong-answer");
        const correctOption = document.querySelector(
          `li:nth-child(${question.answer})`
        );
        correctOption.classList.add("right-answer");
      }
      setAnswered(true);
    }
  }

  function changeIndex() {
    if (counter.count === 9) {
      const btn = document.querySelector("button");
      btn.textContent = "See Results";
    }
    incrementCounter();
    const randomIndex = Math.floor(Math.random() * currentData.length);
    setIndex(randomIndex);
    setQuestion(currentData[randomIndex]);
    setAnswered(false);
    const lis = ulRef.current.querySelectorAll("li");
    lis.forEach((li) => {
      li.style.backgroundColor = "";
      li.classList.remove("right-answer", "wrong-answer");
    });
  }

  function handleCategory(event) {
    const category = event.target.textContent;
    let newData;
    if (category === "WEB") {
      newData = data;
    } else if (category === "DSA") {
      newData = DSA;
    }else if (category === "JavaScript") {
      newData = js;
    }
    setData(newData);
    setCategory(category);
    setCounter({ count: 1, correct: 0 });
    const randomIndex = Math.floor(Math.random() * newData.length);
    setIndex(randomIndex);
    setQuestion(newData[randomIndex]);
  }

  return (
    <div className="quizContainer">
      <Title category={category} />
      <ol>
        <a onClick={handleCategory}>JavaScript</a>
        <a onClick={handleCategory}>DSA</a>
        <a onClick={handleCategory}>WEB</a>
      </ol>
      {counter.count === 11 ? (
        <>
          <h2>You answered {counter.correct} questions correctly.</h2>
          <button onClick={() => window.location.reload()}>Restart</button>
        </>
      ) : (
        <>
          <h3>{question.question}</h3>
          <ul ref={ulRef}>
            <li onClick={(event) => handleAnswer(event, 1)}>
              {question.option1}
            </li>
            <li onClick={(event) => handleAnswer(event, 2)}>
              {question.option2}
            </li>
            <li onClick={(event) => handleAnswer(event, 3)}>
              {question.option3}
            </li>
            <li onClick={(event) => handleAnswer(event, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={changeIndex}>Next</button>
          <div className="index"><p>Questions have only one correct answer!</p>{counter.count} of 10 questions</div>
        </>
      )}
    </div>
  );
}

export default QuizApp;
