import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import "../style.css";
import { useNavigate } from "react-router-dom";

function QuizCategories() {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      title: "JavaScript",
      description: "Test your JavaScript knowledge.",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_640.png",
    },
    {
      id: 2,
      title: "Python",
      description: "Explore Python programming language.",
      image:
        "https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/python/logo.png",
    },
    {
      id: 3,
      title: "Java",
      description: "Challenge yourself with Java quizzes.",
      image:
        "https://www.jrebel.com/sites/default/files/image/2020-05/image-blog-revel-top-java-tools.jpg",
    },
    {
      id: 4,
      title: "C++",
      description: "Challenge yourself with C++ quizzes.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsw7v5zOBRSTjLZIINcmFft1bLTQSfGGBIyo-GfGUjsg&s",
    },
  ];

  const itemsToShow = window.innerWidth < 576 ? 1 : 4;
  const categoriesChunks = categories.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemsToShow);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return (
    <>
      <div className="quiz-categories-container py-2">
        <h2 className="section-title">Quiz Categories</h2>
        <div>
          <Row>
            <Col>
              <Carousel interval={5000} pause={false} indicators={false}>
                {categoriesChunks.map((categoryGroup, groupIndex) => (
                  <Carousel.Item key={groupIndex}>
                    <Row>
                      {categoryGroup.map((category) => (
                        <Col key={category.id} md={3}>
                          <Card className="quiz-category-card">
                            <Card.Img
                              src={category.image}
                              alt={category.title}
                              width={15}
                              height={200}
                              className="d-flex justify-content-center"
                            />
                            <Card.Body>
                              <Card.Title>{category.title}</Card.Title>
                              <Card.Text style={{ fontSize: "0.8rem" }}>
                                {category.description}
                              </Card.Text>
                              <Button variant="primary">Start Quiz</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
          <Row className="mx-5 my-5">
            <Col md={4} className=" d-flex justify-content-center flex-column">
              <h1 className="quiz-title">30M+</h1>
              <h2 className="quiz-desc">Quizzes & Courses</h2>
            </Col>
            <Col md={4} className=" d-flex justify-content-center flex-column">
              <h1 className="quiz-title">All languages</h1>
              <h2 className="quiz-desc">C, Python, Java, JavaScript, etc</h2>
            </Col>
            <Col md={4} className=" d-flex justify-content-center flex-column">
              <h1 className="quiz-title">All Levels</h1>
              <h2 className="quiz-desc">Beginner, Expert & Advance</h2>
            </Col>
          </Row>
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
            <button
              type="button"
              className="btn btn-outline-light rounded-pill px-5 py-2 mx-2 create-btn"
              onClick={() => navigate("/login")}
            >
              SignUp
            </button>
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
