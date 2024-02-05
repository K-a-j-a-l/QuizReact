import React from 'react'
import Navbar from '../Components/Navbar'
import HeroSection from '../Components/HeroSection'
import Testimonials from '../Components/Testimonials'
import Footer from '../Components/Footer'
import QuizCategories from '../Components/QuizCategories'
import FAQ from '../Components/FAQ'

export default function HomePage() {
  return (
    <div>
        <HeroSection/>
        <Testimonials/>
        <QuizCategories/>
        <FAQ/>
    </div>

  )
}
