import { pickObject } from "@packages/utils";
import {
  createVNode,
  defineComponent,
  reactive,
  render,
  Transition
} from "vue";
import { Options } from "./types";

const createComponent = () => {
  const data = reactive({
    // 加载文案
    text: "",
    // 是否全屏
    fullscreen: true,
    // 控制是否显示
    visible: false,
    // 背景
    background: "",
    // loading颜色
    loadingColor: "",
    // 文本颜色
    textColor: ""
  });
  let openOptions: Options = {};
  const div = document.createElement("div");
  const destroySelf = () => {
    if (!data.fullscreen) {
      openOptions?.target?.classList.remove("lin-loading-position-relative");
    }
    if (openOptions?.lock) {
      openOptions?.target?.classList.remove("lin-loading-lock");
    }

    openOptions?.target?.removeChild(vm.el as HTMLElement);
    render(null, div);
  };

  const loadingComponent = defineComponent({
    name: "LinLoading",
    setup() {
      return { data, destroySelf };
    },
    render() {
      return (
        <Transition name="lin-fade" onAfterLeave={destroySelf}>
          {data.visible ? (
            <div
              class={["lin-loading-mask", { "is-fullscreen": data.fullscreen }]}
              style={{ backgroundColor: data.background || "" }}
            >
              <div class="lin-loading-content">
                <span
                  class="lin-loading-icon"
                  style={{
                    "border-top-color": data.loadingColor || "",
                    "border-right-color": data.loadingColor || ""
                  }}
                ></span>
                {data.text ? (
                  <span
                    style={{ color: data.textColor || "" }}
                    class="lin-loading-text"
                  >
                    {data.text}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}
        </Transition>
      );
    }
  });

  const vm = createVNode(loadingComponent);

  render(vm, div);

  const open = (options?: Options) => {
    if (!options || !options.target) {
      return;
    }
    openOptions = options;
    const object = pickObject(options, [
      "text",
      "fullscreen",
      "background",
      "loadingColor",
      "textColor",
      "fullscreen"
    ]);
    // 将传递进来的参数挂载到实例上面
    Object.keys(object).forEach((key) => {
      (data as any)[key] = object[key as keyof Options];
    });
    if (!data.fullscreen) {
      // 没有全屏的情况下，给目标对象添加一个相对定位，因为loading是绝对定位
      options.target.classList.add("lin-loading-position-relative");
    }

    // 隐藏滚动条
    if (options.lock) {
      options.target.classList.add("lin-loading-lock");
    }

    // 已经是显示状态就不需要走下面了
    if (data.visible) {
      return;
    }
    // 添加上去
    options.target.appendChild(vm.el as HTMLElement);
    // 显示
    data.visible = true;
  };
  const close = () => {
    if (!data.visible) {
      return;
    }
    data.visible = false;
  };
  return {
    open,
    close
  };
};

export default createComponent;
