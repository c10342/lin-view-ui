import TooltipConstruct from "./construct.js";

const TooltipDirective = {};

let instance = null;

TooltipDirective.install = (Vue) => {
  Vue.directive("tooltip", {
    bind(el, binding) {
      el.mouseenter = (e) => {
        if (e.currentTarget != el) {
          return;
        }
        const text = binding.value;
        if (!text) {
          return;
        }
        if (!instance) {
          instance = new TooltipConstruct();
          instance.addTip();
        }
        const {
          bottom: b,
          top: t,
          left: l,
          right: r,
          auto,
        } = binding.modifiers;
        let placement = "bottom";
        if (b) {
          placement = "bottom";
        } else if (t) {
          placement = "top";
        } else if (l) {
          placement = "left";
        } else if (r) {
          placement = "right";
        }

        instance.placement = placement;
        instance.text = text;

        const box = e.currentTarget;
        const boxWidth = box.offsetWidth;
        const boxHeight = box.offsetHeight;

        if (auto) {
          const textLength = box.scrollWidth;
          if (textLength <= boxWidth) {
            return;
          }
        }
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
          let top = el.getAttribute("l-tooltip-top") * 1;
          let left = el.getAttribute("l-tooltip-left") * 1;
          if (typeof top !== "number") {
            top = 0;
          }
          if (typeof left !== "number") {
            left = 0;
          }

          if (placement === "bottom") {
            styleLeft = `${boxLeft + (boxWidth / 2 - tipWidth / 2) - left}px`;
            styleTop = `${boxTop + boxHeight + 7 + top}px`;
          } else if (placement === "top") {
            styleLeft = `${boxLeft + (boxWidth / 2 - tipWidth / 2) - left}px`;
            styleTop = `${boxTop - tipHeight - 7 + top}px`;
          } else if (placement === "left") {
            styleLeft = `${boxLeft - tipWidth - 7 - left}px`;
            styleTop = `${boxTop + (boxHeight / 2 - tipHeight / 2) + top}px`;
          } else if (placement === "right") {
            styleLeft = `${boxLeft + boxWidth + 7 - left}px`;
            styleTop = `${boxTop + (boxHeight / 2 - tipHeight / 2) + top}px`;
          }

          console.log(
            boxLeft,
            boxTop,
            tipWidth,
            tipHeight,
            boxWidth,
            boxHeight
          );

          instance.style = { left: styleLeft, top: styleTop };
        });
      };
      el.mouseleave = () => {
        if (instance) {
          instance.removeTip();
          instance = null;
        }
      };
      el.addEventListener("mouseenter", el.mouseenter);
      el.addEventListener("mouseleave", el.mouseleave);
    },
    // update(el, binding) {},
    unbind(el) {
      if (instance) {
        instance.removeTip();
        instance = null;
      }
      el.removeEventListener("mouseenter", el.mouseenter);
      el.removeEventListener("mouseleave", el.mouseleave);
    },
  });
};

export default TooltipDirective;
