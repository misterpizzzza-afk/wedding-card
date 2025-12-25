import React, { useState, useEffect } from 'react'

// 한글 자모음 분해 함수
function decomposeHangul(text) {
  const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
  const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ']
  const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
  
  const result = []
  
  for (let char of text) {
    const code = char.charCodeAt(0)
    
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const offset = code - 0xAC00
      const cho = Math.floor(offset / 588)
      const jung = Math.floor((offset % 588) / 28)
      const jong = offset % 28
      
      result.push({ cho: CHO[cho], jung: JUNG[jung], jong: JONG[jong] })
    } else {
      result.push({ char })
    }
  }
  
  return result
}

// 한글 조합 함수
function composeHangul(cho, jung, jong = '') {
  const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
  const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ']
  const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ']
  
  const choIdx = CHO.indexOf(cho)
  const jungIdx = JUNG.indexOf(jung)
  const jongIdx = JONG.indexOf(jong)
  
  if (choIdx === -1 || jungIdx === -1 || jongIdx === -1) return cho + jung + jong
  
  return String.fromCharCode(0xAC00 + choIdx * 588 + jungIdx * 28 + jongIdx)
}

export default function IntroSplash({ onComplete }) {
  const [displayedText, setDisplayedText] = useState('')
  const [fadeOut, setFadeOut] = useState(false)
  const fullText = '우리\n결혼합니다 ♥'
  
  useEffect(() => {
    const decomposed = decomposeHangul(fullText)
    const steps = []
    let currentText = ''
    
    // 각 글자의 자모음을 단계별로 추가
    decomposed.forEach(item => {
      if (item.char !== undefined) {
        currentText += item.char
        steps.push(currentText)
      } else {
        // 초성만
        const temp1 = currentText + item.cho
        steps.push(temp1)
        
        // 초성 + 중성
        const temp2 = currentText + composeHangul(item.cho, item.jung)
        steps.push(temp2)
        
        // 초성 + 중성 + 종성 (종성이 있을 경우)
        if (item.jong) {
          const temp3 = currentText + composeHangul(item.cho, item.jung, item.jong)
          steps.push(temp3)
        }
        
        currentText += composeHangul(item.cho, item.jung, item.jong)
      }
    })
    
    let currentStep = 0
    const typingInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setDisplayedText(steps[currentStep])
        currentStep++
      } else {
        clearInterval(typingInterval)
      }
    }, 80) // 80ms마다 한 자모씩

    // 타이핑 완료 후 1.5초 대기 후 페이드 아웃 시작
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true)
    }, steps.length * 80 + 1500)

    // 페이드 아웃 후 메인 화면으로 전환
    const completeTimer = setTimeout(() => {
      onComplete()
    }, steps.length * 80 + 2000) // 페이드 아웃 시간 500ms 추가

    return () => {
      clearInterval(typingInterval)
      clearTimeout(fadeOutTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  return (
    <div className={`fixed inset-0 bg-yellow-50 flex items-center justify-center z-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="text-center px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-wide whitespace-pre-line" style={{ fontFamily: "'NanumBuJangNimNunCiCe', cursive", fontWeight: 'bold' }}>
          {displayedText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    </div>
  )
}