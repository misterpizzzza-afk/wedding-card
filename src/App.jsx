import React from 'react'
import { useEffect } from 'react'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Calendar from './components/Calendar'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Account from './components/Account'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        } else {
          entry.target.classList.remove('visible')
        }
      })
    }, { threshold: 0.1 })

    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach((el) => observer.observe(el))

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el))
    }
  }, [])
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
      <Hero />
      <main className="space-y-0">
        <div className="px-6 py-8">
          <div className="fade-in">
            <Invitation />
          </div>
          <div className="divider my-8" />
          <div className="fade-in">
            <Calendar />
          </div>
          <div className="divider my-8" />
          <div className="fade-in">
            <Gallery />
          </div>
          <div className="divider my-8" />
          <div className="fade-in">
            <Location />
          </div>
          <div className="divider my-8" />
          <div className="fade-in">
            <Account />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
