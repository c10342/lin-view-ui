import LoadingConstruct from './construct.js';

function openLoading(el, binding) {
  if (!el) {
    return;
  }
  if (!el.instance) {
    el.instance = new LoadingConstruct();
  }
  // 获取指令上面的修饰符
  const { fullscreen } = binding.modifiers;
  const { lock } = binding.modifiers;
  const { body } = binding.modifiers;
  const target = body ? document.body : el;
  const options = {
    fullscreen,
    target,
    lock,
  };
  // 获取目标对象上面的属性
  const text = el.getAttribute('lin-loading-text');
  const background = el.getAttribute('lin-loading-background');
  const textColor = el.getAttribute('lin-loading-textColor');
  options.text = text;
  options.background = background;
  options.textColor = textColor;
  // 打开loading
  el.instance.open(options);
}

function closeLoading(el) {
  if (!el) {
    return;
  }
  // 关闭loading
  if (el.instance) {
    el.instance.close();
    el.instance = null;
  }
}

const loadingDirective = {};

loadingDirective.install = (Vue) => {
  Vue.directive('loading', {
    bind(el, binding) {
      // 第一次绑定的时候
      if (binding.value) {
        openLoading(el, binding);
      }
    },
    update(el, binding) {
      // 更新的时候
      if (binding.value) {
        openLoading(el, binding);
      } else {
        closeLoading(el);
      }
    },
    unbind(el) {
      // 解绑的时候
      closeLoading(el);
    },
  });
};

export default loadingDirective;
