# 개발 일지 (Development Log)

이 문서는 20241203.info 프로젝트의 개발 과정을 기록합니다. 개발 과정에서의 의사결정, 문제 해결, 학습 내용 등이 포함됩니다.

## 목차
1. [환경 설정](#환경-설정)
2. [개발 진행 상황](#개발-진행-상황)
3. [문제 해결 기록](#문제-해결-기록)
4. [학습 내용](#학습-내용)

## 환경 설정

### 2023-12-30 - 프로젝트 초기 설정

### 1. Next.js 프로젝트 생성
```bash
npx create-next-app@latest 20241203-info
```

실행 결과:
- 프로젝트 생성 위치: D:\Dropbox\coding\20241203-info\20241203-info
- 선택한 옵션:
  - TypeScript: 타입 안정성과 개발 생산성을 위해 선택 ✅
  - ESLint: 코드 품질 관리를 위해 선택 ✅
  - Tailwind CSS: 빠른 UI 개발을 위해 선택 ✅
  - src/ 디렉토리: 코드 구조화를 위해 선택 ✅
  - App Router: Next.js 13+의 새로운 라우팅 시스템 사용 ✅
  - 커스텀 import alias: 깔끔한 import 경로 관리를 위해 선택 ✅

### 2. 필요한 패키지 설치
```bash
npm install gsap
```

실행 결과:
- gsap (GreenSock Animation Platform)
  - 용도: 스크롤 기반 애니메이션 구현
  - 주요 기능: 스크롤 트리거, 타임라인 애니메이션

### 개발 환경
- IDE: Cursor AI
  - AI 지원 코드 에디터
  - GitHub Copilot 내장
  - 실시간 AI 코드 제안 및 설명
  - VS Code 기반이지만 AI 기능이 강화된 버전

## 개발 진행 상황

### 기능 구현 현황
- [x] 프로젝트 기본 구조 설정
- [x] 메인 페이지 레이아웃
- [ ] 스크롤 기반 스토리텔링 구현
- [ ] 반응형 디자인 적용

### 현재 작업 중인 내용
- 스크롤 기반 스토리텔링 구현

## 문제 해결 기록

### 2023-12-30 - 스크롤 섹션 구현
**문제 상황**
- 배경 이미지가 전체 화면을 채우지 않음
- 텍스트가 이미지 위에 올바르게 표시되지 않음
- 스크롤 시 섹션 전환이 부자연스러움

**해결 과정**
1. 배경 이미지 스타일링
   ```css
   .background {
     position: absolute;
     inset: 0;
     width: 100%;
     height: 100%;
     object-fit: cover;
   }
   ```

2. 텍스트 레이어링
   ```css
   .content {
     position: absolute;
     inset: 0;
     z-index: 20;
     color: white;
   }
   ```

3. 스크롤 스냅 적용
   ```css
   .container {
     scroll-snap-type: y mandatory;
   }
   .section {
     scroll-snap-align: start;
   }
   ```

### 스토리텔링 섹션 구현 계획

1. **스크롤 기반 스토리텔링**
   - 구현 방법:
     - GSAP ScrollTrigger 활용
     - 스크롤 위치에 따른 컨텐츠 전환
     - Intersection Observer로 요소 등장 효과
   
   - 주요 기능:
     ```typescript
     // 예시 컴포넌트 구조
     interface TimelineSection {
       background: string;      // 배경 이미지/영상
       content: string;        // 텍스트 내용
       media?: string;         // 관련 미디어
       summary?: string;       // 요약문
     }
     ```

2. **섹션 컴포넌트 구조**
```typescript
// components/archive/StorySection.tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 스크롤 섹션 컴포넌트
const StorySection = ({ data }: { data: TimelineSection }) => {
  // GSAP 애니메이션 설정
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // 스크롤 트리거 설정
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      toggleActions: 'play none none reverse'
    });
  }, []);

  return (
    <section className="relative h-screen">
      {/* 배경 이미지 */}
      {/* 오버레이 */}
      {/* 콘텐츠 */}
    </section>
  );
};
```

### 2023-12-30 - 스토리 섹션 구현

#### 1. 스토리 섹션 컴포넌트 개발
- 구글 스프레드시트에서 데이터를 가져와 표시하는 기능 구현
- 배경 이미지, 텍스트 콘텐츠, 미디어 콘텐츠 레이아웃 구성
- 스크롤 스냅 기능 적용

#### 2. 텍스트 스타일링
```typescript
// 텍스트 컨테이너 스타일
<pre style={{ 
  fontSize: '1rem',
  color: '#FFFFFF',
  lineHeight: '1.6',
  fontWeight: '400',
  whiteSpace: 'pre-wrap',
  wordBreak: 'keep-all',
  textAlign: 'left',
  margin: 0
}}>
  {content}
</pre>
```

#### 3. 레이어 구조
1. 배경 이미지 레이어
2. 반투명 오버레이 레이어 (rgba(0, 0, 0, 0.7))
3. 콘텐츠 레이어

#### 4. 해결한 문제들
- 텍스트가 보이지 않는 문제 해결
  - GSAP 애니메이션 제거
  - z-index 조정
  - 포지셔닝 수정
- 텍스트 크기와 여백 최적화
  - 본문 텍스트 크기: 1rem
  - 요약 텍스트 크기: 1.125rem
  - 여백과 패딩 조정

#### 다음 작업
- [ ] 반응형 디자인 적용
- [ ] 미디어 콘텐츠 표시 최적화
- [ ] 스크롤 인터랙션 개선

### 2023-12-30 - 웹폰트 적용 및 미디어 처리 개선

#### 1. 웹폰트 적용
- Google Fonts 추가
  - Noto Sans KR (100-900)
  - East Sea Dokdo
  - Nanum Pen Script

- 폰트 적용
  ```typescript
  // 본문 텍스트 스타일
  <pre style={{ 
    fontSize: '1rem',
    fontWeight: '200',
    fontFamily: "'Noto Sans KR', sans-serif"
  }}>

  // 요약 텍스트 스타일
  <div style={{ 
    fontSize: '1.7rem',
    fontFamily: "'East Sea Dokdo', cursive",
    textAlign: 'center'
  }}>
  ```

#### 2. 유튜브 URL 처리 개선
- 라이브 스트림 URL 지원 추가
  ```typescript
  const getYoutubeEmbedUrl = (url: string) => {
    // 라이브 스트림 타임스탬프 처리
    if (url.includes('live/')) {
      const videoId = url.split('live/')[1].split('?')[0];
      const timestamp = url.includes('?t=') ? url.split('?t=')[1] : '';
      return `https://www.youtube.com/embed/${videoId}${timestamp ? `?start=${timestamp}` : ''}`;
    }
    // ... 기존 URL 처리 로직
  };
  ```

#### 3. 스타일 최적화
- 텍스트 크기와 여백 조정
  - 본문: 1rem, 200 weight
  - 요약: 1.7rem, East Sea Dokdo
- 요약 텍스트 중앙 정렬
- 미디어 섹션 여백 조정

#### 다음 작업
- [ ] 모바일 반응형 디자인
- [ ] 스크롤 애니메이션 개선
- [ ] 미디어 섹션 레이아웃 최적화

## 커밋 컨벤션

커밋 메시지는 다음 형식을 따릅니다:

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅
- refactor: 코드 리팩토링
- test: 테스트 코드
- chore: 기타 변경사항

예시:
```
feat: 메인 페이지 레이아웃 구현
fix: 모바일 화면에서 메뉴 버튼 오작동 수정
docs: README 업데이트
``` 

## 2023-12-30
- 스토리 섹션 컴포넌트 스타일링 개선
  - 컨텐츠 영역의 좌우 여백 확대 (화면의 75%로 제한)
  - 스크롤바 스타일 개선 (밝은색 테마 적용)
  - 반응형 패딩 및 여백 조정
- 스토리 섹션 컨텐츠 순서 변경
  - 내용 (content) -> 미디어 (media) -> 요약 (summary) 순으로 재배치
  - 사용자 경험 개선을 위한 컨텐츠 흐름 최적화
- 스토리 섹션 디자인 개선
  - 컨텐츠 하단 여백 추가 (2rem)
  - 요약 텍스트에 반투명 배경 레이어 적용
  - 요약 텍스트 패딩 최적화 (1rem 상하, clamp(0.75rem, 2vw, 1.5rem) 좌우)

## 2023-12-30
- 스토리 섹션 컴포넌트 구현
  - 배경 이미지와 오버레이 적용
  - 본문 내용 표시 및 스타일링
  - 미디어(이미지, 비디오, 텍스트) 표시 기능 구현
  - 요약 섹션 디자인 및 구현

### 스타일링 개선
- 텍스트 크기 및 여백 조정
- 폰트 적용: 'Noto Sans KR' (본문), 'East Sea Dokdo' (요약)
- 배경 이미지에 어두운 오버레이 추가
- 스크롤 스냅 기능 구현

### 미디어 처리 기능
- YouTube URL을 임베드 URL로 자동 변환
- 이미지, 비디오, 텍스트 타입별 표시 방식 구현
- 미디어 설명과 '원본보기' 버튼 추가
- 모든 외부 링크는 새 탭에서 열리도록 설정

### 디자인 상세
- 요약 텍스트:
  - 폰트 크기 1.7rem
  - 가운데 정렬
  - 큰따옴표로 감싸기
  - 반투명 흰색 배경
- 원본보기 버튼:
  - 흰색 배경에 검은색 텍스트
  - 호버 시 투명도 변화 효과
  - 모든 미디어 타입에 동일한 스타일 적용

### API 및 데이터 처리
- Google Sheets API 연동
- 스프레드시트 데이터 매핑 구조 개선
- 에러 처리 및 로깅 강화 

## YouTube 타임스탬프 처리 로직 수정

### 현재 상태
1. 데스크톱
   - 일반 YouTube URL: 정상 작동
   - 타임스탬프 URL: 정상 작동
   - 라이브스트림 URL: 정상 작동

2. 모바일
   - 일반 YouTube URL: 정상 작동
   - 타임스탬프 URL: 화면에 표시되지 않는 문제 있음 (미해결)
   - 라이브스트림 URL: 정상 작동

### 시도한 해결 방법
1. URL 파라미터 처리 방식 변경
   - `start` → `t` 파라미터로 변경
   - 불필요한 파라미터 제거
   - URL 생성 방식 단순화

### 남은 이슈
- 모바일에서 타임스탬프가 있는 URL이 제대로 표시되지 않는 문제
- 추후 모바일 환경에서의 YouTube 임베딩 처리 방식 재검토 필요 

### 2023-12-30 - 헤더 컴포넌트 구현

#### 1. 메뉴 구조 설정
- 메인 로고: 20241203.info (외부 링크)
- 주요 메뉴:
  - 광장의 목소리: 시민 활동 아카이브 (메인 페이지)
  - 계란타임라인: 시간순 사건 정리
  - 계란위키: 데이터베이스화된 정보

#### 2. 디자인 구현
- 반투명한 검은색 배경 (rgba(0, 0, 0, 0.8))
- 블러 효과 적용
- 하단 테두리로 구분선 추가
- 현재 페이지 메뉴 강조 (굵은 글씨)

#### 3. 기술적 구현
- Next.js의 App Router 활용
- 클라이언트 컴포넌트로 구현 ('use client')
- usePathname 훅을 사용한 현재 페이지 감지
- 반응형 디자인 적용

#### 다음 작업
- [ ] 모바일 환경 최적화
- [ ] 다크/라이트 모드 지원
- [ ] 스크롤 시 헤더 동작 개선 

### 2023-12-30 - 헤더 반응형 디자인 개선

#### 1. 모바일 대응
- 동적 폰트 크기 적용
  - 로고: `clamp(0.9rem, 2.5vw, 1.1rem)`
  - 메뉴: `clamp(0.75rem, 2vw, 0.95rem)`
- 메뉴 간격 자동 조정: `clamp(12px, 2vw, 24px)`
- 줄바꿈 방지: `white-space: nowrap`

#### 2. CSS 모듈화
- 인라인 스타일을 CSS 모듈로 분리
- 스타일 재사용성 향상
- 코드 유지보수성 개선
- hover 효과 구현

#### 3. 메뉴 구조 최적화
- 오른쪽 정렬 레이아웃
- 순서: 계란타임라인 > 계란위키 > 광장의 목소리
- 로고 영역과 메뉴 영역 분리

#### 4. 디자인 개선
- 반투명 배경과 블러 효과
- 부드러운 전환 효과
- 현재 페이지 강조 (굵은 글씨)
- 아이콘 추가 및 둥근 모서리 적용

#### 다음 작업
- [ ] 스크롤 시 헤더 동작 개선
- [ ] 다크/라이트 모드 지원
- [ ] 접근성 개선 

## 2024-12-31
1. 헤더 메뉴 아이콘 추가
   - 계란타임라인: 1f4cb.svg (📋)
   - 계란위키: 1f310.svg (🌐)
   - 광장의 목소리: 1f4e2.svg (📢)
   - 각 아이콘은 16x16 크기로 설정하고 텍스트와의 간격 조정

2. 구글시트 데이터 실시간 반영 개선
   - API 응답에 캐시 방지 헤더 추가
   - 클라이언트 요청 시 캐시 비활성화 설정
   - 데이터 변경사항이 즉시 반영되도록 개선 