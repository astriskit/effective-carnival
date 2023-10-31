const parseIfString = (s: string | number, parseFn: (s: string) => number) => {
  if (typeof s === "number") return s;
  return parseFn(s);
};

const parseIfStringToFloat = (s: string | number) => {
  return parseIfString(s, parseFloat);
};

export const displayTwo = (s: string | number) => {
  return parseIfStringToFloat(s).toFixed(2);
};
