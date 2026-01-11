import React from 'react'
import { DATA } from '../data'

export default function Invitation() {
  return (
    <section className="px-8 py-8 text-center space-y-6 max-w-sm mx-auto">
      <div className="space-y-4">
        <p className="text-base leading-relaxed text-gray-700 font-normal">
          두 마음이 하나 되는 날,<br/>
          가장 소중한 분들과 함께 하고 싶습니다.<br/>
          새로운 시작의 자리에<br/>
          귀한 걸음으로 함께 하시어<br/>
          축복해 주시면 감사하겠습니다.
        </p>
        <p className="text-base text-gray-700 font-normal pt-2">
          신랑 {DATA.couple.groom} · 신부 {DATA.couple.bride}
        </p>
      </div>
    </section>
  )
}
