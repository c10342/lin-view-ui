const elTransition =
  "0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out";
const Transition = {
  beforeEnter: function beforeEnter(el: HTMLElement) {
    el.style.transition = elTransition;
    if (!el.dataset) (el as any).dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.height = "0";
    el.style.paddingTop = "0";
    el.style.paddingBottom = "0";
  },

  enter(el: HTMLElement) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
      el.style.paddingTop = el.dataset.oldPaddingTop ?? "";
      el.style.paddingBottom = el.dataset.oldPaddingBottom ?? "";
    } else {
      el.style.height = "";
      el.style.paddingTop = el.dataset.oldPaddingTop ?? "";
      el.style.paddingBottom = el.dataset.oldPaddingBottom ?? "";
    }

    el.style.overflow = "hidden";
  },

  afterEnter: function afterEnter(el: HTMLElement) {
    el.style.transition = "";
    el.style.height = "";
    el.style.overflow = el.dataset.oldOverflow ?? "";
  },

  beforeLeave: function beforeLeave(el: HTMLElement) {
    if (!el.dataset) (el as any).dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },

  leave(el: HTMLElement) {
    if (el.scrollHeight !== 0) {
      el.style.transition = elTransition;
      el.style.height = "0";
      el.style.paddingTop = "0";
      el.style.paddingBottom = "0";
    }
  },

  afterLeave: function afterLeave(el: HTMLElement) {
    el.style.transition = "";
    el.style.height = "";
    el.style.overflow = el.dataset.oldOverflow ?? "";
    el.style.paddingTop = el.dataset.oldPaddingTop ?? "";
    el.style.paddingBottom = el.dataset.oldPaddingBottom ?? "";
  }
};

export default Transition;
