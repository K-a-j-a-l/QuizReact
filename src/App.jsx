import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ContactPage from "./Pages/ContactPage";
import ResourcesPage from "./Pages/ResourcesPage";
import QuizPage from "./Pages/QuizPage";
import Leaderboard from "./Pages/LeaderBoardPage";
import SingleQuizPage from "./Pages/SingleQuizPage";
import AdminPanel from "./Pages/AdminPanel";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/slice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Assuming your user state is managed in Redux

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const isAdmin = user && (user?.user?.email === "admin@gmail.com");

  const PrivateRoute = ({ element, ...props }) => {
    return isAdmin ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Contact" element={<ContactPage />} />
          <Route path="/Resources" element={<ResourcesPage />} />
          <Route path="/Quiz" element={<QuizPage />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/SingleQuiz" element={<SingleQuizPage />} />
          <Route
            path="/AdminPanel"
            element={<PrivateRoute element={<AdminPanel />} />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
