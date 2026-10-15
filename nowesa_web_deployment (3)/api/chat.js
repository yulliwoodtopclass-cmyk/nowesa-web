/**
 * NOWESA (노스웨스트 사람들) 고객 상담 RAG 챗봇 - Vercel Serverless Function
 * Endpoint: POST /api/chat
 *
 * Vercel 환경 변수 (Environment Variables):
 * - GEMINI_API_KEY : Google AI Studio에서 발급받은 Gemini API 키
 * - GEMINI_MODEL   : 사용할 Gemini 모델명 (기본값: gemini-3.5-flash-lite)
 */

const RAG_KNOWLEDGE_BASE = [
  {
    id: "NOWESA-01",
    docTitle: "노스웨스트 사람들 (NOWESA) 브리핑 보고서",
    section: "Executive Summary & 채널 핵심 지표",
    url: "https://youtube.com/channel/UCq9_Daq3YznD-JQUfETIa0w?si=Iff0gPz6uiPUm-cU",
    keywords: ["구독자", "조회수", "충성도", "완시청률", "지표", "업로드", "시간", "화요일", "금요일", "개요", "노스웨스트", "nowesa", "소개", "타깃", "2040"],
    content: `'노스웨스트 사람들(NOWESA)'은 잉글랜드 축구의 중심지인 노스웨스트 지역 연고 구단들(맨체스터 유나이티드, 리버풀, 에버튼, 맨체스터 시티 등)을 주요 주제로 다루는 전문 축구 유튜브 채널 및 팬 커뮤니티 플랫폼이다.
- 유튜브 구독자 수: 184,000명 이상 (18.4만+)
- 누적 조회수: 4,200만 회 이상
- 시청자 완시청률(충성도): 93.8%
- 정규 업로드 주기: 매주 화요일 · 금요일 19:00 (오후 7시)
- 주요 타깃 시청자층: 축구 및 스포츠 라이프스타일에 열광하는 2040 남녀
- 공식 유튜브: https://youtube.com/channel/UCq9_Daq3YznD-JQUfETIa0w?si=Iff0gPz6uiPUm-cU
- 공식 인스타그램: @nowesa.official (https://instagram.com/nowesa.official)`
  },
  {
    id: "NOWESA-02",
    docTitle: "노스웨스트 사람들 (NOWESA) 브리핑 보고서",
    section: "오리지널 콘텐츠 시리즈 (Original Series)",
    url: "https://youtube.com/channel/UCq9_Daq3YznD-JQUfETIa0w?si=Iff0gPz6uiPUm-cU",
    keywords: ["오리지널", "시리즈", "코너", "콘텐츠", "설전", "banter", "현미경", "전술", "tactics", "직관", "르포", "스카우트", "레이더", "이적시장", "화요일"],
    content: `NOWESA는 각기 다른 기획 의도를 가진 4개의 대표 오리지널 코너를 보유하고 있다.
1. 노스웨스트 설전 (Banter): 매주 화요일 업로드. 맨유 팬(붉은 악마)과 리버풀 팬(콥) 등 라이벌 구단 팬들이 참여하는 매치데이 토론 코너. 논리와 위트를 바탕으로 한 사이다 라이벌 팬 배틀 형태.
2. 피치 위 현미경 (Tactics): 경기 직후 심층분석 업로드. 게겐프레싱, 하프스페이스 공략, 5분 전환 플레이 등 승부를 가른 핵심 전술 요소를 전문적으로 해부하는 프로 수준의 전술 분석 콘텐츠.
3. 어웨이 & 홈 직관 르포: 월 1~2회 특별기획 업로드. 안필드 KOP석, 올드 트래퍼드 스트렛포드 엔드 현지 직관 및 영국 현지 펍(Pub) 팬들의 반응을 담은 현장 브이로그.
4. 이적시장 스카우트 레이더: 이적시장 시즌 특별편 업로드. 단순 루머를 배제하고 오피셜급 공신력을 갖춘 정보만 선별하여 노스웨스트 연고 구단들의 타깃 영입 효과 및 재정을 분석.`
  },
  {
    id: "NOWESA-03",
    docTitle: "노스웨스트 사람들 (NOWESA) 브리핑 보고서",
    section: "최근 화제의 주요 콘텐츠 TOP 3",
    url: "https://youtube.com/channel/UCq9_Daq3YznD-JQUfETIa0w?si=Iff0gPz6uiPUm-cU",
    keywords: ["최근", "화제", "인기", "영상", "콘텐츠", "러닝타임", "조회수", "우리가 무너진 이유", "펩", "슬롯", "머지사이드", "구디슨 파크", "에버튼"],
    content: `최근 채널에 게시되어 높은 조회수를 기록한 대표 영상 현황:
1. [노스웨스트 더비 특집] “우리가 무너진 이유” 맨유 팬과 리버풀 팬이 경기 끝나고 맥주 한잔 마시며 나눈 솔직 토크
   - 러닝타임: 21분 45초 / 조회수: 54만 회 (게시 2일 전 기준)
2. [전술 심층분석] 펩 vs 슬롯, 3미들 빌드업 전환 패턴 완벽 분석! 현대 축구의 최정점 전술 대결
   - 러닝타임: 15분 10초 / 조회수: 38만 회 (게시 5일 전 기준)
3. [현지 직관기] ‘머지사이드 더비’ 킥오프 3시간 전 구디슨 파크 현장 열기! 에버튼 팬들의 심정은?
   - 러닝타임: 18분 32초 / 조회수: 29만 회 (게시 1주일 전 기준)`
  },
  {
    id: "NOWESA-04",
    docTitle: "노스웨스트 사람들 (NOWESA) 브리핑 보고서",
    section: "팬 커뮤니티 플랫폼: 노스웨스트 팬 스탠드",
    url: "#community",
    keywords: ["커뮤니티", "팬 스탠드", "익명", "엠블럼", "배지", "구단", "응원", "댓글", "좋아요", "싫어요", "투표", "에버튼", "리버풀", "맨유", "맨시티"],
    content: `NOWESA는 유튜브 채널과 연동된 웹 기반 익명 커뮤니티 '노스웨스트 팬 스탠드'를 운영하고 있다.
- 엠블럼 자동 부착 시스템: 이용자가 자신의 응원 구단(에버튼 FC, 리버풀 FC, 맨체스터 유나이티드, 맨체스터 시티, 아스날, 첼시, 토트넘, 중립 등)을 선택하면 글과 댓글 작성 시 해당 구단 엠블럼이 자동으로 부착된다.
- 익명성 보장 및 인터랙션: 축구 팬들이 구단 정체성을 드러내며 자유롭게 익명으로 게시물을 작성하고 댓글, 좋아요/싫어요 투표를 할 수 있는 팬 라운지 공간을 제공한다.
- 부가 도구: 축구 소식, 단관 모집, 직관 투어 공지를 제작해 고화질 PNG로 다운로드할 수 있는 'NOWESA 카드뉴스 스튜디오'를 함께 제공한다.`
  },
  {
    id: "NOWESA-05",
    docTitle: "노스웨스트 사람들 (NOWESA) 브리핑 보고서",
    section: "비즈니스 협업 및 파트너십 안내",
    url: "#sponsor",
    keywords: ["광고", "협업", "제휴", "스폰서", "파트너십", "비즈니스", "브랜디드", "ppl", "이메일", "문의", "연락처", "단관", "프로모션", "스포츠웨어", "음료", "게임", "it"],
    content: `NOWESA는 단순 PPL 방식을 넘어 축구 맥락에 자연스럽게 녹아드는 스토리텔링형 브랜디드 콘텐츠를 제작한다.
- 맞춤형 코너 기획: 축구 콘텐츠 흐름 내에서 브랜드 강점을 자연스럽게 어필하는 고몰입 콘텐츠 제작.
- 최적화 카테고리: 실제 시청층(2040 남녀)의 높은 소비 성향과 연결되는 스포츠웨어, 음료, IT기기, 게임 분야에서 높은 전환율 제공.
- Multi-Channel 프로모션: 유튜브 영상 제작뿐 아니라 웹 커뮤니티 및 라이브 방송과 연계한 종합 이벤트 및 프로모션 지원.
- 제휴 문의 창구: 실시간 이메일 문의 nowesa.official@gmail.com (웹사이트 내 폼 제출 시 총괄 담당자 메일함으로 즉시 전달되며, 회사소개서 및 기획안 PDF 등은 공식 이메일로 직접 접수 가능. 24시간 이내 회신)`
  },
  {
    id: "GDOC-LIMO-01",
    docTitle: "참고 문서: 팀 리모(Team Limo) 웹사이트 개발 안내서",
    section: "1. 프로젝트 개요 & 2. 디자인/UI 가이드라인",
    url: "https://docs.google.com/document/d/1PjA1XqttTm7yjID3YokVIGxAnIz9M72EjJWrVR4tm9o/edit?usp=sharing",
    keywords: ["팀 리모", "team limo", "remoteam", "주황색", "orange", "img_1227", "히어로", "포트폴리오", "팀원 소개", "디자인"],
    content: `[참고 문서: 팀 리모(Team Limo) 웹사이트 개발 안내서]
- 프로젝트명: 팀 리모 공식 홈페이지 및 내부 커뮤니티 플랫폼 구축 (공식 도메인: remoteam.com)
- 목표: 팀의 작업물을 알리는 외부 포트폴리오 기능과 로그인한 팀원들끼리 소통할 수 있는 내부 채팅 기능을 통합한 웹 애플리케이션 개발.
- 메인 테마(Key Color): 주황색(Orange) - 버튼, 강조 텍스트, 로고 등에 활력과 창의성을 상징하는 주황색 배치.
- 메인 페이지(Hero Section): IMG_1227.jpg 이미지를 풀스크린 배경으로 사용하고 어두운 톤/주황색 오버레이 필터 적용 후 중앙에 슬로건 배치.
- 팀원 소개(About Us): 각 멤버별 프로필 카드 형태(담당 역할, 주요 스킬셋, 간단한 인사말 포함).`
  },
  {
    id: "GDOC-LIMO-02",
    docTitle: "참고 문서: 팀 리모(Team Limo) 웹사이트 개발 안내서",
    section: "3. 시스템 아키텍처 및 기술 스택 & 4~5. 기능/운영",
    url: "https://docs.google.com/document/d/1PjA1XqttTm7yjID3YokVIGxAnIz9M72EjJWrVR4tm9o/edit?usp=sharing",
    keywords: ["아키텍처", "기술 스택", "버셀", "vercel", "네온", "neon", "postgresql", "blob", "스토리지", "데이터베이스", "채팅", "로그인", "jwt", "유지보수", "모니터링"],
    content: `[클라우드 서버리스 시스템 아키텍처 및 핵심 기능]
- 호스팅 및 배포(Hosting): Vercel - 프론트엔드 배포 및 CI/CD 자동화, 글로벌 엣지 네트워크를 통한 빠른 로딩 속도 확보.
- 데이터베이스(DB): Neon (Vercel Integration) - Serverless PostgreSQL 활용. 회원 가입 정보, 유저 암호화 데이터, 실시간 채팅 텍스트 내역, 게시판 데이터 저장.
- 파일 스토리지(Storage): Vercel Blob - 팀원 프로필 사진, 포트폴리오 이미지, 채팅방 첨부 파일 등 대용량 비정형 데이터 업로드 및 서빙.
- 퍼블릭 영역: 랜딩 페이지, 포트폴리오 갤러리, 팀원 소개.
- 프라이빗 영역(회원 전용): 이메일/비밀번호 기반 회원가입 및 로그인(JWT 또는 세션), 로그인 유저 전용 실시간 팀 채팅(Team Chat - Neon DB + 웹소켓/폴링).
- 운영 및 유지보수: 월간 프로젝트 공유회 시연 및 피드백 수렴, Vercel 대시보드를 통한 트래픽 및 에러 로그 중앙 모니터링.`
  }
];

function retrieveTopChunks(query, topK = 3) {
  const q = (query || "").toLowerCase();
  const tokens = q.split(/[\s,?.!]+/).filter(t => t.length >= 2);

  const scored = RAG_KNOWLEDGE_BASE.map(chunk => {
    let score = 0;
    const hay = (chunk.docTitle + " " + chunk.section + " " + chunk.content + " " + chunk.keywords.join(" ")).toLowerCase();

    for (const kw of chunk.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += 5;
      }
    }
    for (const tok of tokens) {
      if (hay.includes(tok)) {
        score += 2;
      }
    }
    // Boost NOWESA chunks by default for general inquiries
    if (chunk.id.startsWith("NOWESA")) {
      score += 1;
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map(item => ({
    id: item.chunk.id,
    docTitle: item.chunk.docTitle,
    section: item.chunk.section,
    url: item.chunk.url,
    score: item.score,
    content: item.chunk.content
  }));
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Health / Config Check (GET /api/chat)
  const envModel = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const hasApiKey = Boolean(process.env.GEMINI_API_KEY);

  if (req.method === "GET") {
    return res.status(200).json({
      status: "ok",
      model: envModel,
      apiKeyConfigured: hasApiKey,
      documentsCount: 2,
      chunksCount: RAG_KNOWLEDGE_BASE.length
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message, history = [] } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "질문 내용(message)을 입력해 주세요." });
    }

    // 1. RAG Retrieval
    const retrievedChunks = retrieveTopChunks(message, 3);
    const contextText = retrievedChunks
      .map((c, idx) => `[문서 ${idx + 1}: ${c.docTitle} - ${c.section}]\n${c.content}`)
      .join("\n\n");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: "Vercel 환경 변수 GEMINI_API_KEY가 아직 설정되지 않았습니다.",
        model: envModel,
        sources: retrievedChunks
      });
    }

    const systemInstruction = `당신은 축구 유튜브 채널 및 팬 커뮤니티 플랫폼 '노스웨스트 사람들 (NOWESA)'의 공식 AI 고객상담 챗봇입니다.
아래 [참고 문서 컨텍스트 (RAG)]에 제공된 사실과 수치만을 근거로 친절하고 정확하게 답변하세요.
- 구독자 수(184,000명+), 누적 조회수(4,200만 회+), 완시청률(93.8%), 정규 업로드 일정(매주 화·금 19:00), 오리지널 코너 4종, 최근 인기 영상, 광고/제휴 이메일(nowesa.official@gmail.com), 그리고 팀 리모(Team Limo) 개발 안내서(Vercel, Neon DB, Vercel Blob 아키텍처 등)에 대한 질문에 문서 기반으로 상세히 답변하세요.
- 답변은 읽기 쉽게 핵심 불릿 포인트와 함께 한국어로 작성하세요.

[참고 문서 컨텍스트 (RAG)]
${contextText}`;

    const contents = [];
    for (const h of history.slice(-6)) {
      contents.push({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: String(h.text || "") }]
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Try primary configured model (default: gemini-3.5-flash-lite), with automatic fallback if endpoint returns 404
    const candidateModels = [envModel, "gemini-2.5-flash-lite", "gemini-2.0-flash"];
    let lastError = null;

    for (const modelName of candidateModels) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 900
          }
        })
      });

      const data = await response.json();
      if (response.ok && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const replyText = data.candidates[0].content.parts[0].text;
        return res.status(200).json({
          reply: replyText,
          model: envModel,
          executedModel: modelName,
          sources: retrievedChunks,
          mode: "vercel-serverless-rag"
        });
      }

      lastError = data.error?.message || `HTTP ${response.status}`;
      // Only try next candidate if 404 (model name not yet rolled out on key's region)
      if (response.status !== 404) {
        break;
      }
    }

    return res.status(502).json({
      error: `Gemini API 호출 오류: ${lastError}`,
      model: envModel,
      sources: retrievedChunks
    });
  } catch (err) {
    return res.status(500).json({
      error: `서버 내부 오류: ${err.message}`
    });
  }
};
