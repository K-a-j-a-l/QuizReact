import React,{ useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ContactPage from './Pages/ContactPage';
import ResourcesPage from './Pages/ResourcesPage';
import QuizPage from './Pages/QuizPage'
import Leaderboard from './Pages/LeaderBoardPage';
import SingleQuizPage from './Pages/SingleQuizPage';

function App() {
  return (
    <>
      <Router>
      <Navbar/>
      <Routes>
      
        <Route path="/" element={<HomePage/>}></Route>
         <Route path="/login" element={<Login />} />
         <Route path="/Contact" element={<ContactPage/>}/>
         <Route path="/Resources" element={<ResourcesPage/>}/>
         <Route path="/Quiz" element={<QuizPage/>}></Route>
         <Route path="/Leaderboard" element={<Leaderboard/>}></Route>
         <Route path="/SingleQuiz" element={<SingleQuizPage/>}></Route>
        {/* <Route path="/AdminPanel" element={<AdminPanel />} />
        
        
        
          */}

      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
