import React from "react";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import "../style.css"; // Import external CSS for styling

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      feedback:
        "The programming quizzes helped me enhance my coding skills. I highly recommend it!",
    },
    {
      id: 2,
      name: "Jane Smith",
      feedback:
        "As a beginner, the quiz game provided an interactive learning experience. Great for practice!",
    },
    {
      id: 3,
      name: "James Newman",
      feedback:
        "It increases confidence, and can help to establish a culture of learning and growing from mistakes.",
    },
    {
      id: 4,
      name: "Suzy Switzer",
      feedback:
        "I have students with IEPs, I am able to find lessons catering to their abilities and accommodation while being able to assign the other students with more rigorous assessments.",
    },
  ];

  const itemsToShow = window.innerWidth < 576 ? 1 : 3;
  const testimonialsChunks = testimonials.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemsToShow);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

 // Adjust the breakpoint according to your design
  return (
    <Container className="testimonials-container">
      <h2 className="section-title">What Our Users Say</h2>
      <Row>
        <Col>
          <Carousel interval={5000} pause={false} indicators={false}>
            {testimonialsChunks.map((testimonialGroup, groupIndex) => (
              <Carousel.Item key={groupIndex}>
                <Row>
                  {testimonialGroup.map((testimonial) => (
                    <Col key={testimonial.id} md={4}>
                      <Card className={`testimonial-card border-${testimonial.id}`}>
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <Card.Text className="testimonial-feedback">
                            {testimonial.feedback}
                          </Card.Text>
                          <Card.Title className="testimonial-name">
                            - {testimonial.name}
                          </Card.Title>
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
    </Container>
  );
}

export default Testimonials;
