# ⚽ 노스웨스트 사람들 (NOWESA) 공식 웹사이트 & AI 고객상담 RAG 챗봇

영국 프리미어리그 북서부 축구 유튜브 채널 **‘노스웨스트 사람들 (NOWESA)’**의 공식 랜딩페이지, 팬 커뮤니티, 카드뉴스 스튜디오 및 **Gemini 기반 RAG 고객상담 챗봇** 프로젝트입니다.

## 📁 폴더 구조
- `index.html`: 메인 랜딩페이지 + 익명 팬 스탠드 + 협업 문의 + 카드뉴스 스튜디오 + **고객상담 RAG 챗봇** 통합 웹앱
- `api/chat.js`: Vercel Serverless Function 기반 RAG 검색 및 Gemini API 호출 엔드포인트 (`POST /api/chat`)
- `vercel.json`: Vercel 서버리스 함수 및 정적 호스팅 설정
- `.env.example`: Vercel 환경 변수 설정 예시

## ⚙️ Vercel 환경 변수 설정 방법 (필수)
1. [Vercel 대시보드](https://vercel.com)에서 프로젝트 선택 → 상단 **Settings** 클릭
2. 왼쪽 메뉴에서 **Environment Variables** 클릭
3. 아래 2개의 환경 변수를 추가하고 **Save**를 누릅니다:
   - `GEMINI_API_KEY` : 발급받은 Google Gemini API 키 입력
   - `GEMINI_MODEL` : `gemini-3.5-flash-lite` 입력
4. 상단 **Deployments** 탭에서 최신 배포 우측 `•••` → **Redeploy**를 누르면 환경 변수가 즉시 반영됩니다.
