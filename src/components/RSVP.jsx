import React, { useState } from 'react'

export default function RSVP(){
  const [name, setName] = useState('')
  const [attend, setAttend] = useState('yes')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    const body = `RSVP 응답\n\n이름: ${name}\n참석 여부: ${attend === 'yes' ? '참석' : '불참'}`
    window.location.href = `mailto:your-email@example.com?subject=결혼식 RSVP&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

  return (
    <section>
      <h2 className="section-title">RSVP</h2>
      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">이름</label>
          <input 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            placeholder="이름을 입력해주세요" 
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400" 
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-3">참석 여부</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="attend" 
                value="yes"
                checked={attend==='yes'} 
                onChange={()=>setAttend('yes')}
                className="w-4 h-4 accent-amber-500"
              /> 
              <span className="text-sm">참석할게요 🎉</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="attend"
                value="no"
                checked={attend==='no'} 
                onChange={()=>setAttend('no')}
                className="w-4 h-4 accent-amber-500"
              /> 
              <span className="text-sm">불참입니다</span>
            </label>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          ✉️ 전송하기
        </button>

        {submitted && (
          <p className="text-center text-sm text-green-600 font-medium">
            감사합니다!
          </p>
        )}
      </form>
    </section>
  )
}