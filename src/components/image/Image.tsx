import React, { forwardRef, useContext, useRef, useState, useMemo, useEffect, useImperativeHandle } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { LazyLoadDataAttrName } from '@constants';
import { LazyLoadContext } from '@contexts';
import { Alert } from '@components';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * lazyload 사용여부
   */
  lazy?: boolean;
}

export const ImageComponent = forwardRef<HTMLImageElement, ImageProps>(({
  lazy, src, sizes, srcSet, alt = '', width, height, className, onLoad, onError, ...props
}, ref) => {
  // 이미지 ref
  const imageRef = useRef<HTMLImageElement>(null);
  // LazyLoad Context
  const { observer, observe, unobserve } = useContext(LazyLoadContext);
  // 이미지 로드 상태
  const [status, setStatus] = useState<'error' | 'success' | 'loading'>('loading');

  /**
   * styled className을 포하함한 root 클래스명
   */
  const classNames = classnames(className, `is-${status}`);

  /**
   * 이미지 소스
   */
  const imageSource = useMemo(() => {
    return lazy
      ? {
        [LazyLoadDataAttrName.src]: src,
        [LazyLoadDataAttrName.sizes]: sizes,
        [LazyLoadDataAttrName.srcset]: srcSet,
      } as const
      : { src, sizes, srcSet } as const;
  }, [lazy, src, sizes, srcSet]);

  // 로드 이벤트 핸들러
  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setStatus('success');
    onLoad?.(event);
  };

  // 로드 이벤트 핸들러
  const handleLoadError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setStatus('error');
    onError?.(event);
  };

  useEffect(() => {
    // lazyload 적용
    if (lazy && imageRef.current && observer) {
      observe?.(imageRef.current);
    }

    return () => {
      // lazyload 해지
      if (imageRef.current && observer) {
        unobserve?.(imageRef.current);
      }
    };
  }, [observer, observe, unobserve, imageSource]);

  /**
   * ref setting
   */
  useImperativeHandle(ref, () => imageRef.current as HTMLImageElement);

  return (
    <span className={classNames}>
      <img
        ref={imageRef}
        className="image-source"
        onLoad={handleLoad}
        onError={handleLoadError}
        alt={alt}
        {...{ ...props, ...imageSource }}
      />
      {status === 'error' && <span className="image-error" aria-label="이미지로드 실패" children={<Alert />} />}
    </span>
  );
});

/**
 * Image Component
 */
export const Image = styled(ImageComponent)`
  display: inline-block;
  overflow: hidden;
  position: relative;
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '100%' }) => height};
  line-height: 0;
  background: ${({ theme }) => theme.color.gray3};
  
  .image-source {
    position: relative;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    object-fit: cover;
    opacity: 0;

    &:not([src]) {
      visibility: hidden;
    }
  }

  .image-error {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    color: ${({ theme }) => theme.color.gray20};

    ${Alert} {
      width: 4rem;
      height: 4rem;
      opacity: 0.5;
    }
  }

  &.is-success {
    .image-source {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }

  &.is-error {
    .image-source {
      opacity: 0;
    }
  }
`;
