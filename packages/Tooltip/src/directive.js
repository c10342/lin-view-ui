import TooltipConstruct from './construct.js';

const TooltipDirective = {};

let instance = null;

TooltipDirective.install = (Vue) => {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  Vue.directive('tooltip', {
    bind (el, binding) {
      // 鼠标进入
      el.mouseenter = (e) => {
        // 触发的元素要是当前绑定指令的元素
        if (e.currentTarget !== el) {
          return;
        }
        // 获取指令绑定的文本
        const text = binding.value;
        if (!text) {
          return;
        }
        if (!instance) {
          // 不存在实例就先创建实例
          instance = new TooltipConstruct();
          instance.addTip();
        }
        // 获取需要显示的方向
        const {
          bottom: b,
          top: t,
          left: l,
          right: r,
          auto
        } = binding.modifiers;
        let placement = 'bottom';
        if (b) {
          placement = 'bottom';
        } else if (t) {
          placement = 'top';
        } else if (l) {
          placement = 'left';
        } else if (r) {
          placement = 'right';
        }

        instance.placement = placement;
        instance.text = text;

        const box = e.currentTarget;
        const boxWidth = box.offsetWidth;
        const boxHeight = box.offsetHeight;

        if (auto) {
          // 文字超出则显示 tooltip ，不超出则不显示 tooltip
          // 获取容器的实际宽度
          const textLength = box.scrollWidth;
          if (textLength <= boxWidth) {
            // 文字没有超出容器
            return;
          }
        }
        // 显示组件
        instance.show = true;
        instance.$nextTick(() => {
          const tooltip = instance.vm.$el;
          const boxRect = box.getBoundingClientRect();
          const boxLeft = boxRect.left;
          const boxTop = boxRect.top;

          const tipWidth = tooltip.offsetWidth;
          const tipHeight = tooltip.offsetHeight;

          let styleLeft;
          let styleTop;
          // 距离屏幕上边的偏移量
          let top = el.getAttribute('lin-tooltip-top') * 1;
          // 距离屏幕左边的偏移量
          let left = el.getAttribute('lin-tooltip-left') * 1;
          if (typeof top !== 'number') {
            top = 0;
          }
          if (typeof left !== 'number') {
            left = 0;
          }

          // 计算出组件出现的位置，固定定位的top，left值
          if (placement === 'bottom') {
            styleLeft = `${boxLeft + (boxWidth / 2 - tipWidth / 2) - left}px`;
            styleTop = `${boxTop + boxHeight + 7 + top}px`;
          } else if (placement === 'top') {
            styleLeft = `${boxLeft + (boxWidth / 2 - tipWidth / 2) - left}px`;
            styleTop = `${boxTop - tipHeight - 7 + top}px`;
          } else if (placement === 'left') {
            styleLeft = `${boxLeft - tipWidth - 7 - left}px`;
            styleTop = `${boxTop + (boxHeight / 2 - tipHeight / 2) + top}px`;
          } else if (placement === 'right') {
            styleLeft = `${boxLeft + boxWidth + 7 - left}px`;
            styleTop = `${boxTop + (boxHeight / 2 - tipHeight / 2) + top}px`;
          }

          instance.style = { left: styleLeft, top: styleTop };
        });
      };
      // 鼠标离开
      el.mouseleave = () => {
        if (instance) {
          instance.removeTip();
          instance = null;
        }
      };
      el.addEventListener('mouseenter', el.mouseenter);
      el.addEventListener('mouseleave', el.mouseleave);
    },
    // 只调用一次，指令与元素解绑时调用。
    unbind (el) {
      if (instance) {
        instance.removeTip();
        instance = null;
      }
      el.removeEventListener('mouseenter', el.mouseenter);
      el.removeEventListener('mouseleave', el.mouseleave);
    }
  });
};

export default TooltipDirective;
