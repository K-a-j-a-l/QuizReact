import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import { selectUser, clearUser } from "../redux/slice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const isAdmin =
    user && (user?.email === "admin@gmail.com");

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width={200} height={60} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/Resources"
              >
                Resources
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/Quiz">
                Quizzes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/Leaderboard"
              >
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeclassname="active"
                to="/Contact"
              >
                Contact
              </NavLink>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeclassname="active"
                  to="/AdminPanel"
                >
                  AdminPanel
                </NavLink>
              </li>
            )}
          </ul>
          <div className="row">
            <div className="col-12">
              {user ? (
                <button
                  type="button"
                  className="btn btn-outline-light px-3 py-1 mx-3"
                  onClick={handleLogout}
                >
                  Welcome, {user.displayName}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-light rounded-pill px-5 py-2 mx-3 create-btn"
                  onClick={() => navigate("/login")}
                >
                  SignUp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
