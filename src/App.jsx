import React,{ useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage'
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Router>
      <Navbar/>
      <Routes>
      
        <Route path="/" element={<HomePage/>}></Route>
         <Route path="/login" element={<Login />} />
        {/* <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/Contact" element={<ContactPage/>}/>
        <Route path="/About" element={<AboutPage/>}></Route>
        <Route path="/Product" element={<ProductPage/>}></Route>
        <Route path="/Listings" element={<ListingPage/>}></Route>  */}

      </Routes>
      <Footer/>
    </Router>
    </>
  )
}

export default App
