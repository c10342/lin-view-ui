export const getYearMonthDay = (date) => {
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { year, month, day };
};

export const getDate = (year, month, day) => {
  if (!year || !month || !day) {
    return new Date();
  }
  return new Date(year, month - 1, day);
};

export default {
  getYearMonthDay,
  getDate,
};
