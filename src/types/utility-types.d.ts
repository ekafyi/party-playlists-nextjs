// From https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-614417742
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

type SomeRequiredElsePartial<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
