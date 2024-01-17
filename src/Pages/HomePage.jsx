import React from 'react'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import Testimonials from '../Components/Testimonials'
import Footer from '../Components/Footer'

export default function HomePage() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <Testimonials/>
        <Footer/>
    </div>

  )
}
