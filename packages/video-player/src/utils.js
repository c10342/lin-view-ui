// 判断是否为DOM元素
export const isDOM = dom => {
  const fn =
    typeof HTMLElement === "object"
      ? function isDOMFn(obj) {
          return obj instanceof HTMLElement;
        }
      : function isDOMFn(obj) {
          return (
            obj &&
            typeof obj === "object" &&
            obj.nodeType === 1 &&
            typeof obj.nodeName === "string"
          );
        };

  return fn(dom);
};

// 校验视频类型参数
export const handleType = (type, customType) => {
  if (typeof customType !== "function") {
    const typeList = ["mp4", "hls", "flv"];
    if (!type) {
      throw new ReferenceError("type 没有定义");
    } else if (!typeList.includes(type)) {
      throw new TypeError("type 只能是 hls 或者 mp4 或者 flv");
    }
  }
};

// 校验el参数
export const handleEl = el => {
  if (!el) {
    throw new TypeError("el 没有定义");
  } else if (typeof el !== "string" && !isDOM(el)) {
    throw new TypeError("el 只能是 string 类型 或者是 HTMLElement 类型");
  } else if (typeof el === "string" && !document.querySelector(el)) {
    throw new ReferenceError("can not find DOM");
  }
};

// 校验视频播放数度参数
export const handleSpeedList = list => {
  if (!Array.isArray(list)) {
    throw new TypeError("speedList 只能是数组");
  } else if (list.some(item => !("label" in item) || !("value" in item))) {
    throw new TypeError(
      "speedList 类型不正确，每个数组项必须包含 label 和 value"
    );
  }
};

// 校验视频播放列表参数
export const handleVideoList = list => {
  if (!Array.isArray(list)) {
    throw new TypeError("videoList 只能是数组");
  } else if (list.some(item => !("label" in item) || !("url" in item))) {
    throw new TypeError(
      "videoList 类型不正确，每个数组项必须包含 label 和 url"
    );
  }
};
