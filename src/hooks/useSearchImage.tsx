import { useCallback, useContext } from 'react';
import { useInfiniteQuery, QueryFunctionContext } from '@tanstack/react-query';
import { getSearchImage, GetSearchImageParams } from '@apis';
import { SearchQueryKeys } from '@constants';
import { QueryParamsContext } from '@contexts';
import { toImageCardModel } from '@models';

/**
 * 이미지 조회 (query parameter의 변경에 따른 이미지 검색 결과를 반환)
 */
export const useSearchImage = () => {
  const { getQueryParam } = useContext(QueryParamsContext);

  const query = getQueryParam('query') || '';
  const sort = getQueryParam('sort') as GetSearchImageParams['sort'] || 'accuracy';

  /**
   * react query function
   */
  const queryFn = useCallback(({ queryKey, pageParam }: QueryFunctionContext<ReturnType<typeof SearchQueryKeys['query']>, string>) => {
    const [{ params }] = queryKey;
    return getSearchImage({ ...params, page: +(pageParam || 1) });
  }, []);

  /**
   * react query infiniteQuery
   */
  const infiniteQuery = useInfiniteQuery(SearchQueryKeys.query({ query, sort }), queryFn, {
    enabled: !!query,
    retry: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    getNextPageParam: ({ meta }, pages) => (!meta.is_end ? pages.length + 1 : undefined),
    select: ({ pages, pageParams }) => ({
      pages: toImageCardModel(pages.flatMap(({ documents }) => documents)),
      pageParams,
    }),
  });

  return {
    ...infiniteQuery,
    data: infiniteQuery.data?.pages || [],
  };
};
