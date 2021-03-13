/**
 * 设置dom属性
 */

import { VUE_META_ATTRIBUTE } from '../common/constants.js';

export default function _setAttr (el, opt) {
  // 标记这是该组件添加到head中的DOM元素
  el.setAttribute(VUE_META_ATTRIBUTE, true);

  Object.keys(opt || {}).forEach((key) => {
    // 将剩下属性添加到DOM元素中
    el.setAttribute(key, opt[key]);
  });
}
