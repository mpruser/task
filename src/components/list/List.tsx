import React, { Fragment, forwardRef, createElement, useMemo } from 'react';
import styled, { StyledComponent, DefaultTheme } from 'styled-components';
import { isObject } from '@utils/isObject';

type ListElement = HTMLUListElement | HTMLOListElement | HTMLDivElement | HTMLSpanElement;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SourceType = Record<string, any> | number | string;

export interface ListProps<S extends SourceType = SourceType>
  extends React.HTMLAttributes<ListElement> {
  /**
   * 컨테이터 element 설정
   * @default  div
   */
  is?: 'ul' | 'ol' | 'div' | 'span';
  /**
   * component 혹은 render에 전달할 데이터
   */
  source?: S[];
  /**
   * list item의 간격
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/gap
   */
  gap?: string;
  /**
   * column 수를 결정
   * (columnCount:3 => grid-template-column: 1fr 1fr 1fr)
   */
  columnCount?: number;
  /**
   * 반복적으로 렌더링할 컴포넌트
   */
  component?:
    | (JSX.IntrinsicAttributes & React.ComponentType<S>)
    | StyledComponent<React.ComponentType<S>, DefaultTheme>
  /**
   * component로 처리할 수 없는 경우를 위한 render
   */
  render?: (source: S, index: number) => React.ReactNode;
  /**
   * JSX map() key 필수 지정을 권장
   */
  getKey?: (source: S, index: number) => string;
  /**
   * @beta getHandlers의 반환값이 제네릭타입의 nested한 object value로 타입추론이 완벽하지 않음
   */
  getHandlers?: (source: S, index: number) => Partial<PickFunctionProperty<S>>;
}

/**
 * List Component
 */
export const List = styled(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forwardRef<unknown, ListProps>(
    ({
      is = 'div', source, component, gap, columnCount, render, getKey, getHandlers, children, ...props
    }, ref) => {
      /**
       * data(source)를 참조하여 리스트 아이템에 전달할 key값 생성
       */
      const getItemKey = (item: SourceType, index: number): string => {
        return getKey ? getKey(item, index) : `${index}`;
      };

      /**
       * 이벤트 핸들러 생성
       */
      const getItemHandlers = (
        item: SourceType, index: number,
      ): Partial<PickFunctionProperty<SourceType>> => {
        return getHandlers ? getHandlers(item, index) : {};
      };

      /**
       * component props를 통해 ChildNode를 생성
       */
      const ComponentNode = useMemo(() => {
        if (!source || !component) {
          return null;
        }

        return source?.map((item, index) => (isObject(item) ? (
          createElement(component, { key: getItemKey(item, index), ...item, ...getItemHandlers(item, index) })
        ) : (
          createElement(component, { key: getItemKey(item, index) }, [item])
        )));
      }, [source, component, getKey]);

      /**
       * render props를 통해 ChildNode를 생성
       */
      const RenderNodes = useMemo(() => {
        if (!source || !render) {
          return null;
        }

        return source?.map((item, index) => (
          <Fragment key={getItemKey(item, index)}>
            {isObject(item) ? render({ ...item, ...getItemHandlers(item, index) }, index) : render(item, index)}
          </Fragment>
        ));
      }, [source, render, getKey]);

      return createElement(is, { ...props, ref }, [children, ComponentNode, RenderNodes]);
    },
  ),
)`
  display: grid;
  ${({ columnCount }) => columnCount && `grid-template-columns: ${Array(columnCount).fill('1fr').join(' ')};`}
  ${({ gap }) => gap && `gap: ${gap};`}
` as (<T extends SourceType = SourceType>(
  props: ListProps<T> & { ref?: React.ForwardedRef<ListElement> },
) => ReturnType<React.ForwardRefExoticComponent<ListProps<T> & React.RefAttributes<ListElement>>>) &
  string;
