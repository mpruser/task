import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'| 'prefix'> {
  /**
   * size 설정
   * @default medium
   */
  size?: 'large' |'medium'|'small';
  /**
   * error 상태
   * @default false
   */
  error?: boolean;
  /**
   * 앞에 붙일 요소
   */
  prefix?: React.ReactNode;
  /**
   * 뒤에 붙일 요소
   */
  suffix?: React.ReactNode;
}

export const TextFieldComponent = forwardRef<HTMLInputElement, TextFieldProps>((
  {
    size = 'medium', error, disabled, className, prefix, suffix, onFocus, onBlur, ...props
  }, ref,
) => {
  // input요소의 focus 상태를 체크하기 위한 state
  const [active, setActiveState] = useState<boolean>(false);

  const classNames = classnames(className, `is-${size}`, {
    'is-error': error,
    'is-active': active,
    'is-disabled': disabled,
  });

  /**
   * focusin 대한 이벤트 콜백으로 active state 업데이트, onFocus 이벤트 props를 호춯
   */
  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocus?.(e);
    setActiveState(true);
  };

  /**
   * focusout에 대한 이벤트 콜백으로 active state 업데이트, onBlur 이벤트 props를 호춯
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(e);
    setActiveState(false);
  };

  return (
    <span className={classNames}>
      {prefix && <span className="textfield__prefix">{prefix}</span>}
      <span className="textfield__input">
        <input
          ref={ref}
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        />
      </span>
      {suffix && <span className="textfield__suffix">{suffix}</span>}
    </span>
  );
});

/**
 * TextField Component
 */
export const TextField = styled(TextFieldComponent)`
 --active-direction: 0.1s;

  display: flex;
  overflow: hidden;
  box-shadow: ${({ theme }) => `0 0 0 0.1rem ${theme.color.black}`};
  border-radius: 1.2rem;
  transition: box-shadow var(--active-direction);

  .textfield__prefix,
  .textfield__suffix {
    display: flex;
    flex-shrink: 0;
    line-height: 0;
    justify-content: center;
    align-items: center;
  }

  .textfield__input {
    display: block;
    flex-grow: 1;
    flex-shrink: 0;
  }
  
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border: 0;
    outline: 0;
    font: inherit;
    color: ${({ theme }) => theme.color.black};

    &::placeholder {
      color: ${({ theme }) => theme.color.gray30};
      transition: color var(--active-direction);
    }
  }

  &.is-small {
    font: ${({ theme }) => theme.font.h6};

    input{
      padding: 0.8rem 1.2rem;
    }    
  }

  &.is-medium {
    font: ${({ theme }) => theme.font.h5};

    input{
      padding: 1.2rem 1.6rem;
    }
  }
  
  &.is-large {
    font: ${({ theme }) => theme.font.h5};
    
    input{
      padding: 1.6rem;
    }
  }
  
  &.is-active {
    box-shadow: ${({ theme }) => `0 0 0 0.2rem ${theme.color.black}`};
  }
  
  &.is-error {
    outline-color: ${({ theme }) => theme.color.error};

    input {
      color: ${({ theme }) => theme.color.error};

      &::placeholder {
        color: currentColor;
      }
    }
  }

  &.is-is-disabled {
    background: ${({ theme }) => theme.color.gray50};
  }
`;
