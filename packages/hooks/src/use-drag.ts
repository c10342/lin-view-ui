import { isUndefined, parseNumber } from "@packages/utils";
import { onBeforeUnmount, onMounted, Ref } from "vue";

export const useDrag = (drag = false, dragRef: Ref<HTMLElement | null>) => {
  // 开始点
  let startY = 0;
  let startX = 0;

  const updateStyle = (styleObj: Partial<CSSStyleDeclaration>) => {
    Object.keys(styleObj).forEach((key: any) => {
      const value = styleObj[key];
      if (!dragRef.value || isUndefined(value)) {
        return;
      }
      dragRef.value.style[key] = value;
    });
  };
  const onMousemove = (event: MouseEvent) => {
    if (!dragRef.value) {
      return;
    }
    // 结束点
    const endY = event.clientY;
    const endX = event.clientX;
    // 移动的偏移量
    const offsetY = endY - startY;
    const offsetX = endX - startX;
    // 需要拖拽容器
    const rect = dragRef.value.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;
    const width = rect.width;
    const height = rect.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    startY = endY;
    startX = endX;
    let dialogTop = parseNumber(top + offsetY, 10);
    let dialogLeft = parseNumber(left + offsetX, 10);
    // 判断是否越界，超出视图范围
    dialogTop = dialogTop < 0 ? 0 : dialogTop;
    dialogLeft = dialogLeft < 0 ? 0 : dialogLeft;
    dialogTop
      = dialogTop > windowHeight - height ? windowHeight - height : dialogTop;
    dialogLeft
      = dialogLeft > windowWidth - width ? windowWidth - width : dialogLeft;
    updateStyle({
      top: `${dialogTop}px`,
      left: `${dialogLeft}px`,
      transform: "none",
      marginTop: "0px",
      marginBottom: "0px",
      marginLeft: "0ox",
      marginRight: "0px"
    });
  };
  const removeListener = () => {
    document.removeEventListener("mousemove", onMousemove);
    /*eslint-disable-next-line no-use-before-define*/
    document.removeEventListener("mouseup", onMouseup);
  };
  // 鼠标抬起
  const onMouseup = () => {
    document.body.classList.remove("user-select-none");
    removeListener();
  };
  // 鼠标按下，开始拖拽
  const onDragClick = (event: MouseEvent) => {
    if (!drag) {
      return;
    }
    // 防止选中文字，导致mouseup事件丢失
    document.body.classList.add("user-select-none");
    // 开始点
    startY = event.clientY;
    startX = event.clientX;
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("mouseup", onMouseup);
  };
  onMounted(() => {
    if (dragRef.value) {
      dragRef.value.addEventListener("mousedown", onDragClick);
    }
  });

  onBeforeUnmount(() => {
    removeListener();
    if (dragRef.value) {
      dragRef.value.removeEventListener("mousedown", onDragClick);
    }
  });
};
