export const assertFulfilled = <T>(item: PromiseSettledResult<T>): item is PromiseFulfilledResult<T> => {
  return item.status === "fulfilled";
};

// From https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-614417742
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;
