/**
 * 根据年月日返回一个日期对象
 * @param {number} year
 * @param {number} month
 * @param {number} day
 */
const getDate = (year, month, day) => {
  if (!year || !month || !day) {
    return new Date();
  }
  return new Date(year, month - 1, day);
};

export default getDate;
