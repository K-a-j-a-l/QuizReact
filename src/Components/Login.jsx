import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "../style.css"; // Import external CSS for styling

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showNameField, setShowNameField] = useState(false);

  const handleToggleForm = () => {
    setShowNameField(!showNameField);
    setEmail("");
    setPassword("");
    setName("");
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showNameField) {
      setMessage(`Registering with name: ${name}, email: ${email}, and password: ${password}`);
    } else {
      setMessage(`Logging in with email: ${email} and password: ${password}`);
    }
  };

  return (
    <Container className="login-container">
      <Row>
        {/* Column with Image */}
        <Col md={6} className="image-column">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz58hHbhbg0-f59_em8kU1WlHufxNSQGIS1nwM4GHeESxISaMuCJ4NUmhMepdd7v2FvnU&usqp=CAU" // Replace with your image URL
            alt="Login"
            className="img-fluid"
          />
        </Col>

        {/* Column with Login/Register Form */}
        <Col md={6} className="form-column">
          <h3 className="text-center mb-4">
            {showNameField ? "Create Account" : "Login"}
          </h3>
          <Form onSubmit={handleSubmit}>
            {showNameField && (
              <Form.Group controlId="formName" className="mb-4">
                <Form.Control
                  className="inpField"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group controlId="formEmail" className="mb-4">
              <Form.Control
                className="inpField"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Control
                className="inpField"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="btnSubmit">
              {showNameField ? "Register" : "Login"}
            </Button>

            {!showNameField && (
              <Button
                variant="link"
                className="btn-forgot-password"
                onClick={() => setMessage("Forgot Password Clicked")}
              >
                Forgot Password?
              </Button>
            )}

            {showNameField ? (
              <p className="mt-3">
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={handleToggleForm}
                >
                  Login Here
                </Button>
              </p>
            ) : (
              <p className="mt-3">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  onClick={handleToggleForm}
                >
                  Create Account
                </Button>
              </p>
            )}
          </Form>

          {message && (
            <Alert variant="info" className="mt-3">
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
