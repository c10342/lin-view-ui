import { VUE_META_ATTRIBUTE } from "./constant";

/**
 * 设置dom属性
 */
export function setAttribute(el: HTMLElement, opt: Record<string, any>) {
  // 标记这是该组件添加到head中的DOM元素
  el.setAttribute(VUE_META_ATTRIBUTE, "true");

  Object.keys(opt || {}).forEach((key) => {
    // 将剩下属性添加到DOM元素中
    el.setAttribute(key, opt[key]);
  });
}

export function removeNode(parent: HTMLElement) {
  // 获取header的DOM元素
  const children = parent.querySelectorAll(`[${VUE_META_ATTRIBUTE}]`);

  for (let i = children.length - 1; i > -1; i--) {
    const child = children[i];
    if (child.getAttribute(VUE_META_ATTRIBUTE) === "true") {
      // 如果是改组件添加上去的DOM元素，则移除
      parent.removeChild(child);
    }
  }
}
