import React from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle, theme } from '@styles';
import { LazyLoadProvider, SearchHistoryProvider, QueryParamsProvider } from '@contexts';

/**
 * react-query client 생성
 */
const queryClient = new QueryClient();

/**
 * app entry (render)
 */
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <QueryParamsProvider>
          <SearchHistoryProvider>
            <LazyLoadProvider>
              content
            </LazyLoadProvider>
          </SearchHistoryProvider>
        </QueryParamsProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
