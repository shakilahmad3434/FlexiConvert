import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Footer from './Footer'
import Features from './Features'
import Formats from './Formats'

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Formats />
        <Features />
      </main>
      <Footer />
    </div>
  )
}

export default Home