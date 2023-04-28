/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { SearchFieldName } from '@constants';
import { useSearchAction } from '@hooks';
import { Button, List, TextField, Search } from '@components';

export const SearchHeader = styled(({ className }) => {
  const { history, search, removeAll, rediscover: handleRediscover } = useSearchAction();
  const [isFieldActive, setFieldActiveState] = useState<boolean>(false);

  const searchFormRef = useRef<HTMLDivElement>(null);

  /**
   * 검색필드에 포커스되었을 때 최근검색내역 영역활성화
   */
  const handelFocusField = () => {
    setFieldActiveState(true);
  };

  /**
   * 검색폼 & 최근검색내역 외의 영역을 터치할 경우
   * 최근검색내역 영역을 hide 처리
   */
  const handleOutsideTouch = () => {
    setFieldActiveState(false);
    // 휘발되는 포커스 영역을 검색영역으로 되돌림
    searchFormRef.current?.focus();
  };

  /**
   * 최근 검색 내역 전체삭제
   */
  const handleClickRemoveALL = () => {
    removeAll();
    // 휘발되는 포커스 영역을 검색영역으로 되돌림
    searchFormRef.current?.focus();
  };

  /**
   * 검색 액션
   */
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldActiveState(false);
    search(e);
  };

  return (
    <div className={className}>
      <div className="search__inner">
        <div className="search__form" ref={searchFormRef} tabIndex={0}>
          <form onSubmit={handleSubmit}>
            <TextField
              size="medium"
              placeholder="검색어를 입력해주세요"
              name={SearchFieldName.query}
              onFocus={handelFocusField}
              suffix={(<Button type="submit" size="small" children={<Search />} />
              )}
            />
          </form>
        </div>

        {!!history.length && isFieldActive && (
          <div className="search__history">
            <div className="search__history__header">
              <h2 className="title">최근 검색어</h2>
              <Button
                className="action-delete"
                size="small"
                children="전체 삭제"
                onClick={handleClickRemoveALL}
              />
            </div>
            <List
              className="search__history__content"
              source={history}
              render={(item) => (
                <Button
                  block
                  textAlign="left"
                  children={item.keyword}
                  onClick={() => handleRediscover(item)}
                />
              )}
            />
          </div>
        )}

        {isFieldActive && (
          <div className="search__dimmed" onTouchMove={handleOutsideTouch} />
        )}
      </div>
    </div>
  );
})`
  height: 7.7rem;

  .search__inner {
    position: fixed;
    top: -0.1rem;
    left:0;
    width: 100%;
    z-index: ${({ theme }) => theme.z.header};
  }
  
  .search__form {
    position: relative;
    z-index: 1;
    padding: ${({ theme }) => theme.spacing.large};
    background: ${({ theme }) => theme.color.white};
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.gray8};
    
    ${Button} {
      width: 4.5rem;
      height: 4.5rem;
    }

    ${Search} {
      width: 2.5rem;
      height: 2.5rem;
    }
  }

  .search__history{
    position: absolute;
    top: calc(100% - 0.1rem);
    left: 0;
    z-index: 2;
    width: 100%;
    background: ${({ theme }) => theme.color.white};
    border-top: 0.1rem solid ${({ theme }) => theme.color.gray8};
    border-bottom: 0.1rem solid ${({ theme }) => theme.color.gray8};

    .search__history__header {
      position: relative;
      padding: ${({ theme }) => theme.spacing.large};
      
      .title {
        font: ${({ theme }) => theme.font.h5};
        font-weight: bold;
      }
  
      .action-delete {
        position: absolute;
        top: 50%;
        right: ${({ theme }) => theme.spacing.large};
        transform: translateY(-50%);
      }
    }
  
    .search__history__content {
      overflow: hidden;
      overflow-y: auto;
      max-height: 25rem;
  
      ${Button} {
        border-radius: 0;
      }
    }
  }

  .search__dimmed {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: calc(100vh + 0.1rem);;
    background: ${({ theme }) => theme.color.black};
    opacity: 0.5;
  }
`;
