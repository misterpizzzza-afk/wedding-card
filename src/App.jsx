import React from 'react'
import { useState, useEffect } from 'react'
import IntroSplash from './components/IntroSplash'
import BackgroundMusic from './components/BackgroundMusic'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Calendar from './components/Calendar'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Account from './components/Account'
import Footer from './components/Footer'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    if (!showIntro) {
      // 메인 화면이 보이면 observer 시작
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      }, { threshold: 0.1 })

      // 약간의 지연 후 fade-in 요소들 관찰 시작
      setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in')
        fadeElements.forEach((el) => observer.observe(el))
      }, 100)

      return () => {
        const fadeElements = document.querySelectorAll('.fade-in')
        fadeElements.forEach((el) => observer.unobserve(el))
      }
    }
  }, [showIntro])

  if (showIntro) {
    return <IntroSplash onComplete={() => {
      setShowIntro(false)
      setTimeout(() => setFadeIn(true), 50)
    }} />
  }

  return (
    <>
      <BackgroundMusic />
      <div className={`max-w-md mx-auto bg-white min-h-screen shadow-xl transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
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
    </>
  )
}
