import React from 'react'
import { DATA } from '../data'

export default function Location() {
  const { venue } = DATA

  return (
    <section className="px-6">
      <h2 className="section-title">오시는 길</h2>
      
      {/* 위치 정보 */}
      <div className="text-center mb-6">
        <p className="text-lg text-gray-800 mb-2">{venue.name}</p>
        <p className="text-base text-gray-700 font-semibold">{venue.address}</p>
      </div>

      {/* 지도 */}
      <div className="w-full mb-6 flex justify-center">
        <div dangerouslySetInnerHTML={{__html: `
          <div style="font:normal normal 400 12px/normal dotum, sans-serif; width:360px; height:220px; color:#333; position:relative"><div style="height: 190px;"><a href="https://map.kakao.com/?urlX=477625.9999999997&urlY=1118679.9999999988&itemId=871883439&q=%EB%8D%94%EC%BB%A8%EB%B2%A4%EC%85%98%20%EC%98%81%EB%93%B1%ED%8F%AC%EC%A0%90&srcid=871883439&map_type=TYPE_MAP&from=roughmap" target="_blank"><img class="map" src="http://t1.daumcdn.net/roughmap/imgmap/15f59473580155b9ecd2d66b15c1b2e17dcf4346db699391829ed7b386e4dff5" width="358px" height="188px" style="border:1px solid #ccc;"></a></div><div style="overflow: hidden; padding: 7px 11px; border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 0px 0px 2px 2px; background-color: rgb(249, 249, 249);"><a href="https://map.kakao.com" target="_blank" style="float: left;"><img src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png" width="72" height="16" alt="카카오맵" style="display:block;width:72px;height:16px"></a><div style="float: right; position: relative; top: 1px; font-size: 11px;"><a target="_blank" href="https://map.kakao.com/?from=roughmap&srcid=871883439&confirmid=871883439&q=%EB%8D%94%EC%BB%A8%EB%B2%A4%EC%85%98%20%EC%98%81%EB%93%B1%ED%8F%AC%EC%A0%90&rv=on" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">로드뷰</a><span style="width: 1px;padding: 0;margin: 0 8px 0 9px;height: 11px;vertical-align: top;position: relative;top: 2px;border-left: 1px solid #d0d0d0;float: left;"></span><a target="_blank" href="https://map.kakao.com/?from=roughmap&eName=%EB%8D%94%EC%BB%A8%EB%B2%A4%EC%85%98%20%EC%98%81%EB%93%B1%ED%8F%AC%EC%A0%90&eX=477625.9999999997&eY=1118679.9999999988" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">길찾기</a><span style="width: 1px;padding: 0;margin: 0 8px 0 9px;height: 11px;vertical-align: top;position: relative;top: 2px;border-left: 1px solid #d0d0d0;float: left;"></span><a target="_blank" href="https://map.kakao.com?map_type=TYPE_MAP&from=roughmap&srcid=871883439&itemId=871883439&q=%EB%8D%94%EC%BB%A8%EB%B2%A4%EC%85%98%20%EC%98%81%EB%93%B1%ED%8F%AC%EC%A0%90&urlX=477625.9999999997&urlY=1118679.9999999988" style="float:left;height:15px;padding-top:1px;line-height:15px;color:#000;text-decoration: none;">지도 크게 보기</a></div></div><div><span style="border-bottom:0px none #333333;position:absolute;left:-24.988426208496094px;top:-135.97222900390625px;width:0px;height:40px"></span></div></div>
        `}} />
      </div>

      {/* 내비게이션 버튼 */}
      <div className="flex gap-2 justify-center mb-6">
        <a className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-full hover:border-gray-400 transition-all font-normal" href="https://map.naver.com/index.nhn?query=더컨벤션 영등포" target="_blank" rel="noreferrer">
          <img src="/src/assets/logo/naver-map.webp" alt="네이버 지도" className="w-4 h-4" />
          네이버
        </a>
        <a className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-full hover:border-gray-400 transition-all font-normal" href="https://map.kakao.com/link/search/더컨벤션 영등포" target="_blank" rel="noreferrer">
          <img src="/src/assets/logo/kakao-map.png" alt="카카오맵" className="w-4 h-4" />
          카카오
        </a>
        <a className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-full hover:border-gray-400 transition-all font-normal" href="https://tmap.life/app/route/viapoint?name=더컨벤션 영등포" target="_blank" rel="noreferrer">
          <img src="/src/assets/logo/tmap.svg" alt="티맵" className="w-4 h-4" />
          티맵
        </a>
      </div>

      {/* 자가용 정보 */}
      <div className="mb-6 text-base text-gray-700 font-normal leading-relaxed">
        <p className="font-semibold mb-3 text-base">자가용</p>
        <p className="text-sm font-semibold mb-2">{venue.address}</p>
        <p className="text-sm font-normal mb-3">네비게이션 검색: <span className="font-normal">[더컨벤션 영등포]</span></p>
        <p className="text-sm text-gray-600 mb-2">최대 400대 수용 가능, 2시간 무료주차</p>
        <p className="text-sm text-gray-500">*대중교통 이용을 권장드립니다.</p>
      </div>

      {/* 지하철 정보 */}
      <div className="text-base text-gray-700 font-normal leading-relaxed">
        <p className="font-semibold mb-4 text-base">지하철</p>
        
        <div className="mb-3">
          <p className="text-sm font-normal mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2 align-middle"></span>2호선 
            <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-2 align-middle ml-2"></span>5호선
          </p>
          <p className="text-sm font-normal">영등포구청역 4번 출구 앞</p>
        </div>
      </div>
    </section>
  )
}
