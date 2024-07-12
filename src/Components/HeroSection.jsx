import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../style.css"; // Import external CSS for styling
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={12}>
            <h1 className="hero-title">The Brainnies: A Programming Language Quiz Game</h1>
            <p className="hero-description">
                Challenge yourself with our interactive quiz game! Whether you're a beginner or an experienced developer,
                our quizzes cover a wide range of topics in various programming languages.
                Enhance your coding skills and learn new concepts with our engaging and educational questions.
            </p>
            <button className="hero-btn rounded-pill px-4 py-2 text-white" onClick={()=>navigate("/Quiz")}>
              Start Quiz<i className="mx-2 fa-solid fa-angles-right"></i>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeroSection;
