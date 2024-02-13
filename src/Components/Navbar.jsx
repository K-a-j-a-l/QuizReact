import React from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import logo from "../Assets/logo.png";

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/"><img src={logo} alt='Logo' width={200} height={50}/></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/Resources">Resources</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/Quiz">Quizzes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/Leaderboard">Leaderboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/Contact">Contact</NavLink>
            </li>
          </ul>
          <div className='row'>
            <div className='col-5'>
              <button type="button" className="btn btn-outline-light rounded-pill px-5 py-2 mx-2 create-btn" onClick={() => navigate("/login")}>SignUp</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
