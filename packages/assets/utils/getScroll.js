/**
 * 获取浏览器滚动的距离
 */
function getScroll() {
  return {
    left:
      window.pageXOffset ||
      document.documentElement.scrollLeft ||
      document.body.scrollLeft ||
      0,
    top:
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0,
  };
}

export default getScroll;
