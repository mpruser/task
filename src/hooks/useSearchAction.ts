import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GetSearchImageParams } from '@apis';
import { SearchFieldName, SearchHistory, SearchQueryKeys } from '@constants';
import { SearchHistoryContext, QueryParamsContext } from '@contexts';

/**
 * 최근 검색 내역 hook
 */
export const useSearchAction = () => {
  const queryClient = useQueryClient();
  const { getQueryParam, updateQueryParam } = useContext(QueryParamsContext);
  const { data, add, clear } = useContext(SearchHistoryContext);

  /**
   * 검색하기
   */
  const search = ({ query }: GetSearchImageParams) => {
    const curQuery = getQueryParam(SearchFieldName.query);

    if (query) {
      curQuery === query
        ? queryClient.resetQueries({ queryKey: SearchQueryKeys.query({ query }), refetchPage: () => true })
        : updateQueryParam({ query });
      add(query);
    }
  };

  /**
   * 최근 검색 내역 전체 삭제
   */
  const removeAll = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('최근 검색어를 모두 삭제하시겠습니까?')) {
      clear();
    }
  };

  /**
   * 키워드 재검색
   */
  const rediscover = ({ keyword }: SearchHistory) => {
    keyword && search({ query: keyword });
  };

  return {
    history: data || [],
    search,
    removeAll,
    rediscover,
    getQueryParam,
  };
};
