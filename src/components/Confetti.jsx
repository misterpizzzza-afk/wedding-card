import React, { useEffect, useState } from 'react'

export default function Confetti({ active }) {
  const [confetti, setConfetti] = useState([])
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (active) {
      const pieces = []
      const colors = ['#FF1493', '#FF69B4', '#FFD700', '#FFA500', '#FF6347', '#FF4500', '#DA70D6', '#BA55D3', '#9370DB', '#00CED1', '#00BFFF', '#1E90FF', '#32CD32', '#7FFF00', '#ADFF2F']
      
      // 8개의 폭죽
      for (let firework = 0; firework < 8; firework++) {
        const centerX = (15 + Math.random() * 70) * window.innerWidth / 100
        const centerY = (15 + Math.random() * 50) * window.innerHeight / 100
        
        // 각 폭죽마다 60개의 조각
        for (let i = 0; i < 60; i++) {
          const angle = (Math.PI * 2 * i) / 60
          const velocity = 150 + Math.random() * 200
          
          pieces.push({
            id: `${firework}-${i}`,
            startX: centerX,
            startY: centerY,
            endX: centerX + Math.cos(angle) * velocity,
            endY: centerY + Math.sin(angle) * velocity + 250,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: firework * 150,
            size: 8 + Math.random() * 12,
            rotation: Math.random() * 360
          })
        }
      }
      
      setConfetti(pieces)
      
      // 다음 프레임에 애니메이션 시작
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true)
        })
      })
      
      const timer = setTimeout(() => {
        setConfetti([])
        setAnimate(false)
      }, 3500)
      
      return () => clearTimeout(timer)
    }
  }, [active])

  if (confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${animate ? piece.endX : piece.startX}px`,
            top: `${animate ? piece.endY : piece.startY}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            boxShadow: `0 0 10px ${piece.color}`,
            opacity: animate ? 0 : 1,
            transform: `rotate(${animate ? piece.rotation + 1080 : piece.rotation}deg) scale(${animate ? 0 : 1})`,
            transition: `all 2s ease-out ${piece.delay}ms`
          }}
        />
      ))}
    </div>
  )
}
