import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { getBadgeColor } from "../Pages/QuizPage";
import { db } from "../config"; // Import your Firebase configuration
import { collection, query, getDocs, where } from "firebase/firestore";
import Loader from "./Loader";

function QuizCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const fetchCategories = async () => {
      const q = query(collection(db, "quizCategories"));
      try {
        const querySnapshot = await getDocs(q);
        const fetchedCategories = [];
        for (const doc of querySnapshot.docs) {
          const categoryData = doc.data();
          // Fetch number of questions for each category
          const questionsQuery = query(
            collection(db, "quizQuestions"),
            where("category", "==", categoryData.name)
          );
          const questionsSnapshot = await getDocs(questionsQuery);
          const questionsCount = questionsSnapshot.size;

          fetchedCategories.push({
            id: doc.id,
            ...categoryData,
            questions: questionsCount,
            plays: Math.floor(Math.random() * 10000), // Random plays (0-9999)
            difficulty: getRandomDifficulty(),
          });
        }
        setCategories(fetchedCategories);
        setLoading(false);
        // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
    fetchCategories();
  }, []);

  // Function to get random difficulty
  const getRandomDifficulty = () => {
    const difficulties = ["beginner", "intermediate", "advanced"];
    const randomIndex = Math.floor(Math.random() * difficulties.length);
    return difficulties[randomIndex];
  };

  // Loader component

  return (
    <div className="quiz-categories-container py-2">
      <h2 className="section-title">Quiz Categories</h2>
      {loading ? (
        <Loader /> // Display loader if loading is true
      ) : (
        <div className="container">
          <div className="row">
            {categories.slice(0, 3).map((category, index) => (
              <div className="col-md-4 col-sm-12" key={index}>
                <div className="quiz-category-card mb-5">
                  <img
                    src={category.thumbnail}
                    alt="Category Image"
                    className="d-flex justify-content-center"
                  />
                  <div className="d-flex justify-content-between mx-4">
                    <p className="absolute bg-white p-1 rounded">
                      Q: {category.questions}
                    </p>
                    <p className="absolute bg-white p-1 rounded">
                      Plays:{" "}
                      {category.plays >= 1000
                        ? (category.plays / 1000).toFixed(0) + "K"
                        : category.plays}
                    </p>
                  </div>
                  <div>
                    <h6 className="mx-4 pb-1">{category.name}</h6>
                    <div
                      className={`badge mx-4 mb-2 ${getBadgeColor(
                        category.difficulty
                      )}`}
                    >
                      {category.difficulty}
                    </div>
                    <p
                      className="quiz-desc text-dark mx-4 mb-0"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {category.description}
                    </p>
                    <div className="d-flex justify-content-center m-2">
                      <button
                        className="play-btn px-3 py-2"
                        onClick={() =>
                          navigate("/SingleQuiz", {
                            state: { category: category.title },
                          })
                        }
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-5">
              <button
                type="button"
                className="btn btn-outline-light rounded-pill px-5 py-2 mx-2 play-btn"
                onClick={() => navigate("/Quiz")}
              >
                See More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizCategories;
