export const numberRange = (start: number, end: number) => {
  return new Array(end - start).fill(undefined).map((_: unknown, i: number) => i + start);
};
