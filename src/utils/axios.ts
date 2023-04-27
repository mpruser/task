import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

/**
 * AxiosCreateModel 인터페이스: Axios 인스턴스를 생성할 때 필요한 설정 값을 정의하는 인터페이스
 */
export interface AxiosCreateModel {
  /** Axios 요청을 보낼 기본 URL */
  baseURL: string;
  /** Axios 요청에 사용될 헤더 */
  headers?: CreateAxiosDefaults['headers'];
  /** 요청에 자격증명 정보를 포함할지 여부 */
  withCredentials?: boolean;
  /** Axios 요청에 사용될 설정 값 */
  config?: AxiosRequestConfig;
}

/**
 * ErrorDataModel 타입: HTTP 요청 중에 발생한 에러 정보를 담는 타입
 */
export type ErrorDataModel = string | {
   /** 에러의 종류 */
  errorType: string;
   /** 에러 메시지 */
  message: string;
}

/**
 * ErrorModel 인터페이스: Axios 요청 중에 발생한 에러 정보를 담는 인터페이스
 */
export interface ErrorModel<T = ErrorDataModel, D = any> {
   /** 에러 데이터 */
  data: T | undefined;
   /** 에러 메시지 */
  message: string;
   /** 에러 코드 */
  code?: string;
   /** HTTP 상태 코드 */
  status?: number;
   /** Axios 요청 설정 값 */
  config?: InternalAxiosRequestConfig<D>;
}

/**
 * pickAxiosData 함수: Axios 요청에 대한 응답에서 data 속성을 추출하는 함수
 */
const pickAxiosData = <T>(res: AxiosResponse<T>) => {
  return res.data;
};

/**
 * pickAxiosError 함수: Axios 요청 중에 발생한 에러에서 에러 정보를 추출하는 함수
 */
const pickAxiosError = <T>({ response, code, message, config }:AxiosError<T>): ErrorModel<T> => {
  return {
    code,
    config,
    message,
    data: response?.data, // 에러 데이터
    status: response?.status, // HTTP 상태 코드
  };
};

/**
 * createAxios 함수: Axios 인스턴스를 생성하는 함수
 */
export const createAxios = ({ baseURL, headers, withCredentials = false, config }: AxiosCreateModel) => {
  // Axios 인스턴스 생성
  const fetch = axios.create({
    baseURL,
    headers,
    withCredentials,
    ...config,
  });

  // Axios 응답 인터셉터 설정
  fetch.interceptors.response.use(
    (__) => __,
    (error) => {
      if (!axios.isCancel(error)) {
        // exception
      }
      return Promise.reject(error);
    },
  );

  // get, post, put, delete 등의 HTTP 요청을 보낼 수 있는 메소드를 가지는 객체 반환
  return {
    ...fetch,
    async get<Response, Params = Record<string, unknown>, Error = void>(
      url: string,
      params?: Params,
      _config?: AxiosRequestConfig,
    ) {
      try {
        const res = await fetch.get<Response>(url, { ..._config, params });
        return pickAxiosData(res);
      } catch (error) {
        return Promise.reject(pickAxiosError<Error>(error as AxiosError<Error>));
      }
    },
    async post<Response, Data = Record<symbol, unknown>, Error = void>(url: string, data?: Data) {
      try {
        const res = await fetch.post<Response>(url, data);
        return pickAxiosData(res);
      } catch (error) {
        return Promise.reject(pickAxiosError<Error>(error as AxiosError<Error>));
      }
    },
    async put<Response, Data = Record<string, unknown>, Error = void>(
      url: string,
      data?: Data,
      _config?: AxiosRequestConfig,
    ) {
      try {
        const res = await fetch.put<Response>(url, data, _config);
        return pickAxiosData(res);
      } catch (error) {
        return Promise.reject(pickAxiosError<Error>(error as AxiosError<Error>));
      }
    },
    async delete<Response, Data = Record<string, unknown>, Error = void>(url: string, data?: Data) {
      try {
        const res = await fetch.delete<Response>(url, { data });
        return pickAxiosData(res);
      } catch (error) {
        return Promise.reject(pickAxiosError<Error>(error as AxiosError<Error>));
      }
    },
  };
};

export const fetch = createAxios({
  baseURL: 'https://dapi.kakao.com/',
  headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
});
