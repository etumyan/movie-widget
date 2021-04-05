export const numberRange = (start: number, end: number) => {
  return new Array(end - start).fill(undefined).map((_: any, i: number) => i + start);
};
