/**
 * 获取浏览器滚动的距离
 */
function getScrollLeftAndTop() {
  return {
    left:
      window.pageXOffset
      || document.documentElement.scrollLeft
      || document.body.scrollLeft
      || 0,
    top:
      window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop
      || 0
  };
}

/**
 * 文档的总高度
 */
function getScrollHeightAndWidth() {
  return {
    height:
      document.documentElement.scrollHeight || document.body.scrollHeight || 0,
    width:
      document.documentElement.scrollWidth || document.body.scrollWidth || 0
  };
}

export function getScroll() {
  const scrollHeightAndWidth = getScrollHeightAndWidth();
  const scrollLeftAndTop = getScrollLeftAndTop();
  return {
    scrollHeight: scrollHeightAndWidth.height,
    scrollWidth: scrollHeightAndWidth.width,
    scrollLeft: scrollLeftAndTop.left,
    scrollTop: scrollLeftAndTop.top
  };
}
