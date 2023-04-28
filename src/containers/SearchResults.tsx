import React from 'react';
import styled from 'styled-components';
import { useSearchImage } from '@hooks';
import { ImageCard, InfiniteSection, List } from '@components';

/**
 * 검색 결과 container
 */
export const SearchResults = styled(({ className }) => {
  const { data, hasNextPage, isFetching, isInitialLoading, fetchNextPage } = useSearchImage();

  if (isInitialLoading) {
    return null;
  }

  if (!data.length) {
    return null;
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
