import { SelectorContextKey } from "@packages/tokens";
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref
} from "vue";
import LinIcon from "@packages/icon";
import { useScopeLocale } from "@packages/hooks";

const oneHeight = 26;
const statusType = {
  show: 2,
  close: 1
};
export default defineComponent({
  name: "LinSelectorGroup",
  components: { LinIcon },
  props: {
    // 选择器整体宽度
    width: {
      type: String,
      default: ""
    },
    // labelWidth
    labelWidth: {
      type: String,
      default: "40px"
    },
    // 绑定值
    value: {
      type: [String, Object, Number, Boolean],
      default: null
    },
    // 作为 value 唯一标识的键名，绑定值为对象类型时必填
    valueKey: {
      type: String,
      default: ""
    },
    // 自定义渲染更多标签内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是否展开或收起的状态值。可以使用 jsx
    renderMore: {
      type: Function,
      default: null
    },
    // 自定义渲染头部标签内容，使用 Vue 的 Render 函数，参数是 h，可以使用 jsx
    renderLabel: {
      type: Function,
      default: null
    },
    // 头部标签内容
    label: {
      type: String,
      default: ""
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["show", "hide", "change", "update:value"],
  setup(props, context) {
    const emitChange = (value: any) => {
      context.emit("change", value);
      context.emit("update:value", value);
    };

    provide(SelectorContextKey, {
      parentValueKey: computed(() => props.valueKey),
      parentValue: computed(() => props.value),
      parentDisabled: computed(() => props.disabled),
      parentEmitChange: emitChange
    });
    const { t } = useScopeLocale("Selector");
    // 是否显示展开/隐藏按钮
    const isShowBtn = ref(false);
    // 容器高度
    const height = ref("auto");
    // 1-收起，2-展开
    const status = ref(statusType.close);
    const selectorRef = ref<HTMLElement | null>(null);
    // 展开选择器
    const show = () => {
      // 高度设置为自适应
      height.value = "auto";
      status.value = statusType.show;
    };
    // 隐藏选择器
    const hide = () => {
      // 高度设置为一行的高度
      height.value = `${oneHeight}px`;
      status.value = statusType.close;
    };
    const init = () => {
      if (!selectorRef.value) {
        return;
      }
      // 选择器高度
      const clientHeight = selectorRef.value.clientHeight;

      if (clientHeight > oneHeight) {
        // 选择器高度大于一行的高度
        // 需要显示 收起/展开按钮
        isShowBtn.value = true;
        // 超出高度需要隐藏变成一行
        hide();
      } else {
        isShowBtn.value = false;
        show();
      }
    };
    // 点击 收起/展开按钮，切换状态
    const onMoreClick = () => {
      if (status.value === statusType.close) {
        // 收起状态，此时点击需要展开它
        show();
        context.emit("show");
      } else {
        hide();
        context.emit("hide");
      }
    };
    // 重置状态
    const resetStatus = async () => {
      if (!selectorRef.value) {
        return;
      }
      const style = selectorRef.value.style;
      if (style.height === "auto") {
        // 展开状态
        init();
      } else {
        // 折叠状态
        height.value = "auto";
        await nextTick();
        init();
      }
    };
    const onResize = () => {
      resetStatus();
    };
    onMounted(async () => {
      await nextTick();
      init();
      window.addEventListener("resize", onResize);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", onResize);
    });
    return () => (
      <div class="lin-selector-group" style={{ width: `${props.width}px` }}>
        <label>
          {props.renderLabel ? (
            props.renderLabel()
          ) : (
            <span
              class="lin-selector-label"
              style={{ width: props.labelWidth }}
            >
              {props.label}
            </span>
          )}
        </label>
        <div
          class="lin-selector-list"
          ref={(el: any) => {
            selectorRef.value = el;
          }}
          style={{ height: height.value }}
        >
          {context.slots.default?.()}
        </div>
        {isShowBtn.value ? (
          <span class="lin-selector-more" onClick={onMoreClick}>
            {props.renderMore ? (
              props.renderMore(status.value)
            ) : (
              <span class="lin-selector-more-text">
                {status.value === statusType.show ? t("hide") : t("show")}
                <LinIcon
                  name={status.value === statusType.show ? "down" : "up"}
                />
              </span>
            )}
          </span>
        ) : null}
      </div>
    );
  }
});
