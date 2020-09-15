export const isDOM = (dom) => {
  const fn =
    typeof HTMLElement === "object"
      ? function(obj) {
          return obj instanceof HTMLElement;
        }
      : function(obj) {
          return (
            obj &&
            typeof obj === "object" &&
            obj.nodeType === 1 &&
            typeof obj.nodeName === "string"
          );
        };

  return fn(dom);
};

export const handleType = (type) => {
  if (!type) {
    throw "type 没有定义";
  } else if (type !== "hls" && type !== "mp4") {
    throw "type 只能是 hls 或者 mp4";
  }
};

export const handleEl = (el) => {
  if (!el) {
    throw "el 没有定义";
  } else if (typeof el !== "string" && !isDOM(el)) {
    throw "el 只能是 string 类型 或者是 HTMLElement 类型";
  }
};

export const handleSpeedList = (list) => {
  if (!Array.isArray(list)) {
    throw "speedList 只能是数组";
  } else if (
    list.some((item) => {
      return !("label" in item) || !("value" in item);
    })
  ) {
    throw "speedList 类型不正确，每个数组项必须包含 label 和 value";
  }
};

export const handleVideoList = (list) => {
  if (!Array.isArray(list)) {
    throw "videoList 只能是数组";
  } else if (
    list.some((item) => {
      return !("label" in item) || !("url" in item);
    })
  ) {
    throw "videoList 类型不正确，每个数组项必须包含 label 和 url";
  }
};

//进入全屏
export const enterBrowserFullScreen = (element) => {
  if (!element) {
    return;
  }
  if (isBrowserFullscreenEnabled() && !isBrowserFullscreen()) {
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
//退出全屏
export const exitBrowserFullscreen = () => {
  if (isBrowserFullscreenEnabled() && isBrowserFullscreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
};
export const isBrowserFullscreen = () => {
  return (
    document.fullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    false
  );
};

export const isBrowserFullscreenEnabled = () => {
  return (
    document.fullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.msFullscreenEnabled ||
    false
  );
};
