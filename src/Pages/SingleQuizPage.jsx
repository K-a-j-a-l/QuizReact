// QuizPage.js

import React, { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  // Add more questions here
];

const SingleQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption("");
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
    if (showScore) {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setSelectedOption("");
    }
  };

  return (
    <div className="container mb-5">
      <h2 className="quiz-title text-center mb-5">Let's Play the Quiz</h2>
      <div className="quiz-container">
        {showScore ? (
          <div className="score-section">
            <p>
              You scored {score} out of {questions.length}
            </p>
            <button className="next-btn" onClick={handleNextQuestion}>
              Play Again
            </button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].id}.{" "}
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="option-section">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${
                    selectedOption === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="next-btn" onClick={handleNextQuestion}>
              {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SingleQuizPage;
