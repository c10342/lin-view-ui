/**
 * 浏览器视口的宽高
 */
function getWindowHeightAndWidth () {
  let windowHeight = 0;
  let windowWidth = 0;
  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
    windowWidth = document.documentElement.clientWidth;
  } else {
    windowHeight = document.body.clientHeight;
    windowWidth = document.body.clientWidth;
  }
  return { windowHeight, windowWidth };
}

export default getWindowHeightAndWidth;
