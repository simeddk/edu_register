import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import './consultation-modal.css';

type ConsultationModalProps = {
  open: boolean;
  onClose: () => void;
};

type PurposeId = 'education' | 'consulting' | 'poc' | 'other';

const purposes: Array<{ id: PurposeId; title: string; description: string }> = [
  { id: 'education', title: 'AX 교육 문의', description: '대상과 목적에 맞는 교육 과정이 필요합니다.' },
  { id: 'consulting', title: '업무 진단·컨설팅', description: '현재 업무의 반복과 연결 문제를 검토하고 싶습니다.' },
  { id: 'poc', title: 'PoC·구축 문의', description: '기능 구현과 적용 가능성을 검증하고 싶습니다.' },
  { id: 'other', title: '기타 문의', description: '그 밖의 교육과 기술 관련 문의가 있습니다.' },
];

const purposeQuestions: Record<PurposeId, Array<{ label: string; multiline?: boolean }>> = {
  education: [
    { label: '교육 대상과 예상 인원' },
    { label: '희망하는 교육 주제', multiline: true },
    { label: '희망 일정 또는 운영 방식', multiline: true },
  ],
  consulting: [
    { label: '현재 담당 업무' },
    { label: '반복적으로 시간이 많이 드는 일', multiline: true },
    { label: '현재 사용 중인 문서와 프로그램', multiline: true },
    { label: '가장 먼저 개선하고 싶은 결과', multiline: true },
  ],
  poc: [
    { label: '구현하고 싶은 기능', multiline: true },
    { label: '현재 사용 중인 데이터 또는 시스템', multiline: true },
    { label: 'AI, API 또는 장비 연동이 필요한 부분', multiline: true },
    { label: '우선 검증하고 싶은 결과', multiline: true },
  ],
  other: [{ label: '문의 내용', multiline: true }],
};

export function ConsultationModal({ open, onClose }: ConsultationModalProps) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [purpose, setPurpose] = useState<PurposeId | null>(null);
  const [formKey, setFormKey] = useState(0);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let animationFrame = 0;
    let closeTimer = 0;

    if (open) {
      previousFocusRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      setStep(1);
      setPurpose(null);
      setFormKey((key) => key + 1);
      setMounted(true);
      animationFrame = window.requestAnimationFrame(() => {
        setVisible(true);
        window.setTimeout(() => closeButtonRef.current?.focus(), 0);
      });
    } else if (mounted) {
      setVisible(false);
      closeTimer = window.setTimeout(() => {
        setMounted(false);
        previousFocusRef.current?.focus();
      }, 200);
    }

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(closeTimer);
    };
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  const questions = purpose ? purposeQuestions[purpose] : [];

  return createPortal(
    <div
      className={`consultation-modal-layer${visible ? ' is-visible' : ''}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="consultation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-title"
        aria-describedby="consultation-description"
        tabIndex={-1}
      >
        <header className="consultation-modal-header">
          <div>
            <h2 id="consultation-title">AX 상담 신청</h2>
            <p id="consultation-description">현재 업무 환경과 목표를 알려주시면<br/>적합한 교육과 적용 방향을 검토합니다.</p>
          </div>
          <button ref={closeButtonRef} className="consultation-close" type="button" onClick={onClose} aria-label="상담 신청 닫기">×</button>
        </header>

        <div className="consultation-progress" aria-label="상담 신청 단계">
          <span className={step === 1 ? 'is-current' : 'is-complete'}><b>1</b> 신청 목적</span>
          <i aria-hidden="true"/>
          <span className={step === 2 ? 'is-current' : ''}><b>2</b> 상세 정보</span>
        </div>

        <form key={formKey} className="consultation-form" onSubmit={(event) => event.preventDefault()}>
          <div className="consultation-modal-body">
            {step === 1 ? <fieldset className="purpose-fieldset">
              <legend>상담 목적을 선택해 주세요.</legend>
              <div className="purpose-grid">
                {purposes.map((item) => <button
                  className={`purpose-card${purpose === item.id ? ' is-selected' : ''}`}
                  type="button"
                  key={item.id}
                  aria-pressed={purpose === item.id}
                  onClick={() => setPurpose(item.id)}
                >
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </button>)}
              </div>
            </fieldset> : <div className="details-step">
              <fieldset>
                <legend>기본 정보</legend>
                <div className="field-grid">
                  <label><span>이름 <em>필수</em></span><input name="name" type="text" required autoComplete="name"/></label>
                  <label><span>회사 또는 기관명 <small>선택</small></span><input name="organization" type="text" autoComplete="organization"/></label>
                  <label><span>연락처 <em>필수</em></span><input name="phone" type="tel" required autoComplete="tel"/></label>
                  <label><span>이메일 <em>필수</em></span><input name="email" type="email" required autoComplete="email"/></label>
                </div>
              </fieldset>

              <fieldset>
                <legend>{purposes.find((item) => item.id === purpose)?.title} 상세 질문</legend>
                <div className="dynamic-fields">
                  {questions.map((question, index) => {
                    const id = `purpose-question-${index}`;
                    return <label key={question.label} htmlFor={id}>
                      <span>{question.label}</span>
                      {question.multiline
                        ? <textarea id={id} name={id} rows={3}/>
                        : <input id={id} name={id} type="text"/>}
                    </label>;
                  })}
                </div>
              </fieldset>

              <label className="privacy-consent">
                <input type="checkbox" name="privacy-consent"/>
                <span>개인정보 수집 및 이용에 동의합니다.</span>
              </label>
            </div>}
          </div>

          <footer className="consultation-modal-footer">
            {step === 1 ? <>
              <button className="modal-button modal-button-secondary" type="button" onClick={onClose}>닫기</button>
              <button className="modal-button modal-button-primary" type="button" disabled={!purpose} onClick={() => setStep(2)}>다음</button>
            </> : <>
              <button className="modal-button modal-button-secondary" type="button" onClick={() => setStep(1)}>이전</button>
              {/* TODO: Make Webhook 연동 후 submit 활성화 */}
              <button className="modal-button modal-button-primary" type="submit" disabled>상담 신청</button>
            </>}
          </footer>
        </form>
      </div>
    </div>,
    document.body,
  );
}
