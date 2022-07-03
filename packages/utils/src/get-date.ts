/**
 * 根据年月日返回一个日期对象
 * @param {number} year
 * @param {number} month
 * @param {number} day
 */
export const getDate = (year?: number, month?: number, day?: number) => {
  if (!year || !month || !day) {
    return new Date();
  }
  return new Date(year, month - 1, day);
};
