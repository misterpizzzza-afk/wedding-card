import React, { useEffect, useState } from 'react'
import { DATA } from '../data'

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

function renderCalendar(targetDate) {
  const date = new Date(targetDate)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = firstDay.getDay()
  const endDate = lastDay.getDate()

  const daysInMonth = []
  for (let i = 0; i < startDate; i++) {
    daysInMonth.push(null)
  }
  for (let i = 1; i <= endDate; i++) {
    daysInMonth.push(i)
  }

  return { daysInMonth, currentDay: day, currentMonth: month + 1 }
}

export default function Calendar() {
  const [time, setTime] = useState(() => getRemaining(DATA.datetime))
  const { daysInMonth, currentDay, currentMonth } = renderCalendar(DATA.datetime)

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getRemaining(DATA.datetime))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const weddingDate = new Date(DATA.datetime)
  const dateStr = weddingDate.toLocaleString('ko-KR', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <section className="bg-white">
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        {/* 날짜 및 시간 */}
        <p className="text-gray-800 font-normal text-base mb-8 leading-relaxed">
          {dateStr}
        </p>

        {/* 달력 */}
        <div className="mb-6 w-full">
          <div className="text-lg text-gray-700 mb-4">
            <span className="font-bold">{currentMonth}월</span>
          </div>
          <div className="grid grid-cols-7 gap-3 px-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
              <div key={`header-${i}`} className="w-full h-8 text-base text-gray-400 flex items-center justify-center font-semibold">
                {day}
              </div>
            ))}
            {daysInMonth.map((d, i) => (
              <div
                key={`day-${i}`}
                className={`relative w-full h-10 text-base flex items-center justify-center rounded font-medium ${
                  d === currentDay
                    ? 'bg-gray-800 text-white font-bold'
                    : d
                    ? 'text-gray-700'
                    : 'text-gray-300'
                }`}
              >
                {d}
                {d === currentDay && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-800 font-light">
                    11:20
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 결혼식까지 문구 */}
        <p className="text-base text-gray-700 font-normal mb-6">
          {DATA.couple.groom} <span className="text-red-500">♥</span> {DATA.couple.bride} 결혼식까지
        </p>

        {/* 카운트다운 */}
        {time ? (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-normal text-gray-800">
                  {String(time.days).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-2 font-medium">DAYS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-normal text-gray-800">
                  {String(time.hours).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-2 font-medium">HOURS</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-normal text-gray-800">
                  {String(time.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-2 font-medium">MINUTES</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-normal text-gray-800">
                  {String(time.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-2 font-medium">SECONDS</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-600 py-4">
            오늘입니다! 🎉
          </div>
        )}
      </div>
    </section>
  )
}
