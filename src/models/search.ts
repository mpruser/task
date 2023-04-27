import { GetSearchImageResponse } from '@apis';
import { ImageCardProps } from '@components';

export const toImageCardModel = (schema: GetSearchImageResponse['documents']): ImageCardProps[] => schema.map((item) => ({
  src: item.image_url,
  title: item.collection,
  description: item.display_sitename,
  link: item.doc_url,
}));
