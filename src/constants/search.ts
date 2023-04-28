/**
 * 최근 검색 내역을 저장을 위한 스토리지 키
 */
export const SearchHistoryStorageKey = 'SearchHistoryStorageKey';

/**
 * 스토리지에 저장되는 검색내역 아이템 모델
 */
export type SearchHistory = {
  /**
   * 검색 아이템 ID (검색시간을 ID로 사용)
   */
  id: string;
  /**
   * 검색어
   */
  keyword: string;
}

/**
 * 검색 폼요소의 name
 */
export const SearchFieldName = {
  query: 'query',
  sort: 'sort',
} as const;

/**
 * 검색 폼요소의 value type
 */
export type SearchFieldValueType = {
  query: string;
  sort: 'accuracy' | 'recency';
}
