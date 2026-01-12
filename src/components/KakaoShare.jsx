import React from 'react'
import { useState, useEffect } from 'react'

export default function KakaoShare() {
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    const heroElement = document.getElementById('hero')
    
    if (heroElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Hero 섹션의 상단 50%가 화면에서 사라지면 버튼 표시
            setShowButtons(!entry.isIntersecting)
          })
        },
        { threshold: 0.5 }
      )
      
      observer.observe(heroElement)
      return () => observer.unobserve(heroElement)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleKakaoShare = () => {
    try {
      console.log('카카오 공유 시작')
      const jsKey = '018cafaea137dc0bfe6d125671f0fce6'
      const templateId = 127828

      console.log('JS Key:', jsKey)
      console.log('Window.Kakao:', window.Kakao)

      if (!jsKey) {
        console.error('VITE_KAKAO_JS_KEY 환경 변수가 설정되지 않았습니다')
        return
      }

      if (!window.Kakao) {
        console.error('Kakao SDK가 로드되지 않았습니다')
        return
      }

      console.log('Kakao 초기화 중...')
      Kakao.init(jsKey)

      if (!Kakao.isInitialized()) {
        console.error('Kakao 초기화 실패')
        return
      }

      console.log('공유 시작', templateId)
      Kakao.Share.sendCustom({
        templateId: templateId,
        templateArgs: {}
      })
      console.log('공유 완료')
    } catch (error) {
      console.error('카카오톡 공유 실패:', error)
      console.error('에러 상세:', error.message)
      console.error('에러 스택:', error.stack)
    }
  }

  return (
    <div className={`fixed right-6 sm:right-auto sm:left-1/2 sm:translate-x-28 bottom-2 flex flex-col gap-2 transition-all duration-500 ${showButtons ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      {/* 최상단 이동 버튼 */}
      <button
        onClick={(e) => {
          scrollToTop()
          e.currentTarget.blur()
        }}
        className="w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:opacity-100 opacity-50 focus:outline-none"
        title="최상단으로 이동"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>

      {/* 공유하기 버튼 */}
      <button
        onClick={(e) => {
          handleKakaoShare()
          e.currentTarget.blur()
        }}
        className="w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:opacity-100 opacity-50 focus:outline-none"
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
