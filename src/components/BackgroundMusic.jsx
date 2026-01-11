import React, { useState, useRef, useEffect } from 'react'
import davichMp3 from '../assets/다비치 (DAVICHI)  팡파레 (Fanfare) Official MV - 다비치 DAVICHI.mp3'

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)
  const [showMessage, setShowMessage] = useState(true)
  const [isFirstClick, setIsFirstClick] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(davichMp3)
    audio.loop = true
    audio.volume = 0.1 // 10% 볼륨
    audioRef.current = audio

    // 메시지 2초 후 사라지기
    setTimeout(() => {
      setShowMessage(false)
    }, 2000)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isFirstClick) {
        // 첫 번째 클릭: 재생 시작 및 음소거 해제
        audioRef.current.play()
        audioRef.current.muted = false
        setIsMuted(false)
        setIsFirstClick(false)
      } else {
        // 이후 클릭: 음소거 토글 (재생은 계속)
        audioRef.current.muted = !audioRef.current.muted
        setIsMuted(audioRef.current.muted)
      }
      
      // 말풍선 표시
      setShowTooltip(true)
      setTimeout(() => {
        setShowTooltip(false)
      }, 3000)
    }
  }

  return (
    <>
      {/* 배경음악 준비 메시지 */}
      {showMessage && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center animate-slideDownUp">
          <div className="bg-gray-500 bg-opacity-60 text-white py-2 px-6 rounded-b-lg text-center max-w-md mx-auto">
            <p className="text-sm font-light">배경음악이 준비 되었습니다.</p>
          </div>
        </div>
      )}
      
      {/* 오디오 요소 (숨김) */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      
      {/* 말풍선 */}
      <div 
        className="fixed top-6 z-40 origin-right flex items-center h-8"
        style={{ 
          right: '65px',
          transform: showTooltip ? 'scaleX(1)' : 'scaleX(0)',
          opacity: showTooltip ? 1 : 0,
          transition: 'all 0.4s ease-in-out'
        }}
      >
        <div className="relative bg-white shadow-lg rounded-xl px-3 py-1 border border-gray-200 whitespace-nowrap flex items-center h-full">
          <div className="text-gray-800 font-medium" style={{ fontFamily: "'NanumBuJangNimNunCiCe', cursive", fontSize: '14px' }}>다비치 - 팡파레</div>
          {/* 오른쪽 화살표 삼각형 */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 border-l-8 border-t-4 border-b-4"
            style={{
              right: '-8px',
              borderLeftColor: 'white',
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent'
            }}
          />
        </div>
      </div>
      
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 w-8 h-8 rounded-full bg-white/50 shadow-lg flex items-center justify-center hover:bg-white/70 transition-all border border-gray-300"
        aria-label={isMuted ? '음소거 해제' : '음소거'}
      >
        {isMuted ? (
          <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>
    </>
  )
}
