import React, { createContext, useState } from 'react';

export interface QueryParamsContextValue {
  /**
   * URLSearchParams 객체
   */
  queryParams: URLSearchParams;
  /**
   * queryParams update
   */
  updateQueryParam: (params: Record<string, null | undefined | string | number | boolean>) => void;
  /**
   * queryParams item delete
   */
  deleteQueryParam: (key: string) => void;
  /**
   * queryParams get item
   */
  getQueryParam: (key: string) => string | null;
}

/**
 * QueryParamsContext
 */
export const QueryParamsContext = createContext<QueryParamsContextValue>({
  queryParams: new URLSearchParams(),
  updateQueryParam: () => {},
  deleteQueryParam: () => {},
  getQueryParam: () => null,
});

export interface QueryParamsProviderProps {
  children: React.ReactNode;
}

/**
 * QueryParamsProvider
 */
export const QueryParamsProvider = ({ children }:QueryParamsProviderProps) => {
  const [queryParams, setQueryParams] = useState<URLSearchParams>(new URLSearchParams(window.location.search));

  const getQueryParam = (key: string) => {
    const value = queryParams.get(key);
    return value !== null ? decodeURIComponent(value) : null;
  };

  const deleteQueryParam = (key: string) => {
    const newParams = new URLSearchParams(queryParams.toString());

    if (newParams.has(key)) {
      newParams.delete(key);
      window.history.replaceState(null, '', `?${newParams.toString()}`);
      setQueryParams(newParams);
    }
  };

  const updateQueryParam = (params: Record<string, null | undefined | string | number | boolean>) => {
    const newParams = new URLSearchParams(queryParams.toString());

    Object.keys(params).forEach((key) => {
      const value = params[key];

      if (value !== '' && value !== null && value !== undefined) {
        newParams.set(key, encodeURIComponent(value));
      }
    });

    window.history.replaceState(null, '', `?${newParams.toString()}`);
    setQueryParams(newParams);
  };

  return (
    <QueryParamsContext.Provider value={{ queryParams, getQueryParam, updateQueryParam, deleteQueryParam }}>
      {children}
    </QueryParamsContext.Provider>
  );
};
