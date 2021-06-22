// 是否处于浏览器全屏
export const isBrowserFullscreen = () =>
  document.fullscreenElement ||
  document.msFullscreenElement ||
  document.mozFullScreenElement ||
  document.webkitFullscreenElement ||
  false;

// 是否允许浏览器全屏
export const isBrowserFullscreenEnabled = () =>
  document.fullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.msFullscreenEnabled ||
  false;

// 进入全屏
export const enterBrowserFullScreen = element => {
  if (!element) {
    return;
  }
  if (isBrowserFullscreenEnabled() && !isBrowserFullscreen()) {
    // 允许浏览器全屏，并且当前不是处于浏览器全屏的状态下
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
};
// 退出全屏
export const exitBrowserFullscreen = () => {
  if (isBrowserFullscreenEnabled() && isBrowserFullscreen()) {
    // 允许浏览器全屏，并且当前处于浏览器全屏状态下
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
};
