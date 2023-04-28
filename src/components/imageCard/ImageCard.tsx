/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Image, Conditional } from '@components';

export interface ImageCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * image url
   */
  src: string;
  /**
   * image 제목
   */
  title: string;
  /**
   * image 설명
   */
  description: string;
  /**
   * 링크 URL
   */
  link?: string;
}

export const ImageCardComponent = forwardRef<HTMLDivElement, ImageCardProps>(({ title, description, src, link, className, ...props }, ref) => {
  const classNames = classnames(className, { 'is-linkable': !!link });
  return (
    <div ref={ref} className={classNames} {...props}>
      <Conditional condition={!!link} trueExp={<a className="card__link" href={link} />} falseExp={<></>}>
        <span className="card__cover">
          <Image lazy src={src} />
        </span>
        <span className="card__content">
          <span className="card__title">{title}</span>
          <span className="card__description">{description}</span>
        </span>
      </Conditional>
    </div>
  );
});

/**
 * ImageCard Component
 */
export const ImageCard = styled(ImageCardComponent)`
  --direction: 0.2s;
  --radius: 0.8rem;

  overflow: hidden;
  border-radius: var(--radius);
  transform: translate3d(0, 0, 0);
  transition: box-shadow var(--direction);

  .card__link {
    display: block;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius);
    box-shadow: 0 0 0 1px inset ${({ theme }) => theme.color.gray8};
  }

  .card__cover {
    display: block;
    overflow: hidden;
    position: relative;
    width: 100%;
    padding-top: 100%;
    font-size: 0;

    ${Image} {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  .card__content {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 7.4rem;
    padding: 1.6rem 1.5rem 1.2rem;
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
    border-top: none;
    transition: border var(--direction);
  }

  .card__title,
  .card__description {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    font: ${({ theme }) => theme.font.h6};
  }

  .card__title {
    color: ${({ theme }) => theme.color.black}; 
    font-weight: bold;
  }

  .card__description {
    margin-top: 0.5rem;
    color:${({ theme }) => theme.color.gray20}; 
  }

  &.is-linkable:active {
    box-shadow: 0 1px 2px -2px rgba(0,0,0,.16), 0 3px 6px 0 rgba(0,0,0,.12), 0 5px 12px 4px rgba(0,0,0,.09);

    .card__content {
      border-color: transparent;
    }
  }
`;
