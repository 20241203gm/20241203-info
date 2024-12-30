# 개발 일지 (Development Log)

이 문서는 20241203.info 프로젝트의 개발 과정을 기록합니다. 개발 과정에서의 의사결정, 문제 해결, 학습 내용 등이 포함됩니다.

## 목차
1. [환경 설정](#환경-설정)
2. [개발 진행 상황](#개발-진행-상황)
3. [문제 해결 기록](#문제-해결-기록)
4. [학습 내용](#학습-내용)

## 환경 설정

### 2024-12-30 - 프로젝트 초기 설정

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

다음 단계:
1. 생성된 프로젝트 디렉토리로 이동
```bash
cd 20241203-info
```

2. 개발 서버 실행 테스트
```bash
npm run dev
```

실행 결과:
- Next.js 15.1.3 (Turbopack) 버전으로 실행됨
- 로컬 접속 주소: http://localhost:3000
- 네트워크 접속 주소: http://192.168.219.106:3000
- 실행 시간: 5.7초

특이사항:
- Turbopack이 기본으로 활성화되어 있음 (Next.js의 새로운 번들러)
- 정상적으로 개발 서버가 구동됨
- 개발 서버 실행 중에는 다른 명령어 입력 불가
- Ctrl + C로 서버를 중지한 후 추가 작업 진행

### 학습 포인트
1. Next.js 프로젝트 구조
   - app/ 디렉토리: 페이지와 라우팅
   - src/ 디렉토리: 소스 코드 구조화
   - public/ 디렉토리: 정적 파일 저장

2. 주요 설정 파일들
   - next.config.js: Next.js 설정
   - tsconfig.json: TypeScript 설정
   - tailwind.config.js: Tailwind CSS 설정
   - .eslintrc.json: ESLint 규칙 설정

### 다음 단계
1. 기본 프로젝트 구조 설정
2. 필요한 추가 패키지 설치
3. 개발 환경 설정 (Cursor AI 최적화)

### 3. 필요한 패키지 설치
```bash
npm install @supabase/supabase-js gsap d3
```

실행 결과:
- 432개 패키지 감사 완료 (2초 소요)
- 취약점 발견되지 않음
- 142개 패키지가 funding 요청 중 (선택적 후원 가능)

설치된 패키지:
1. @supabase/supabase-js
   - 용도: PostgreSQL 데이터베이스 연동
   - 주요 기능: 실시간 데이터 동기화, 인증, API 자동 생성

2. gsap (GreenSock Animation Platform)
   - 용도: 스크롤 기반 애니메이션 구현
   - 주요 기능: 스크롤 트리거, 타임라인 애니메이션

3. d3 (Data-Driven Documents)
   - 용도: 데이터 시각화
   - 주요 기능: 그래프, 차트, 인터랙티브 시각화

학습 필요 사항:
- Supabase 설정 및 기본 CRUD 작업
- GSAP 스크롤 트리거 활용법
- D3.js 기본 사용법

### 개발 환경
- IDE: Cursor AI
  - AI 지원 코드 에디터
  - GitHub Copilot 내장
  - 실시간 AI 코드 제안 및 설명
  - VS Code 기반이지만 AI 기능이 강화된 버전

## 개발 진행 상황

### 기능 구현 현황
- [ ] 프로젝트 기본 구조 설정
- [ ] 메인 페이지 레이아웃
- [ ] 데이터베이스 스키마 설계
- [ ] API 라우트 구성

### 현재 작업 중인 내용
- 프로젝트 초기 설정 및 환경 구성

## 문제 해결 기록

### 2024-12-30 - [문제 제목]
**문제 상황**
- 문제 설명

**해결 과정**
1. 시도한 방법들
2. 참고한 자료
3. 최종 해결 방법

**학습 포인트**
- 이 과정에서 배운 점
- 앞으로 주의할 점

## 학습 내용

### Next.js 기본 개념
- Next.js란?
  - React 기반의 풀스택 웹 프레임워크
  - Vercel이라는 회사에서 개발/관리
  - React의 복잡한 설정들을 자동화하고 추가 기능 제공

- 주요 특징
  1. 서버 사이드 렌더링 (SSR)
     - 서버에서 페이지를 미리 렌더링
     - 초기 로딩 속도 개선
     - 검색 엔진 최적화(SEO) 향상

  2. 파일 기반 라우팅
     - pages/ 또는 app/ 폴더의 파일 구조가 곧 URL 구조
     - 예: pages/about.tsx → /about 페이지
     - 복잡한 라우팅 설정 불필요

  3. 자동 코드 분할
     - 페이지별로 필요한 JS만 로드
     - 초기 로딩 시간 최적화
     - 사용자가 필요한 코드만 다운로드

  4. 이미지 최적화
     - 자동 이미지 리사이징
     - 지연 로딩 지원
     - 다양한 기기에 최적화

  5. API 라우트
     - pages/api/ 폴더에서 API 엔드포인트 생성
     - 별도의 백엔드 서버 없이 API 구현 가능
     - 서버리스 함수처럼 작동

- 우리 프로젝트에서의 활용
  1. 타임라인 페이지: SSR로 빠른 초기 로딩
  2. 데이터베이스 연동: API 라우트 활용
  3. 이미지 갤러리: 자동 이미지 최적화
  4. 인터랙티브 요소: 클라이언트 컴포넌트 활용

### TypeScript 기초
- 타입 정의
- 인터페이스
- 제네릭
- 등등

### 추가 예정...

---

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

### 시민활동 인터랙티브 아카이브 구현 계획

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
       testimony?: string[];   // 시민 증언
     }
     ```

2. **SNS 데이터 시각화**
   - 데이터 수집:
     - Twitter/X API 활용
     - 인스타그램 해시태그 크롤링
     - 실시간 데이터 Supabase에 저장

   - 시각화 방법:
     - D3.js로 워드클라우드 구현
     - 실시간 카운터 컴포넌트
     - 영향력 있는 게시물 하이라이트

3. **통계 데이터 대시보드**
   - 구현 기술:
     - D3.js 차트 라이브러리
     - Supabase 실시간 구독
     - 반응형 그리드 레이아웃

   - 주요 지표:
     - 시간대별 참여 인원
     - 지역별 활동 현황
     - 활동 유형 분포

4. **기술 스택 구성**
```typescript
// pages/archive/index.tsx
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as d3 from 'd3';

// 스크롤 섹션 컴포넌트
const StorySection = ({ data }: { data: TimelineSection }) => {
  // GSAP 애니메이션 설정
  // 배경 전환 효과
  // 컨텐츠 페이드인/아웃
};

// SNS 데이터 시각화 컴포넌트
const SocialDataViz = () => {
  // 실시간 데이터 구독
  // D3.js 워드클라우드
  // 카운터 업데이트
};

// 통계 대시보드 컴포넌트
const StatsDashboard = () => {
  // D3.js 차트 렌더링
  // 실시간 데이터 업데이트
};
```

5. **개발 단계**
   1. 기본 레이아웃 및 스크롤 인터랙션 구현
   2. SNS 데이터 수집 및 저장 시스템 구축
   3. 데이터 시각화 컴포넌트 개발
   4. 실시간 업데이트 기능 구현
   5. 성능 최적화 및 테스트

6. **고려사항**
   - 모바일 대응 필수
   - 데이터 로딩 최적화
   - 브라우저 호환성
   - 실시간 업데이트 제한 관리 

### 2024-12-30 - 인터랙티브 아카이브 개발 시작

1. **기본 디렉토리 구조 생성**
```bash
mkdir -p src/app/archive
mkdir -p src/components/archive
touch src/app/archive/page.tsx
touch src/components/archive/StorySection.tsx
```

2. **StorySection 컴포넌트 구현 시작**
- 목적: 스크롤 기반 스토리텔링의 기본 단위 컴포넌트
- 주요 기능:
  - 배경 이미지/영상 전환 효과
  - 컨텐츠 페이드인/아웃
  - 시민 증언 표시 

### StorySection 컴포넌트 테스트
- 임시 데이터와 placeholder 이미지로 기본 기능 테스트
- 사용한 이미지: picsum.photos (무작위 이미지 제공 서비스)
- 테스트 항목:
  1. 스크롤 기반 애니메이션
  2. 배경 이미지 전환
  3. 컨텐츠 페이드인/아웃
  4. 시민 증언 표시 

### 2024-12-30 - Hydration 에러 해결
**문제 상황**
- StorySection 컴포넌트에서 서버-클라이언트 렌더링 불일치 발생
- 주요 에러 메시지: "Hydration failed because the server rendered HTML didn't match the client"

**해결 과정**
1. 클라이언트 사이드 마운트 상태 추가
   ```typescript
   const [isMounted, setIsMounted] = useState(false);
   ```

2. GSAP 초기화를 클라이언트 사이드로 제한
   ```typescript
   if (typeof window !== 'undefined') {
     gsap.registerPlugin(ScrollTrigger);
   }
   ```

3. 스타일 처리 방식 변경
   - 인라인 스타일을 분리하여 배경 이미지 처리
   - className을 활용한 스타일링 강화

**학습 포인트**
- Next.js SSR과 CSR의 차이점 이해
- Hydration 과정에서 발생할 수 있는 문제들
- 클라이언트 사이드 기능의 안전한 처리 방법 

### 2024-12-30 - 스토리 섹션 컨텐츠 추가
- 4개의 주요 사건 섹션 추가:
  1. 계엄령 선포 순간
  2. 시민들의 초기 저항
  3. 언론인들의 대응
  4. 군부 내 균열

- 각 섹션별 구성:
  - 배경 이미지 (임시로 picsum.photos 활용)
  - 사건 설명 텍스트
  - 관련 미디어 (일부 섹션)
  - 2개의 시민 증언 

### 2024-12-30 - 구글 시트 데이터 관리 시스템 구축

1. **구글 시트 템플릿 생성**
   - 시트 이름: "20241203.info - 스토리 데이터"
   - 시트 구조:
     | 배경이미지 | 내용 | 미디어(선택) | 증언1 | 증언2 |
     |------------|------|--------------|--------|--------|
     | URL        | 텍스트 | URL        | 텍스트  | 텍스트  |

2. **구글 API 설정 단계**
   1. Google Cloud Console 접속
   2. 새 프로젝트 생성: "20241203-info"
   3. Google Sheets API 활성화
   4. 서비스 계정 생성
      - 이름: "sheets-api"
      - 역할: "편집자"
   5. JSON 키 파일 다운로드

3. **필요한 패키지 설치**
```bash
npm install googleapis
```

4. **환경 변수 설정**
   - .env.local 파일 생성
   - 서비스 계정 키와 시트 ID 설정 

### 구글 시트 API 설정 완료
1. 서비스 계정 키 생성 및 저장
   - JSON 키 파일을 `google-sheets-key.json`으로 저장
   - gitignore에 추가하여 보안 유지

2. 환경 변수 설정
   ```plaintext
   GOOGLE_SHEETS_CREDENTIALS=`cat google-sheets-key.json`
   SHEET_ID=your-google-sheet-id-here
   ```

3. googleapis 패키지 설치
   ```bash
   npm install googleapis
   ``` 

### 모바일 테스트 환경 설정
1. 로컬 네트워크 접속 설정
   ```bash
   # 호스트 IP로 서버 실행
   npm run dev -- -H 0.0.0.0
   ```

2. 접속 방법
   - 같은 WiFi 네트워크 사용
   - `http://[컴퓨터IP]:3000/archive` 로 접속
   - 반응형 디자인 실제 기기에서 테스트 

### 미디어 타입 단순화
- 지원하는 미디어 타입을 3가지로 정리:
  1. image: 이미지 파일
  2. video: 동영상 파일
  3. text: 문서 링크

- 구글 시트 데이터 유효성 검사 설정
  - 미디어타입 열에 드롭다운 메뉴 추가
  - 잘못된 입력 방지 