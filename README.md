# 모바일 청첩장 (Vite + React + Tailwind) 🚀

이 프로젝트는 모바일에 최적화된 청첩장 템플릿입니다. 빠르게 수정하고 배포할 수 있도록 기본 기능(히어로, 디데이, 갤러리, 오시는 길, 계좌 복사 등)이 포함되어 있습니다.

---

## 1) 요구 사항 ✅
- Node.js 18 이상 권장 (https://nodejs.org 에서 설치)
- npm (Node 설치 시 포함) 또는 yarn/pnpm
- (선택) Git — 원격 저장소에 푸시하려면 필요합니다

> Git이 설치되지 않은 경우: Windows에서 Git을 설치한 뒤 명령 프롬프트나 PowerShell에서 `git` 명령을 사용할 수 있도록 설정하세요.

---

## 2) 빠른 시작 (로컬 개발) 🧑‍💻
1. 저장소를 복제하거나 이 폴더로 이동
2. 의존성 설치

```bash
npm install
```

3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 (Vite 기본 포트)로 열어 확인하세요.

---

## 3) 빌드 & 미리보기 📦
- 배포용 빌드

```bash
npm run build
```

- 빌드 결과를 로컬에서 확인

```bash
npm run preview
```

빌드 결과물은 `dist/` 폴더에 생성됩니다.

---

## 4) 주요 수정 위치 🔧
- 콘텐츠(이름/날짜/장소/계좌/버스 정보/갤러리): `src/data.js`
- 이미지(플레이스홀더): `src/assets/` — 실제 사진으로 교체하세요
- 컴포넌트: `src/components/` (Hero, Invitation, Gallery, Location, Account, RSVP 등)
- 캘린더(.ics) 생성 유틸: `src/utils/ics.js`

팁: 텍스트/이미지를 교체한 뒤 `npm run build`로 결과를 확인하세요.

---

## 5) GitHub & Git 사용법 (간단) 🌱
로컬에서 git을 사용해 GitHub에 푸시하는 기본 순서:

```bash
# 최초 초기화 (필요한 경우)
git init
git add .
git commit -m "Initial commit"
# GitHub에서 리포지토리 생성 후
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

> 참고: 현재 환경에서 `git` 명령이 없다는 오류가 발생할 수 있습니다. 그 경우 Git을 설치한 뒤 위 명령을 실행하세요.

---

## 6) 배포 권장: Vercel (가장 쉬움) ☁️
1. GitHub에 저장소를 푸시
2. Vercel에 로그인 → "New Project" → GitHub 리포지토리 선택
3. 빌드 명령: `npm run build`, 출력 디렉토리: `dist` (Vite는 자동으로 인식되는 경우가 많음)
4. 배포 완료 후, Vercel에서 제공하는 도메인으로 접속 확인

### 커스텀 도메인 연결 (Cloudflare 권장)
- 도메인 구매 후 Cloudflare에 등록
- Vercel의 도메인 설정 페이지에서 제공하는 DNS 레코드(또는 CNAME)를 Cloudflare DNS에 추가
- Cloudflare의 네임서버를 도메인 공급자(가비아/후이즈 등)에 적용

(도움 필요 시 제가 DNS 레코드 값 복사 → Cloudflare에 등록까지 도와드릴게요.)

---

## 7) 대안 배포: GitHub Pages (정적 사이트) 🌐
정적 사이트로 단순히 배포하려면 `dist`를 `gh-pages` 브랜치로 올리는 방법을 쓸 수 있습니다.
간단 방법 (예: `gh-pages` 패키지 사용):

```bash
npm install --save-dev gh-pages
# package.json에 "deploy" 스크립트 추가: "gh-pages -d dist"
npm run build
npm run deploy
```

GitHub Pages는 HTTPS/커스텀 도메인 설정이 가능하지만, Vercel이 더 자동화되어 편리합니다.

---

## 8) 커스텀 (체크리스트) ✅
- [ ] `src/data.js`의 날짜/이름/장소/계좌를 실제 정보로 수정
- [ ] `src/assets/`의 플레이스홀더 이미지를 교체
- [ ] RSVP 폼을 활성화하려면 `src/components/RSVP.jsx` 로직 확인 및 연동(메일 또는 Google Forms)
- [ ] Lighthouse(브라우저 도구)로 모바일 성능/접근성 검사 권장

---

## 9) 문제 해결 팁 ⚠️
- `npm run dev`에서 에러 발생 시: 의존성 설치(`npm install`) 후 캐시 정리(`rm -rf node_modules && npm install`)를 시도
- Git 관련 명령이 작동하지 않으면 Git이 설치되어 있는지 확인
- 배포 후 리소스(이미지)가 보이지 않으면 경로(`/src/assets/...`)를 상대 경로(`/assets/...`)로 수정 필요

---

원하시면 **제가 GitHub 리포지토리 생성 → Vercel 자동배포 → 커스텀 도메인(Cloudflare DNS) 연결**까지 대신 설정해 드릴 수 있습니다. 진행을 원하시면 GitHub 계정 연결 권한(또는 리포지토리 권한)과 사용할 도메인 이름을 알려주세요. ✨
