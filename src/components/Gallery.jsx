import React, { useState, useRef } from 'react'
import { DATA } from '../data'

export default function Gallery() {
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const galleryRef = useRef(null)

  const itemsPerPage = 9
  const displayedImages = expanded ? DATA.gallery : DATA.gallery.slice(0, itemsPerPage)
  const hasMore = DATA.gallery.length > itemsPerPage

  const handleToggleExpanded = () => {
    if (expanded) {
      // 접기 버튼을 눌렀을 때 갤러리 상단으로 스크롤
      setTimeout(() => {
        galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 0)
    }
    setExpanded(!expanded)
  }

  // 터치 드래그 처리
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX)
    handleSwipe()
  }

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      // 왼쪽으로 스와이프 (다음 이미지)
      setCurrentIndex((prev) => (prev + 1) % DATA.gallery.length)
    }
    if (touchEnd - touchStart > 50) {
      // 오른쪽으로 스와이프 (이전 이미지)
      setCurrentIndex((prev) => (prev - 1 + DATA.gallery.length) % DATA.gallery.length)
    }
  }

  // 키보드 화살표 처리
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + DATA.gallery.length) % DATA.gallery.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % DATA.gallery.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <section ref={galleryRef}>
      <h2 className="section-title">갤러리</h2>
      
      {/* 갤러리 그리드 */}
      <div className="grid grid-cols-3 gap-2">
        {displayedImages.map((src, i) => (
          <div 
            key={i} 
            className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => {
              setCurrentIndex(DATA.gallery.indexOf(src))
              setOpen(true)
            }}
          >
            <img 
              src={src} 
              alt={`gallery-${i}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
          </div>
        ))}
      </div>

      {/* 더보기/접기 버튼 */}
      {hasMore && (
        <button
          onClick={handleToggleExpanded}
          className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-light transition-colors border-t border-gray-200 pt-4"
        >
          {expanded ? '접기 ▲' : '더보기 ▼'}
        </button>
      )}

      {/* 이미지 상세보기 모달 */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 이미지 */}
            <img 
              src={DATA.gallery[currentIndex]} 
              alt="detail" 
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {/* 좌측 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex((prev) => (prev - 1 + DATA.gallery.length) % DATA.gallery.length)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all text-2xl"
            >
              ‹
            </button>

            {/* 우측 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex((prev) => (prev + 1) % DATA.gallery.length)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition-all text-2xl"
            >
              ›
            </button>

            {/* 이미지 카운터 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-xs">
              {currentIndex + 1} / {DATA.gallery.length}
            </div>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
