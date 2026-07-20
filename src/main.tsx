import React from 'react';
import { createRoot } from 'react-dom/client';
import { Reveal } from './components/Reveal';
import './styles.css';

const Arrow = () => <span aria-hidden="true" className="arrow">→</span>;

function DocumentIcon() {
  return <svg className="stage-icon document-icon" viewBox="0 0 160 150" aria-hidden="true">
    <path className="paper" d="M30 14h62l28 29v78H30z" />
    <path className="fold" d="M92 14v29h28" />
    <path className="ink" d="M49 60h45M49 78h54M49 96h34" />
    <g className="sheet"><rect x="82" y="78" width="65" height="58" rx="8"/><path d="M96 94h37M96 108h37M96 122h37M108 91v34M122 91v34"/></g>
  </svg>;
}

function AnalysisIcon() {
  return <div className="analysis-icon" aria-hidden="true"><span className="wave wave-one"/><span className="wave wave-two"/><svg viewBox="0 0 120 120"><path d="M60 18 73 47 102 60 73 73 60 102 47 73 18 60 47 47Z"/><path d="m60 18 0 84M18 60h84M47 47l26 26M73 47 47 73"/></svg></div>;
}

function AppIcon() {
  return <div className="app-icon" aria-hidden="true"><div className="app-bar"><i/><i/><i/></div><div className="result result-main"/><div className="result-grid"><i/><i/><i/></div></div>;
}

function ApprovalPanel() {
  return <div className="approval-panel">
    <div className="checkmark" aria-hidden="true">✓</div>
    <div className="review-state"><span>!</span> 검토 필요</div>
    <div className="approval-actions"><button type="button">수정 요청</button><button className="approve" type="button">승인 및 실행</button></div>
  </div>;
}

const stages = [
  { title: '문서·데이터', content: <DocumentIcon /> },
  { title: 'AI 분석', content: <AnalysisIcon /> },
  { title: '업무 앱', content: <AppIcon /> },
  { title: '사람의 검토와 승인', content: <ApprovalPanel /> },
];

function Header() {
  return <header className="site-header">
    <a className="logo" href="#" aria-label="Maker platform 홈"><span className="maker">MAKER<i aria-hidden="true"/></span><span className="platform">platform</span></a>
    <nav aria-label="주요 메뉴"><a href="#education">교육·컨설팅</a><a href="#cases">적용 사례</a><a href="#process">진행 과정</a><a href="#faq">FAQ</a><a className="nav-cta" href="#contact">상담 신청</a></nav>
  </header>;
}

function Workflow() {
  return <div className="workflow" aria-label="문서와 데이터에서 사람의 검토와 승인까지 이어지는 업무 흐름">
    <svg className="connector desktop-connector" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path className="connector-base" d="M44 50H956"/><path className="connector-light" d="M44 50H956"/></svg>
    {stages.map((stage, i) => <React.Fragment key={stage.title}>
      <article className={`stage stage-${i + 1}`} style={{'--stage-index': i} as React.CSSProperties}>
        <h2>{stage.title}</h2><div className="stage-card">{stage.content}</div>
      </article>
      {i < stages.length - 1 && <div className="mobile-arrow" aria-hidden="true">↓</div>}
    </React.Fragment>)}
  </div>;
}

function ProblemsSection() {
  return <section id="problems" className="problems-section" aria-label="고객의 문제">
    <Reveal className="problems-visual">
      <img
        src={`${import.meta.env.BASE_URL}assets/customer-problems-v2.webp`}
        width="1492"
        height="1054"
        loading="lazy"
        decoding="async"
        alt="AI를 사용해도 반복 복사, 연결 단절, 승인 병목 때문에 업무 흐름이 개선되지 않는 고객의 문제"
      />
    </Reveal>
  </section>;
}

function ServicesSection() {
  return <section id="services" className="services-section" aria-label="제공하는 교육과 컨설팅">
    <Reveal className="services-visual">
      <img
        src={`${import.meta.env.BASE_URL}assets/education-consulting-services-v2.webp`}
        width="1492"
        height="1054"
        loading="lazy"
        decoding="async"
        alt="AX 실무 교육, 업무 진단 설계, PoC 구축 지원을 연결하는 교육과 컨설팅 과정"
      />
    </Reveal>
  </section>;
}

function CasesSection() {
  return <section id="cases" className="cases-section" aria-label="교육과 구축 사례">
    <Reveal className="cases-visual">
      <img
        src={`${import.meta.env.BASE_URL}assets/education-build-cases-v1.webp`}
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
        alt="교육 현장 사진과 엔지니어링사 안전관리, 공공기관 교량점검, 공공시설 묘역관리 구축 사례"
      />
    </Reveal>
  </section>;
}

const processSteps = [
  { number: '01', title: '상담', description: '해결하려는 문제와 현재 업무 환경을 확인합니다.' },
  { number: '02', title: '업무 분석', description: '반복되거나 연결이 필요한 업무 지점을 찾습니다.' },
  { number: '03', title: 'PoC 구축', description: '핵심 기능을 중심으로 검증 가능한 결과물을 구현합니다.' },
  { number: '04', title: '검증', description: '실제 데이터와 사용 흐름을 기준으로 가능성을 확인합니다.' },
  { number: '05', title: '교육·적용', description: '담당자가 직접 활용할 수 있도록 현장에 연결합니다.' },
];

function ProcessSection() {
  return <section id="process" className="process-section" aria-labelledby="process-title">
    <Reveal className="process-content">
      <p className="process-label">진행 방식</p>
      <h2 id="process-title">상담부터 현장 적용까지,<br/>단계별로 진행합니다.</h2>
      <p className="process-intro">업무 환경을 확인하고 구현과 검증을 거쳐<br/>실제 활용까지 연결합니다.</p>
      <div className="process-panel">
        <ol className="process-list">
          {processSteps.map((step) => <li className="process-step" key={step.number}>
            <span className="process-node" aria-hidden="true">{step.number}</span>
            <div className="process-copy">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </li>)}
        </ol>
      </div>
    </Reveal>
  </section>;
}

const faqItems = [
  {
    question: '코딩을 몰라도 교육을 받을 수 있나요?',
    answer: '네. 코딩이나 개발 전공 지식이 없어도 참여할 수 있습니다.\n화면과 업무 흐름을 직접 구성하는 노코드 방식으로 진행하며,\n교육 대상과 목적에 맞춰 실습 난이도를 조정합니다.',
  },
  {
    question: '우리 회사 문서를 AI에 연결할 수 있나요?',
    answer: '가능합니다.\n문서 형식과 저장 위치, 사용할 AI 서비스와 보안 요건을 확인한 뒤\nAPI, OCR, 문서 검색 등 적합한 연결 방법을 검토합니다.',
  },
  {
    question: '기존 DB나 업무 시스템과 연동할 수 있나요?',
    answer: '기존 DB와 그룹웨어, ERP 등 업무 시스템과의 연동을 검토할 수 있습니다.\n실제 연동 방식은 해당 시스템의 API 제공 여부와 접근 권한,\n인증 방식 및 운영 환경을 확인한 뒤 결정합니다.',
  },
  {
    question: 'PoC는 어떤 범위로 진행하나요?',
    answer: '확인하려는 목표와 데이터, 연동 환경에 따라 범위를 정합니다.\n상담을 통해 우선 검증할 핵심 기능을 선정하고,\n검증 결과에 따라 적용 범위를 확장할 수 있습니다.',
  },
  {
    question: '보안이 중요한 문서는 어떻게 다루나요?',
    answer: '문서의 저장 위치와 외부 전송 여부, 사용자 접근 권한,\n고객사의 보안 정책을 먼저 확인합니다.\n민감한 정보가 포함된 경우에는 사용할 수 있는 AI 환경과\n데이터 처리 방식을 사전에 검토한 뒤 적합한 구성을 제안합니다.',
  },
];

function FaqSection() {
  return <section id="faq" className="faq-section" aria-labelledby="faq-title">
    <Reveal className="faq-content">
      <div className="faq-layout">
        <div className="faq-heading">
          <p className="process-label">FAQ</p>
          <h2 id="faq-title">도입 전에 궁금한 점을<br/>확인해 보세요.</h2>
          <p>교육과 업무 시스템 연동,<br/>PoC와 보안에 관한 질문을 정리했습니다.</p>
        </div>
        <div className="faq-panel">
          {faqItems.map((item, index) => <details key={item.question} open={index === 0}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>)}
        </div>
      </div>
      <div className="final-cta-panel">
        <div>
          <h3>우리 업무에도 적용할 수 있을까요?</h3>
          <p>현재 업무 환경과 목표를 알려주시면<br/>적합한 교육과 적용 방향을 함께 검토합니다.</p>
        </div>
        <div className="hero-actions final-cta-actions">
          <a className="secondary" href="#contact">AX 상담 신청 <Arrow/></a>
        </div>
      </div>
    </Reveal>
  </section>;
}

function App() {
  return <div className="page"><Header/><main><section className="hero">
    <Reveal className="hero-copy"><h1>AI 도구를<br/>소개하는 데서<br/><em>끝내지 않습니다.</em></h1><p>반복되는 업무를 찾고,<br/>실제로 작동하는 흐름으로 바꿉니다.</p><div className="hero-actions"><a className="primary" href="#services">교육·컨설팅 보기 <Arrow/></a><a className="secondary" href="#contact">AX 상담 신청 <Arrow/></a></div></Reveal>
    <Workflow/>
  </section><ProblemsSection/><ServicesSection/><CasesSection/><ProcessSection/><FaqSection/></main></div>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
