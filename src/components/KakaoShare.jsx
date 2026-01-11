import React from 'react'
import { useState, useEffect } from 'react'

export default function KakaoShare() {
  const [showButtons, setShowButtons] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Hero 섹션이 보이는 동안(대략 300px 이상 스크롤되지 않았을 때) 버튼 숨기기
      setShowButtons(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleKakaoShare = () => {
    try {
      const jsKey = import.meta.env.VITE_KAKAO_JS_KEY
      const templateId = 127828

      if (!jsKey || !window.Kakao) {
        return
      }

      Kakao.init(jsKey)

      if (!Kakao.isInitialized()) {
        return
      }

      Kakao.Share.sendCustom({
        templateId: templateId,
        templateArgs: {}
      })
    } catch (error) {
      // 오류 발생 시 조용히 무시
      console.error('카카오톡 공유 실패:', error)
    }
  }

  return (
    <div className={`fixed right-1/2 translate-x-52 bottom-2 flex flex-col gap-2 transition-all duration-500 ${showButtons ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* 최상단 이동 버튼 */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:opacity-100 opacity-50"
        title="최상단으로 이동"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* 공유하기 버튼 */}
      <button
        onClick={handleKakaoShare}
        className="w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:opacity-100 opacity-50"
        title="카카오톡으로 공유"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </button>
    </div>
  )
}
