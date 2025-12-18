import React from 'react'
import { DATA } from '../data'

export default function Footer(){
  return (
    <footer className="mt-8 py-8 text-center text-xs text-gray-500 border-t border-gray-200 space-y-2">
      <p className="font-medium">{DATA.couple.groom} & {DATA.couple.bride}</p>
      <p className="text-gray-400">{new Date(DATA.datetime).toLocaleDateString('ko-KR')}</p>
      <p className="text-gray-400">Thank you for celebrating with us! 💕</p>
    </footer>
  )
}