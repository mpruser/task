/* eslint-disable no-unused-expressions */
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { LazyLoadDataAttrName } from '@constants';

export interface LazyLoadContextValue {
  /**
   * IntersectionObserver 인스턴스
   */
  observer: IntersectionObserver | undefined;
  /**
   * IntersectionObserver 주시 대상 추가
   */
  observe: (target: Element) => void;
  /**
   * IntersectionObserver 주시 대상 제거
   */
  unobserve: (target: Element) => void;
}

/**
 * image lazyload를 위한 Context
 */
export const LazyLoadContext = createContext<LazyLoadContextValue>({
  observer: undefined,
  observe: () => {},
  unobserve: () => {},
});

export interface LazyLoadProviderProps {
  children: React.ReactNode;
  /**
   * IntersectionObserverInit['rootMargin']
   * @default '100px';
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
   */
  rootMargin?: IntersectionObserverInit['rootMargin'];
}

/**
 * image lazyload를 위한 Provider
 *
 * @todo IntersectionObserver options을 이미지 별로 적용할 수 있도록 기능 확장 필요
 */
export const LazyLoadProvider: React.FC<LazyLoadProviderProps> = ({ children, rootMargin = '100px' }) => {
  const [observer, setObserver] = useState<IntersectionObserver | undefined>(undefined);

  /**
   * 주시 대상 추가
   */
  const observe: LazyLoadContextValue['observe'] = useCallback((target) => {
    observer?.observe(target);
  }, [observer]);

  /**
   * 주시 대상 제거
   */
  const unobserve: LazyLoadContextValue['unobserve'] = useCallback((target) => {
    observer?.unobserve(target);
  }, [observer]);

  /**
   * target에서 image 요소 찾는다
   */
  const findImage = (element: Element): HTMLImageElement | null => {
    const image = element.tagName.toUpperCase() === 'IMG' ? element : element.querySelector('img');
    return image ? image as HTMLImageElement : null;
  };

  /**
   * lazyload 관련 속성 업데이트
   * data-*를 image 실제 속성으로 대체
   */
  const updateImageAttr = (image: HTMLImageElement | null) => Object.keys(LazyLoadDataAttrName).forEach((key) => {
    if (image) {
      const value = image.dataset[key];
      value && image.setAttribute(key, value);
    }
  });

  /**
   * IntersectionObserverCallback
   */
  const handleIntersect = (entries: IntersectionObserverEntry[], obs:IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateImageAttr(findImage(entry.target));
        obs.unobserve(entry.target);
      }
    });
  };

  /**
   * IntersectionObserver setting
   */
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(handleIntersect, { rootMargin });
    setObserver(intersectionObserver);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [rootMargin]);

  return (
    <LazyLoadContext.Provider value={{ observer, observe, unobserve }}>
      {children}
    </LazyLoadContext.Provider>
  );
};
