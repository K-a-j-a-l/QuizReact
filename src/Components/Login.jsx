import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "../style.css"; // Import external CSS for styling
import { auth } from "../config";
import { setUser } from '../redux/slice';

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
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showNameField) {
      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({
          displayName: name
        });
        dispatch(setUser(userCredential.user));
        setMessage(`User registered successfully with name: ${name}, email: ${email}`);
      } catch (error) {
        setMessage(`Error registering user: ${error.message}`);
      }
    } else {
      handleLogin();
    }
  };
  
  const handleLogin = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      dispatch(setUser(userCredential.user));
      console.log("Logged in successfully!");
    } catch (error) {
      console.error("Error signing in:", error);
      setMessage(`Error signing in: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
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

            <Button
              variant="primary"
              type="submit"
              className="btnSubmit"
            >
              {showNameField ? "Register" : "Login"}
            </Button>

            {showNameField ? (
              <p className="mt-3">
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={handleToggleForm}
                  className="btns"
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
                  className="btns"
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
    </div>
  );
}

export default Login;
