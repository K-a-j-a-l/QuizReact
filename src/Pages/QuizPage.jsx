import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config"; // Import your Firebase configuration
import { collection, query, getDocs, where } from "firebase/firestore";
import Loader from "../Components/Loader";

const Hero = {
  backgroundImage:
    "url('https://t4.ftcdn.net/jpg/04/39/13/37/240_F_439133763_FrLdhZsd5aGC23r9ATARuKJBr8ifZjIe.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  paddingTop: "350px",
  backgroundPosition: "center",
};

export const getBadgeColor = (difficulty) => {
  switch (difficulty) {
    case "beginner":
      return "bg-info";
    case "intermediate":
      return "bg-warning";
    case "advanced":
      return "bg-danger";
    default:
      return "bg-secondary";
  }
};

export const getRandomDifficulty = () => {
  const difficulties = ["beginner", "intermediate", "advanced"];
  const randomIndex = Math.floor(Math.random() * difficulties.length);
  return difficulties[randomIndex];
};

const QuizPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const q = query(collection(db, "quizCategories"));
      try {
        const querySnapshot = await getDocs(q);
        const fetchedCategories = [];
        for (const doc of querySnapshot.docs) {
          const categoryData = doc.data();
          // Fetch number of questions for each category
          const questionsQuery = query(collection(db, "quizQuestions"), where("category", "==", categoryData.name));
          const questionsSnapshot = await getDocs(questionsQuery);
          const questionsCount = questionsSnapshot.size;

          fetchedCategories.push({
            id: doc.id,
            ...categoryData,
            questions: questionsCount,
            plays: Math.floor(Math.random() * 10000), // Random plays (0-9999)
            difficulty: getRandomDifficulty(),
            image: "https://example.com/default-image.jpg", // Replace with your default image URL
          });
        }
        setCategories(fetchedCategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <section>
        <div className="container-fluid pb-5" style={Hero}>
          <div className="container-md p-3 pb-5">
            <h1 className="quiz-title fs-1 ">Let's Play the Quiz!</h1>
            <p className="quiz-desc fs-5">
              Select your level and the domain and just get start to explore and
              learn with a competitive spirit!
            </p>
          </div>
        </div>
      </section>
      <div className="container mt-5">
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            {categories.map((category) => (
              <div className="col-md-4 col-sm-12" key={category.id}>
                <div className="quiz-category-card mb-5">
                  <img
                    src={category.thumbnail}
                    alt="Category Image"
                    className="d-flex justify-content-center"
                  />
                  <div className="d-flex justify-content-between mx-4">
                    <p className="absolute bg-white p-1 rounded">
                      Q: {category.questions || 0}
                    </p>
                    <p className="absolute bg-white p-1 rounded">
                      Plays:{" "}
                      {category.plays && category.plays >= 1000
                        ? (category.plays / 1000).toFixed(0) + "K"
                        : category.plays}
                    </p>
                  </div>

                  <div>
                    <h6 className="mx-4 pb-1">{category.name}</h6>
                    <div
                      className={`badge mx-4 mb-2 ${getBadgeColor(
                        category.difficulty || "beginner"
                      )}`}
                    >
                      {category.difficulty || "beginner"}
                    </div>
                    <p
                      className="quiz-desc text-dark mx-4 mb-0"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {category.description || "No description available."}
                    </p>
                    <div className="d-flex justify-content-center m-2">
                      <button
                        className="play-btn px-3 py-2"
                        onClick={() =>
                          navigate("/SingleQuiz", {
                            state: { category: category.name },
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
        )}
      </div>
    </div>
  );
};

export default QuizPage;
