/**
 * 移除节点
 */

import { VUE_META_ATTRIBUTE } from '../common/constants.js';

export default function _removeNode(parent) {
  const children = parent.querySelectorAll(`[${VUE_META_ATTRIBUTE}]`);

  for (let i = children.length - 1; i > -1; i--) {
    const child = children[i];
    if (child.getAttribute(VUE_META_ATTRIBUTE) === 'true') {
      parent.removeChild(child);
    }
  }
}
