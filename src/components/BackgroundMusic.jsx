import React, { useState, useRef, useEffect } from 'react'

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(true)
  const [player, setPlayer] = useState(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const playerRef = useRef(null)

  useEffect(() => {
    // YouTube IFrame API 로드
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    // API 준비되면 플레이어 생성
    window.onYouTubeIframeAPIReady = () => {
      const ytPlayer = new window.YT.Player(playerRef.current, {
        videoId: 'BtPHw6YLMN0',
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: 'BtPHw6YLMN0',
          mute: 1
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target)
            event.target.setVolume(10) // 볼륨 10%로 설정
            event.target.playVideo()
          }
        }
      })
    }
  }, [])

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute()
      } else {
        player.mute()
      }
      setIsMuted(!isMuted)
      
      // 말풍선 표시
      setShowTooltip(true)
      setTimeout(() => {
        setShowTooltip(false)
      }, 3000)
    }
  }

  return (
    <>
      {/* 유튜브 플레이어 (숨김) */}
      <div style={{ position: 'fixed', left: '-9999px', top: '-9999px' }}>
        <div ref={playerRef}></div>
      </div>
      
      {/* 말풍선 */}
      <div className={`fixed top-6 right-16 z-40 transition-all duration-300 flex items-center ${showTooltip ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-white shadow-lg rounded-xl px-3 py-1.5 border border-gray-200 relative">
          <div className="text-gray-800 font-medium whitespace-nowrap" style={{ fontFamily: "'NanumBuJangNimNunCiCe', cursive", fontSize: '16px', lineHeight: '1.2' }}>다비치 - 팡파레</div>
          {/* 오른쪽 화살표 */}
          <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2">
            <div className="w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-6 border-l-white" style={{ borderTopWidth: '6px', borderBottomWidth: '6px', borderLeftWidth: '6px' }}></div>
          </div>
        </div>
      </div>
      
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200"
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
