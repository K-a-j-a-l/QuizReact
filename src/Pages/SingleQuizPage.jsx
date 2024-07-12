import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slice";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from '../config'; // Adjust the path based on your project structure
import { collection, query, where, getDocs, addDoc, Timestamp, updateDoc, doc } from 'firebase/firestore';


const SingleQuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const { category } = location.state || {};
  const [questionNumber, setQuestionNumber] = useState(1);

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (category) {
        const q = query(
          collection(db, "quizQuestions"),
          where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        const fetchedQuestions = [];
        querySnapshot.forEach((doc) => {
          fetchedQuestions.push({ id: doc.id, ...doc.data() });
        });
        setQuestions(fetchedQuestions);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    let updatedScore = score; // Store the current score
    const inc=100/questions.length;

    // Check if the selected option matches the correct answer
    if (selectedOption === questions[currentQuestion].answer) {
      updatedScore = score + inc; // Increment the score correctly
    }
    // Update score state with the updatedScore
    setScore(updatedScore);

    // Reset selected option and timer for the next question
    setSelectedOption("");
    setTimeLeft(30);

    // Move to the next question or end the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionNumber(questionNumber + 1);
    } else {
      setShowScore(true);
    }
  };
  useEffect(()=>{
    saveScoreToFirestore();
  },[score])

  const saveScoreToFirestore = async () => {
    try {
      // Check if the user already has a score in the collection
      const scoreRef = collection(db, 'quizScores');
      const userQuery = query(scoreRef, where('username', '==', user.displayName));
      const userSnapshot = await getDocs(userQuery);

      let scoreData = {
        username: user.displayName,
        score: score,
        category: category,
        timestamp: Timestamp.now(),
      };

      if (userSnapshot.empty) {
        // No existing score for this user, add new score
        const docRef = await addDoc(scoreRef, scoreData);
        console.log('Score added with ID: ', docRef.id);
      } else {
        // Update score if new score is higher
        const existingScore = userSnapshot.docs[0].data().score;
        if (score > existingScore) {
          const docId = userSnapshot.docs[0].id;
          await updateDoc(doc(scoreRef, docId), scoreData);
          console.log('Score updated for ', user.displayName);
        } else {
          console.log('Score not updated as it is not higher');
        }
      }
    } catch (error) {
      console.error('Error adding/updating score: ', error);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setQuestionNumber(questionNumber - 1);
    }
  };

  return (
    <div className="container mb-5">
      {user ? (
        <div>
          <h2 className="quiz-title text-center mb-5">{category} Quiz</h2>
          <div className="quiz-container">
            {showScore ? (
              <div className="score-section">
                <p>
                  You scored {score} out of {questions.length*100}
                </p>
                <button
                  className="next-btn"
                  onClick={() => window.location.reload()}
                >
                  Play Again
                </button>
              </div>
            ) : (
              <>
                {questions.length > 0 && (
                  <>
                    <div className="question-section">
                      <div className="question-count">
                        <span>Question {questionNumber}</span>/
                        {questions.length}
                      </div>
                      <div className="question-text">
                        {questionNumber}.&nbsp;
                        {questions[currentQuestion]?.question}
                      </div>
                      <div className="timer">
                        <i className="fas fa-clock"></i> {timeLeft}s
                      </div>
                    </div>
                    <div className="option-section">
                      {questions[currentQuestion]?.options.map(
                        (option, index) => (
                          <button
                            key={index}
                            className={`option-btn ${
                              selectedOption === option ? "selected" : ""
                            }`}
                            onClick={() => handleOptionSelect(option)}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                    <div className="">
                      <button
                        className="next-btn me-5"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                      >
                        Previous
                      </button>
                      <button className="next-btn" onClick={handleNextQuestion}>
                        {currentQuestion === questions.length - 1
                          ? "Submit"
                          : "Next"}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="border p-5" style={{ margin: "150px" }}>
          <div className="d-flex justify-content-center align-items-center gap-2 flex-column">
            <h2 className="text-danger">To Attempt you must SignUp first!!!</h2>
            <button
              type="button"
              style={{ width: "100px" }}
              className="btn btn-outline-dark rounded-pill create-btn"
              onClick={() => navigate("/login")}
            >
              SignUp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleQuizPage;
