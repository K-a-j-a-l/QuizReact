import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../style.css"; // Import external CSS for styling

function Footer() {
  return (
    <div className="footer-container">
      <Container>
        <Row>
          <Col md={6} className="footer-text">
            <p>&copy; 2024 Quiz App. All rights reserved.</p>
          </Col>
          <Col md={6} className="footer-text">
            <p>Designed and developed by Your Name</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
