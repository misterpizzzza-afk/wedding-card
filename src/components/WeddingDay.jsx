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

export default function WeddingDay() {
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
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <h2 className="text-sm font-semibold text-gray-600 tracking-widest mb-6">WEDDING DAY</h2>

        {/* 날짜 및 시간 */}
        <p className="text-gray-800 font-light text-sm mb-8 leading-relaxed">
          {dateStr}
        </p>

        {/* 달력 */}
        <div className="mb-8 inline-block">
          <div className="text-xs text-gray-500 mb-3">
            <span className="font-semibold">{currentMonth}월</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
              <div key={`header-${i}`} className="w-6 h-6 text-xs text-gray-400 flex items-center justify-center">
                {day}
              </div>
            ))}
            {daysInMonth.map((d, i) => (
              <div
                key={`day-${i}`}
                className={`w-6 h-6 text-xs flex items-center justify-center rounded ${
                  d === currentDay
                    ? 'bg-gray-800 text-white font-semibold'
                    : d
                    ? 'text-gray-700'
                    : 'text-gray-300'
                }`}
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* 카운트다운 */}
        {time ? (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-800">
                  {String(time.days).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-1">DAYS</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-800">
                  {String(time.hours).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-1">HOURS</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-800">
                  {String(time.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-1">MINUTES</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-gray-800">
                  {String(time.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-1">SECONDS</div>
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
