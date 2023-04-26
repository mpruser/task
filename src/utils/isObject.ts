/**
 * 값이 Object인지 체크합니다.
 * @param item - object 타입인지 체크할 데이터
 * @returns boolean;
 */
export const isObject = (item: unknown): item is Record<string, any> => {
  return typeof item === 'object' && item !== null && !Array.isArray(item) && !(item instanceof Date) && !(item instanceof RegExp);
};
