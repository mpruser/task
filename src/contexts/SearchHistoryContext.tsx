import React, { createContext, useState, useEffect } from 'react';
import { SearchHistoryStorageKey, SearchHistory } from '@constants';
import { useUpdateEffect } from '@hooks';

export interface SearchHistoryContextValue {
  /**
   * 검색 데이터
   */
  data: SearchHistory[];
  /**
   * 추가
   */
  add: (keyword: string) => void;
  /**
   * 삭제
   */
  remove: (id: string) => void;
  /**
   * 전체 삭제
   */
  clear: () => void;
}

/**
 * 검색 내역을 저장하고 조회하기 위한 Context
 */
export const SearchHistoryContext = createContext<SearchHistoryContextValue>({
  data: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
});

export interface SearchHistoryProviderProps {
  children: React.ReactNode;
}

/**
 * 검색 내역을 저장하고 조회하기 위한 ContextProvider
 */
export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({ children }) => {
  const [data, setData] = useState<SearchHistory[]>([]);

  const add = (keyword: string) => {
    // 중복 제거
    const filteredSearches = data.filter(
      (search) => search.keyword !== keyword,
    );

    const newSearch: SearchHistory = {
      id: Date.now().toString(),
      keyword,
    };

    setData([newSearch, ...filteredSearches]);
  };

  const remove = (id: string) => {
    setData(data.filter((search) => search.id !== id));
  };

  const clear = () => {
    setData([]);
  };

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem(SearchHistoryStorageKey);

    if (dataFromLocalStorage) {
      setData(JSON.parse(dataFromLocalStorage));
    }
  }, []);

  useUpdateEffect(() => {
    localStorage.setItem(SearchHistoryStorageKey, JSON.stringify(data));
  }, [data]);

  return (
    <SearchHistoryContext.Provider value={{ data, add, remove, clear }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
