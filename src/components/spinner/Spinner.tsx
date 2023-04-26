import React, { forwardRef } from 'react';
import styled, { keyframes } from 'styled-components';
import classnames from 'classnames';

const spinnerContainer = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const spinnerCircle = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Spinner 사이즈
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
}

export const SpinnerComponent = forwardRef<HTMLSpanElement, SpinnerProps>((
  { className, size, ...props }, ref,
) => (
  <span ref={ref} className={classnames(className, `is-${size}`)} {...props}>
    <span className="spinner__inner">
      <svg viewBox="22 22 44 44" xmlns="http://www.w3.org/2000/svg" className="spinner-and">
        <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" className="spinner-and-circle" />
      </svg>
    </span>
  </span>
));

/**
 * Spinner Component
 */
export const Spinner = styled(SpinnerComponent)`
  --direction: 1.4s;

  display: inline-block;
  width: inherit;
  height: inherit;
  color: inherit;
  line-height: 0;
  
  .spinner__inner {
    display: inline-block;
    width: 100%;
    height: 100%;
    animation: ${spinnerContainer} var(--direction) linear infinite;
  }

  .spinner-and-circle {
    stroke-dasharray: 106px, 266px;
    stroke-dashoffset: 0px;
    stroke: currentColor;
    animation: ${spinnerCircle} var(--direction) ease-in-out infinite;
  }

  &.is-small {
    width: 2rem;
    height: 2rem;
  }

  &.is-medium {
    width: 2.8rem;
    height: 2.8rem;
  }

  &.is-large {
    width: 4rem;
    height: 4rem;
  }
`;
