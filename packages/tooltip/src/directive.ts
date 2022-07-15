import { isNumber } from "@packages/utils";
import { nextTick } from "vue";
import TooltipConstruct from "./tooltip";
import { placementType } from "./enum";
import { Placement } from "./types";

type BindEl = HTMLElement & {
  mouseenter: (event: MouseEvent) => void;
  mouseleave: (event: MouseEvent) => void;
  instance: TooltipConstruct | null;
};

const vTooltip = {
  mounted(el: BindEl, binding: any) {
    // 鼠标进入
    el.mouseenter = (event: MouseEvent) => {
      // 触发的元素要是当前绑定指令的元素
      if (event.currentTarget !== el) {
        return;
      }
      // 获取指令绑定的文本
      const text = binding.value;
      if (!text) {
        return;
      }
      if (!el.instance) {
        // 不存在实例就先创建实例
        el.instance = new TooltipConstruct();
      }
      // 获取需要显示的方向
      const { bottom: b, top: t, left: l, right: r, auto } = binding.modifiers;
      let placement: Placement = "bottom";
      if (b) {
        placement = "bottom";
      } else if (t) {
        placement = "top";
      } else if (l) {
        placement = "left";
      } else if (r) {
        placement = "right";
      }

      el.instance.placement.value = placement;
      el.instance.text.value = text;

      const box = event.currentTarget as HTMLElement;
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
      el.instance.show.value = true;
      nextTick(() => {
        if (!el.instance) {
          return;
        }
        const tooltip = el.instance.el;
        const boxRect = box.getBoundingClientRect();
        const boxLeft = boxRect.left;
        const boxTop = boxRect.top;

        const tipWidth = tooltip.offsetWidth;
        const tipHeight = tooltip.offsetHeight;

        let styleLeft;
        let styleTop;
        // 距离屏幕上边的偏移量
        let top = +(el.getAttribute("lin-tooltip-top") as string);
        // 距离屏幕左边的偏移量
        let left = +(el.getAttribute("lin-tooltip-left") as string);
        if (!isNumber(top)) {
          top = 0;
        }
        if (!isNumber(left)) {
          left = 0;
        }

        // 计算出组件出现的位置，固定定位的top，left值
        if (placement === placementType.bottom) {
          styleLeft = `${boxLeft + (boxWidth / 2 - tipWidth / 2) - left}px`;
          styleTop = `${boxTop + boxHeight + 7 + top}px`;
        } else if (placement === placementType.top) {
          styleLeft = `${boxLeft + (boxWidth / 2 - tipWidth / 2) - left}px`;
          styleTop = `${boxTop - tipHeight - 7 + top}px`;
        } else if (placement === placementType.left) {
          styleLeft = `${boxLeft - tipWidth - 7 - left}px`;
          styleTop = `${boxTop + (boxHeight / 2 - tipHeight / 2) + top}px`;
        } else if (placement === placementType.right) {
          styleLeft = `${boxLeft + boxWidth + 7 - left}px`;
          styleTop = `${boxTop + (boxHeight / 2 - tipHeight / 2) + top}px`;
        }

        el.instance.style.value = { left: styleLeft, top: styleTop };
      });
    };

    // 鼠标离开
    el.mouseleave = () => {
      if (el.instance) {
        el.instance.show.value = false;
        el.instance = null;
      }
    };
    el.addEventListener("mouseenter", el.mouseenter);
    el.addEventListener("mouseleave", el.mouseleave);
  },
  unmounted(el: BindEl) {
    if (el.instance) {
      el.instance.show.value = false;
      el.instance = null;
    }
    el.removeEventListener("mouseenter", el.mouseenter);
    el.removeEventListener("mouseleave", el.mouseleave);
  }
};

export default vTooltip;
