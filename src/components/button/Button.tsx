import React, { forwardRef } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Spinner } from '@components';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'> {
  /**
   * block box모델 여부
   */
  block?: boolean;
  /**
   * 로딩 여부
   */
  loading?: boolean;
  /**
   * button 사이즈
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 색상 지정 방식
   * @default text
   */
  fill?: 'text' | 'contained' | 'outlined';
  /**
   * 좌측에 표시할 아이콘 요소
   */
  prefixIcon?: React.ReactNode;
  /**
   * 우측에 표시할 아이콘 요소
   */
  suffixIcon?: React.ReactNode;
}

export const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(({
  type = 'button', size = 'medium', fill = 'text', block, loading, prefixIcon, suffixIcon, disabled, className, children, ...props
}, ref) => {
  const classNames = classnames(className, `is-fill-${fill}`, `is-${size}`, {
    'is-block': block,
    'is-loading': loading,
    'is-disabled': disabled,
  });

  return (
    <button ref={ref} type={type} className={classNames} {...props}>
      <span className="button__inner">
        {prefixIcon && <span className="button__prefix" children={prefixIcon} />}
        <span className="button__content" children={children} />
        {suffixIcon && <span className="button__suffix" children={suffixIcon} />}
      </span>
      {loading && <Spinner size="small" className="button__spinner" />}
    </button>
  );
});

/**
 * Button Component
 */
export const Button = styled(ButtonComponent)`
  --direction: 0.2s;

  display: inline-block;
  position: relative;
  box-sizing: border-box;
  transition: all var(--direction);
  vertical-align: middle;
  user-select: none;
  font: ${({ theme }) => theme.font.h5};

  .button__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.small};
    transition: all var(--direction);
  }

  .button__prefix {
    display: block;
    flex-shrink: 0;
    line-height: 0;
  }

  .button__suffix {
    display: block;
    flex-shrink: 0;
    line-height: 0;
  }

  .button__content {
    display: block;
    flex-shrink: 0;
  }

  
  .button__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    line-height: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.2s;
  }

  &.is-small {
    padding: 1.2rem 0.4rem;
    border-radius: 10rem;
  }

  &.is-medium {
    padding: 1.6rem 1.2rem;
    border-radius: 1.2rem;
  }

  &.is-large {
    padding: 1.6rem;
    border-radius: 1.2rem;
  }

  &.is-fill {
    &-text,
    &-contained,
    &-outlined {
      &:hover:not(.is-disabled) .button__inner {
        transform: scale(1.01);
      }

      &:active:not(.is-disabled) .button__inner {
        transform: scale(0.98);
      }
    }

    &-text {
      color: ${({ theme }) => theme.color.black};

      &.is-disabled {
        color: ${({ theme }) => theme.color.gray30};
      }

      &:not(.is-disabled) {
        &:hover {
          background-color: ${({ theme }) => theme.color.gray3};
        }
        &:active {
          background-color: ${({ theme }) => theme.color.gray8};
        }
      }
    }

    &-contained {
      background-color: ${({ theme }) => theme.color.black};
      color: ${({ theme }) => theme.color.white};

      &.is-disabled {
        background-color: ${({ theme }) => theme.color.gray20};
        color: ${({ theme }) => theme.color.gray30};
      }
    }

    &-outlined {
      border: 0.1rem solid ${({ theme }) => theme.color.gray20};

      &.is-disabled {
        color: ${({ theme }) => theme.color.gray30};
      }

      &:not(.is-disabled) {
        &:hover{
          background-color: ${({ theme }) => theme.color.gray3};
        }

        &:active {
          background-color: ${({ theme }) => theme.color.gray8};
        }
      }
    }
  }

  &.is-block {
    display: block;
    width: 100%;
  }

  &.is-loading {
    .button__inner {
      opacity: 0;
    }

    .button__spinner {
      opacity: 1;
    }
  }
`;
