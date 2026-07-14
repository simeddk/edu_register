import {
  type CSSProperties,
  type ElementType,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import './reveal.css';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  index?: number;
  threshold?: number;
};

type RevealStyle = CSSProperties & { '--reveal-delay': string };

const useSafeLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  delay = 500,
  index = 0,
  threshold = 0.15,
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const resolvedDelay = delay + index * 100;
  const classes = ['reveal', className].filter(Boolean).join(' ');
  const style: RevealStyle = {
    '--reveal-delay': `${Math.max(0, resolvedDelay)}ms`,
  };

  useSafeLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || typeof window === 'undefined') return;

    const showImmediately = () => {
      element.classList.remove('reveal--pending');
      element.classList.add('reveal--visible');
    };
    const prefersReducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showImmediately();
      return;
    }

    element.classList.add('reveal--pending');
    let observer: IntersectionObserver | undefined;

    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            showImmediately();
            observer?.disconnect();
          }
        },
        { threshold },
      );
      observer.observe(element);
    } catch {
      showImmediately();
    }

    return () => observer?.disconnect();
  }, [threshold]);

  return (
    <Tag ref={elementRef} className={classes} style={style}>
      {children}
    </Tag>
  );
}
