import createComponent from "./create-component";
import { Options } from "./types";

function openLoading(el: any, binding: any) {
  if (!el) {
    return false;
  }
  if (!el.instance) {
    el.instance = createComponent();
  }
  // 获取指令上面的修饰符
  const { fullscreen } = binding.modifiers;
  const { lock } = binding.modifiers;
  const { body } = binding.modifiers;
  const target = body ? document.body : el;
  const options: Options = {
    fullscreen,
    target,
    lock
  };
  // 获取目标对象上面的属性
  const text = el.getAttribute("lin-loading-text");
  const background = el.getAttribute("lin-loading-background");
  const textColor = el.getAttribute("lin-loading-textColor");
  options.text = text;
  options.background = background;
  options.textColor = textColor;
  // 打开loading
  el.instance.open(options);
  return true;
}

function closeLoading(el: any) {
  if (!el) {
    return false;
  }
  // 关闭loading
  if (el.instance) {
    el.instance.close();
    el.instance = null;
  }
  return true;
}

const vLoading = {
  mounted(el: HTMLElement, binding: any) {
    // 第一次绑定的时候
    if (binding.value) {
      openLoading(el, binding);
    }
  },
  updated(el: HTMLElement, binding: any) {
    // 更新的时候
    if (binding.value) {
      openLoading(el, binding);
    } else {
      closeLoading(el);
    }
  },
  unmounted(el: HTMLElement) {
    // 解绑的时候
    closeLoading(el);
  }
};

export default vLoading;
