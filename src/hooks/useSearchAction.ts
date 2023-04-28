import { useContext } from 'react';
import { GetSearchImageParams } from '@apis';
import { SearchFieldName, SearchHistory } from '@constants';
import { SearchHistoryContext, QueryParamsContext } from '@contexts';

/**
 * 최근 검색 내역 hook
 */
export const useSearchAction = () => {
  const { updateQueryParam } = useContext(QueryParamsContext);
  const { data, add, clear } = useContext(SearchHistoryContext);

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get(SearchFieldName.query) as string;

    if (query) {
      updateQueryParam({ query });
      add(query);
    }
  };
  /**
   * 최근 검색 내역 전체 삭제
   */
  const removeAll = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('최근검색어를 모두 삭제하시겠습니까?')) {
      clear();
    }
  };

  /**
   * 키워드 재검색
   */
  const rediscover = ({ keyword }: SearchHistory) => {
    if (keyword) {
      const param: Pick<GetSearchImageParams, 'query'> = { query: keyword };
      updateQueryParam(param);
      add(keyword); // 재검색 키워드를 상위로 노출하기 위한 add
    }
  };

  return {
    history: data || [],
    search,
    removeAll,
    rediscover,
  };
};