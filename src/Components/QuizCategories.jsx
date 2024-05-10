import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { getBadgeColor } from "../Pages/QuizPage";

function QuizCategories() {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      title: "JavaScript",
      difficulty: "beginner",
      description: "Test your JavaScript knowledge.",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_640.png",
      questions: 10,
      plays: 5000,
    },
    {
      id: 2,
      title: "Python",
      difficulty: "beginner",
      description: "Explore Python programming language.",
      image:
        "https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/python/logo.png",
      questions: 15,
      plays: 7000,
    },
    {
      id: 3,
      title: "Java",
      difficulty: "beginner",
      description: "Challenge yourself with Java quizzes.",
      image:
        "https://www.jrebel.com/sites/default/files/image/2020-05/image-blog-revel-top-java-tools.jpg",
      questions: 20,
      plays: 9000,
    },
  ];

  return (
    <>
      <div className="quiz-categories-container py-2">
        <h2 className="section-title">Quiz Categories</h2>
        <div className="container">
          <div className="row">
            {categories.map((category, index) => (
              <div className="col-md-4 col-sm-12" key={index}>
                <div className="quiz-category-card mb-5">
                  <img
                    src={category.image}
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
                    <h6 className="mx-4 pb-1">{category.title}</h6>
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
                      <button className="play-btn px-3 py-2" onClick={()=>navigate('/SingleQuiz')}>Start Quiz</button>
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
      </div>
      <section className="section p-5">
        <Row className="container-fluid mx-3">
          <Col md={6}>
            <p className="quiz-desc">
              The best way to ask questions, explore ideas, and let students
              show what they know.
            </p>
            <h1 className="quiz-title">Start Learning Today</h1>
            {/* <button
              type="button"
              className="btn btn-outline-light rounded-pill px-5 py-2 mx-2 create-btn"
              onClick={() => navigate("/login")}
            >
              SignUp
            </button> */}
          </Col>
          <Col md={6}>
            <img
              src="https://quizizz.com/wf/assets/64f6d6f262069b42407b43db_6333fb9ca08e3adffcfc663b_Funding_CTA_Image-p-800.webp"
              width={500}
              height={250}
            />
          </Col>
        </Row>
      </section>
    </>
  );
}

export default QuizCategories;
