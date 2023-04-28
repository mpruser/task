import React from 'react';
import styled from 'styled-components';
import { useSearchImage } from '@hooks';
import { ImageCard, InfiniteSection, List, Spinner, Exception, Compass } from '@components';

/**
 * 검색 결과 container
 */
export const SearchResults = styled(({ className }) => {
  const { data, hasNextPage, isFetching, isSuccess, isInitialLoading, fetchNextPage } = useSearchImage();

  if (isInitialLoading) {
    return <Exception full visual={<Spinner size="large" />} message="" />;
  }

  if (!data.length) {
    return <Exception full visual={<Compass />} message={isSuccess ? '일치하는 검색결과가 없습니다' : '이미지를 검색할 수 있습니다'} />;
  }

  return (
    <div className={className}>
      <h2 className="title">검색 결과</h2>
      <InfiniteSection loading={isFetching} disabled={!hasNextPage} onReachEnd={fetchNextPage}>
        <List source={data} component={ImageCard} />
      </InfiniteSection>
    </div>
  );
})`
  padding: ${({ theme }) => `${theme.spacing.large} ${theme.spacing.large} calc(2.4em + env(safe-area-inset-bottom))`};

  .title {
    font: ${({ theme }) => theme.font.h4};
    font-weight: bold;
  }

  ${InfiniteSection} {
    margin-top: ${({ theme }) => theme.spacing.large};
  }

  ${List} {
    gap: ${({ theme }) => theme.spacing.large};
    grid-template-columns: 1fr 1fr;
  }
`;
