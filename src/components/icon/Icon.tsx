import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Theme } from '@styles/theme';

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height' | 'children'> {
  /**
   * SVG Element
   */
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  /**
   * 아이콘 넓이
   */
  width?: string;
  /**
   * 아이콘 높이
   */
  height?: string;
  /**
   * 아이콘 색상
   * @default inherit
   */
  color?: string;
}

export const IconComponent = forwardRef<SVGSVGElement, IconProps>(
  ({
    width, height, color, icon: SVGIcon, ...props
  }, ref) => <SVGIcon ref={ref} {...props} />,
);

/**
 * Icon Component
 */
export const Icon = styled(IconComponent)`
  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
  ${({ theme, color }) => `color: ${(theme.color[color as keyof Theme['color']]) || color || 'inherit'}`};

  & *[fill] {
    fill: currentColor;
  }
  & *[stroke] {
    stroke: currentColor;
  }
`;
