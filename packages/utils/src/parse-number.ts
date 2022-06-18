const parseNumber = (number: string | number, radix?: number) => {
  return parseInt(number as string, radix);
};

export default parseNumber;
