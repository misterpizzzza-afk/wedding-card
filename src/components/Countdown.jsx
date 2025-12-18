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
      <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg font-semibold text-lg">{String(time.days).padStart(2, '0')}</div>
        <div className="text-xs mt-1 font-light">Days</div>
      </div>
      <div className="flex items-center font-light text-xl">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg font-semibold text-lg">{String(time.hours).padStart(2, '0')}</div>
        <div className="text-xs mt-1 font-light">Hours</div>
      </div>
      <div className="flex items-center font-light text-xl">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg font-semibold text-lg">{String(time.minutes).padStart(2, '0')}</div>
        <div className="text-xs mt-1 font-light">Minutes</div>
      </div>
      <div className="flex items-center font-light text-xl">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg font-semibold text-lg">{String(time.seconds).padStart(2, '0')}</div>
        <div className="text-xs mt-1 font-light">Seconds</div>
      </div>
    </div>
  )
}
