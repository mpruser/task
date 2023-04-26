/**
 * 옵셔널 프로퍼티(메소드)를 필수값으로 변경
 */
declare type ToRequired<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * 함수프로퍼티(메소드)만 추출
 */
declare type PickFunctionProperty<
  T,
  O = T extends {} ? ToRequired<T> : Record<string, unknown>,
  F = { [key in keyof O]: O[key] extends Function ? key : '' },
  K = Exclude<F[keyof F], ''>,
> = Pick<T, K extends keyof T ? K : never>;
