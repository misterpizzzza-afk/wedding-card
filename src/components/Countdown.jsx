import React, { useEffect, useState } from 'react'

function getRemaining(target) {
  const now = new Date()
  const t = new Date(target) - now
  if (t <= 0) return null
  const days = Math.floor(t / (1000 * 60 * 60 * 24))
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((t / (1000 * 60)) % 60)
  const seconds = Math.floor((t / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function FlipNumber({ value, label }) {
  const [currentValue, setCurrentValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    if (value !== currentValue) {
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentValue(value)
        setIsFlipping(false)
      }, 600)
    }
  }, [value, currentValue])

  const displayValue = String(currentValue).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-12 h-14" style={{ perspective: '500px' }}>
        <div 
          className="absolute w-full h-full bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center font-semibold text-lg"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipping ? 'rotateX(90deg)' : 'rotateX(0deg)',
            transition: 'transform 0.6s',
            opacity: isFlipping ? 0 : 1
          }}
        >
          {displayValue}
        </div>
      </div>
      <div className="text-xs mt-1 font-light">{label}</div>
    </div>
  )
}

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState(() => getRemaining(targetDate))

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getRemaining(targetDate))
    }, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  if (!time) return <div className="text-sm font-light">오늘입니다 🎉</div>

  return (
    <div className="flex gap-2 justify-center text-white">
      <FlipNumber value={time.days} label="Days" />
      <div className="flex items-center font-light text-xl">:</div>
      <FlipNumber value={time.hours} label="Hours" />
      <div className="flex items-center font-light text-xl">:</div>
      <FlipNumber value={time.minutes} label="Minutes" />
      <div className="flex items-center font-light text-xl">:</div>
      <FlipNumber value={time.seconds} label="Seconds" />
    </div>
  )
}
