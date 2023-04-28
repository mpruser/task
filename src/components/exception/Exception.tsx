import React, { forwardRef } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Icon } from '../icon';

interface ExceptionProps extends React.HTMLAttributes<HTMLDivElement> {
  message: React.ReactNode;
  visual?: React.ReactNode;
  full?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const ExceptionComponent = forwardRef<HTMLDivElement, ExceptionProps>(({
  full, visual, message, size = 'medium', className, ...props
}, ref) => {
  const classNames = classnames(className, `is-${size}`, { 'is-full': full });

  return (
    <div ref={ref} className={classNames} {...props}>
      {visual && <div className="exception__visual">{visual}</div>}
      <div className="exception__message">{message}</div>
    </div>
  );
});

export const Exception = styled(ExceptionComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:  column;
  color: ${({ theme }) => theme.color.black};

  .exception__visual {
    display: flex;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }

  .exception__message {
    display: flex;
    justify-content: center;
  }


  &.is-full {
    position: fixed;
    top: 0;
    left: 0;
    z-index: ${({ theme }) => theme.z.content};
    width: 100vw;
    height: 100vh;
  }

  &.is-small {
    ${Icon} {
      width: 2rem;
      height: 2rem;
    }

    .exception__message {
      font: ${({ theme }) => theme.font.body1};
    }
  }

  &.is-medium {
    ${Icon} {
      width: 2.8rem;
      height: 2.8rem;
    }

    .exception__message {
      font: ${({ theme }) => theme.font.h5};
    }
  }

  &.is-large {
    ${Icon} {
      width: 4rem;
      height: 4rem;
    }

    .exception__message {
      font: ${({ theme }) => theme.font.h4};
    }
  }
`;
