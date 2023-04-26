import React, { forwardRef, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Spinner } from '@components';

export interface InfiniteSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * IntersectionObserver root options
   * @see https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver/root
   */
  root?: IntersectionObserverInit['root'];
  /**
   * IntersectionObserver rootMargin options
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
   */
  rootMargin?: IntersectionObserverInit['rootMargin'];
  /**
   * IntersectionObserver threshold options
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds
   */
  threshold?: IntersectionObserverInit['threshold'];
  /**
   * loading spinner 표시 / loading 상태에서는 onReachEnd 이벤트 콜백을 실행하지 않는다.
   */
  loading?: boolean;
  /**
   * IntersectionObserver를 비활성화
   */
  disabled?: boolean;
  /**
   * 스크롤 맨 끝 지점에 도달시 실행할 이벤트 콜백
   */
  onReachEnd?: () => void;
}

export const InfiniteSectionComponent = forwardRef<HTMLDivElement, InfiniteSectionProps>((
  { root, rootMargin, threshold, loading, disabled, children, onReachEnd, ...props }, ref,
) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleReachEnd = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !loading && !disabled) {
      onReachEnd?.();
    }
  }, [disabled, loading, onReachEnd]);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (observerTarget.current && !disabled) {
      observer = new IntersectionObserver(handleReachEnd, { root, rootMargin, threshold });
      observer.observe(observerTarget.current);
    }

    return () => observer && observer.disconnect();
  }, [root, rootMargin, threshold, handleReachEnd]);

  return (
    <div ref={ref} {...props}>
      {children}
      <div ref={observerTarget} className="observer" />
      {loading && <div className="spinner" children={<Spinner size="small" />} />}
    </div>
  );
});

/**
 * InfiniteSection Component
 */
export const InfiniteSection = styled(InfiniteSectionComponent)`
  .observer {
    height: 0.1rem;
    margin-top: -0.1rem;
  }

  .spinner {
    padding: 1rem;
    text-align: center;
  }
`;
