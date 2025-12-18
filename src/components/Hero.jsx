import React from 'react'
import { DATA } from '../data'
import heroImage from '../assets/hero/DSC00934.JPG'

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-white">
      {/* 세로 이미지 */}
      <div className="relative w-full">
        <img
          src={heroImage}
          alt="wedding"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* 하단 텍스트 영역 */}
      <div className="relative z-10 text-center px-4 pt-16 pb-6 bg-white">
        {/* 상단 구분선 */}
        <div className="flex justify-center mb-4">
          <div className="h-0.5 w-64 bg-gray-300" />
        </div>

        <p className="text-base text-gray-700 font-normal mb-4 leading-relaxed">
          {new Date(DATA.datetime).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })} {new Date(DATA.datetime).toLocaleString('ko-KR', { timeStyle: 'short' })}<br />
          더컨벤션 영등포 1층 그랜드볼룸홀
        </p>

        {/* 하단 구분선 */}
        <div className="flex justify-center">
          <div className="h-px w-64 bg-gray-300" />
        </div>
      </div>
    </header>
  )
}
