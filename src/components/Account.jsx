import React, { useState } from 'react'
import { DATA } from '../data'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 font-normal transition-all"
    >
      {copied ? '✓ 복사됨' : '복사'}
    </button>
  )
}

export default function Account() {
  const [expandedSides, setExpandedSides] = useState({})

  const toggleSide = (side) => {
    setExpandedSides(prev => ({
      ...prev,
      [side]: !prev[side]
    }))
  }

  return (
    <section>
      <h2 className="section-title">마음 전하실 곳</h2>
      <div className="text-center mb-6 text-sm text-gray-700 font-normal leading-relaxed">
        <p className="mb-2">멀리서도 축하의 마음을</p>
        <p className="mb-2">전하고 싶으신 분들을 위해</p>
        <p className="mb-4">계좌번호를 안내드립니다.</p>
        <p className="mb-2">소중한 축하를 보내주셔서 감사드리며,</p>
        <p>따뜻한 마음에 깊이 감사드립니다.</p>
      </div>
      <div className="space-y-2">
        {DATA.accounts.map((acc, i) => (
          <div key={i}>
            {/* 펼치기/접기 버튼 */}
            <button
              onClick={() => toggleSide(acc.side)}
              className="w-full text-left hover:bg-gray-50 transition-all flex items-center justify-between py-3 px-4 border border-gray-100 rounded-lg"
            >
              <p className="text-base text-gray-700 font-semibold">{acc.side}</p>
              <span className="text-gray-400">{expandedSides[acc.side] ? '▲' : '▼'}</span>
            </button>

            {/* 펼쳐진 내용 */}
            {expandedSides[acc.side] && (
              <div className="space-y-2 mt-2">
                {acc.people.map((person, j) => (
                  <div key={j} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 font-normal mb-1">{person.name}</p>
                        <p className="text-base text-gray-800 font-normal">{person.bank} {person.number}</p>
                      </div>
                      <CopyButton text={person.number} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
