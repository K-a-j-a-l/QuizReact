import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../style.css"; // Import external CSS for styling
import logo from "../Assets/logo.png"

function AppNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar bg-dark">
      <Navbar.Brand href="#"><img src={logo} height={32} width={120}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">Quizzes</Nav.Link>
          <Nav.Link href="#services">Leaderboard</Nav.Link>
          <Nav.Link href="#contact">Courses</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="#login" className="btn btnLogin">
            Create Account
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
