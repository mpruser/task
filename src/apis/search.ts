import { fetch } from '@utils';

/**
 * 이미지 조회 파라미터
 */
export interface GetSearchImageParams {
  query: string;
  sort?: 'accuracy' | 'recency';
  page?: number;
  size?: number;
}

/**
 * 이미지 조회 응답값
 */
export interface GetSearchImageResponse {
  meta: {
    'total_count': number,
    'pageable_count': number,
    'is_end': boolean;
  },
  documents: {
    collection: string;
    width: number;
    height: number;
    datetime: string;
    'display_sitename': string;
    'doc_url': string;
    'image_url': string;
    'thumbnail_url': string;
  }[];
}

/**
 * 이미지 조회 API
 */
export const getSearchImage = ({ query, sort = 'accuracy', size = 10, page }: GetSearchImageParams) => {
  return fetch.get<GetSearchImageResponse>('v2/search/image', { query, sort, size, page });
};
