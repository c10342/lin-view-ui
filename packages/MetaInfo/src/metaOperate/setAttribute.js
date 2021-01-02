/**
 * 设置dom属性
 */

import { VUE_META_ATTRIBUTE } from '../common/constants.js';

export default function _setAttr(el, opt) {
  el.setAttribute(VUE_META_ATTRIBUTE, true);

  // for (const key in opt) {
  //   el.setAttribute(key, opt[key]);
  // }
  Object.keys(opt || {}).forEach((key) => {
    el.setAttribute(key, opt[key]);
  });
}
