/**
 * 根据日期对象返回年月日
 * @param {Date} date
 */
const getYearMonthDay = (date?: Date) => {
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return { year, month, day };
};

export default getYearMonthDay;
