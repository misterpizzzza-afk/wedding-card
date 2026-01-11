import DSC00055 from './assets/gallery/DSC00055.png'
import DSC00368 from './assets/gallery/DSC00368.png'
import DSC00672 from './assets/gallery/DSC00672.png'
import DSC00787 from './assets/gallery/DSC00787.png'
import DSC00930 from './assets/gallery/DSC00930.png'
import DSC00976 from './assets/gallery/DSC00976.png'
import DSC01020 from './assets/gallery/DSC01020.png'
import DSC01417 from './assets/gallery/DSC01417.png'
import DSC01480 from './assets/gallery/DSC01480.png'
import DSC01483 from './assets/gallery/DSC01483.png'
import DSC01589 from './assets/gallery/DSC01589.png'
import DSC01647 from './assets/gallery/DSC01647.png'
import DSC01743 from './assets/gallery/DSC01743.png'
import DSC01770 from './assets/gallery/DSC01770.png'
import DSC02160 from './assets/gallery/DSC02160.png'
import DSC02356 from './assets/gallery/DSC02356.png'
import KakaoTalk1 from './assets/gallery/KakaoTalk_20260112_021759145.jpg'
import KakaoTalk2 from './assets/gallery/KakaoTalk_20260112_021759145_01.jpg'
import KakaoTalk3 from './assets/gallery/KakaoTalk_20260112_021759145_02.jpg'

// Customize these values (names, date, venue, accounts, images)
export const DATA = {
  couple: {
    groom: '김동우',
    bride: '신소연'
  },
  datetime: '2026-05-10T11:20:00', // ISO format (local time)
  venue: {
    name: '더컨벤션 영등포 1층 그랜드볼룸홀',
    address: '서울 영등포구 국회대로38길 2',
    query: '더컨벤션 영등포'
  },
  gallery: [
    // 19개 전체
    DSC00055,
    DSC00368,
    DSC00672,
    DSC00787,
    DSC00930,
    DSC00976,
    DSC01020,
    DSC01417,
    DSC01480,
    DSC01483,
    DSC01589,
    DSC01647,
    DSC01743,
    DSC01770,
    DSC02160,
    DSC02356,
    KakaoTalk1,
    KakaoTalk2,
    KakaoTalk3,
    // 처음 11개 반복
    DSC00055,
    DSC00368,
    DSC00672,
    DSC00787,
    DSC00930,
    DSC00976,
    DSC01020,
    DSC01417,
    DSC01480,
    DSC01483,
    DSC01589
  ],
  accounts: [
    { 
      side: '신랑측',
      people: [
        { name: '김동우', desc: '신랑', bank: '국민은행', number: '123-456-7890' },
        { name: '김시영', desc: '신랑 아버지', bank: '국민은행', number: '123-456-7892' },
        { name: '안명심', desc: '신랑 어머니', bank: '국민은행', number: '123-456-7891' }
      ]
    },
    { 
      side: '신부측',
      people: [
        { name: '신소연', desc: '신부', bank: '토스뱅크', number: '987-654-3210' },
        { name: '신영식', desc: '신부 아버지', bank: '신한은행', number: '987-654-3212' },
        { name: '안혜경', desc: '신부 어머니', bank: '신한은행', number: '987-654-3211' }
      ]
    }
  ],
  bus: {
    info: '전세버스 운행: 승차장 A (09:00 출발). 문의: 010-1234-5678'
  }
}
