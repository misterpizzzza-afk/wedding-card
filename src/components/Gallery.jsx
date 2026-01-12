import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { DATA } from '../data'

export default function Gallery() {
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [imageLoaded, setImageLoaded] = useState({})
  const galleryRef = useRef(null)
  const thumbnailRefs = useRef({})
  const thumbnailContainerRef = useRef(null)

  const itemsPerPage = 9
  const displayedImages = expanded ? DATA.gallery : DATA.gallery.slice(0, itemsPerPage)
  const hasMore = DATA.gallery.length > itemsPerPage

  const handleToggleExpanded = () => {
    if (expanded) {
      // 접기 버튼을 눌렀을 때 갤러리 상단으로 스크롤
      galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  // 모달 열릴 때 body 스크롤 방지
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  // 썸네일 중앙 스크롤
  React.useEffect(() => {
    if (open && thumbnailRefs.current[currentIndex]) {
      const container = thumbnailContainerRef.current
      const thumbnail = thumbnailRefs.current[currentIndex]
      if (container && thumbnail) {
        const containerWidth = container.clientWidth
        const thumbnailLeft = thumbnail.offsetLeft
        const thumbnailWidth = thumbnail.clientWidth
        const scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2)
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
  }, [currentIndex, open])

  return (
    <section ref={galleryRef}>
      <h2 className="section-title">갤러리</h2>
      
      {/* 갤러리 그리드 */}
      <div 
        className={`grid grid-cols-3 gap-2 overflow-hidden`}
        style={{
          maxHeight: expanded ? '2000px' : `${Math.ceil(itemsPerPage / 3) * 140}px`,
        }}
      >
        {displayedImages.map((src, i) => (
          <div 
            key={i} 
            className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => {
              setCurrentIndex(DATA.gallery.indexOf(src))
              setOpen(true)
            }}
          >
            {!imageLoaded[i] && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
            <img 
              src={src} 
              alt={`gallery-${i}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setImageLoaded(prev => ({...prev, [i]: true}))}
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

      {/* 이미지 상세보기 모달 - Portal로 렌더링 */}
      {open && ReactDOM.createPortal(
        <div 
          className="fixed inset-0 bg-white/95 backdrop-blur-lg flex flex-col"
          style={{ zIndex: 9999 }}
          onClick={(e) => {
            e.stopPropagation()
            setOpen(false)
          }}
        >
          {/* 이미지 카운터 */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-gray-200 px-3 py-1 rounded text-sm pointer-events-none z-50">
            {currentIndex + 1} / {DATA.gallery.length}
          </div>

          {/* 닫기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
            className="absolute top-4 right-4 bg-black/50 text-gray-200 hover:bg-black/70 text-xl z-10 w-8 h-8 flex items-center justify-center rounded-full"
            style={{ lineHeight: '1' }}
          >
            <span style={{ transform: 'translateY(-1px)' }}>✕</span>
          </button>

          <div 
            className="flex-1 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 이미지 슬라이드 컨테이너 */}
            <div 
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * 100}vw)`
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {DATA.gallery.map((src, i) => (
                <div 
                  key={i} 
                  className="h-full flex items-center justify-center flex-shrink-0"
                  style={{ width: '100vw' }}
                >
                  <img 
                    src={src} 
                    alt={`detail-${i}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* 좌측 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex((prev) => (prev - 1 + DATA.gallery.length) % DATA.gallery.length)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-gray-200 p-1.5 rounded-full transition-all text-2xl flex items-center justify-center leading-none"
            >
              <span style={{ position: 'relative', top: '-3px' }}>‹</span>
            </button>

            {/* 우측 버튼 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentIndex((prev) => (prev + 1) % DATA.gallery.length)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-gray-200 p-1.5 rounded-full transition-all text-2xl flex items-center justify-center leading-none"
            >
              <span style={{ position: 'relative', top: '-3px' }}>›</span>
            </button>
          </div>

          {/* 썸네일 리스트 */}
          <div className="w-full bg-black/70 backdrop-blur-sm" style={{ height: '72px', display: 'flex', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div className="overflow-x-auto overflow-y-hidden w-full" ref={thumbnailContainerRef}>
              <div className="flex gap-1 justify-start px-4 min-w-max" style={{ maxWidth: 'fit-content' }}>
                {DATA.gallery.map((src, i) => (
                  <button
                    key={i}
                    ref={(el) => {
                      if (el) thumbnailRefs.current[i] = el
                    }}
                    onClick={() => setCurrentIndex(i)}
                    className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all ${
                      currentIndex === i 
                        ? 'ring-3 ring-white scale-110 opacity-100' 
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img 
                      src={src} 
                      alt={`thumbnail-${i}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}
