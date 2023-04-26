import axios from 'axios';

/**
 * 이미지 조회 파라미터
 */
export interface GetImageParams {
  query: string;
  sort?: 'accuracy' | 'recency';
  page?: number;
  size?: number;
}

/**
 * 이미지 조회 응답값
 */
export interface GetImageResponse {
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
export const getImage = (params:GetImageParams) => {
  return axios.get<GetImageResponse>('https://dapi.kakao.com/v2/search/image', {
    params,
    headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
  });
};
