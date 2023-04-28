import React from 'react';
import styled from 'styled-components';
import { SearchHeader, SearchResults } from '@containers';

export const SearchImagePage = styled(({ className }) => {
  return (
    <div className={className}>
      <SearchHeader />
      <SearchResults />
    </div>
  );
})``;
