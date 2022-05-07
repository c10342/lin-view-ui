import { rowContextKey } from "@packages/tokens";
import { computed, defineComponent, h, provide } from "vue";

export default defineComponent({
  name: "LinRow",
  props: {
    // 自定义标签元素
    tag: {
      type: String,
      default: "div"
    },
    // 栅格间隔
    gutter: {
      type: Number,
      default: 0
    },
    // 布局模式
    type: {
      type: String,
      default: ""
    },
    // flex 布局下的水平排列方式
    justify: {
      type: String,
      default: ""
    },
    // flex 布局下的垂直排列方式
    align: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const gutter = computed(() => props.gutter);
    provide(rowContextKey, {
      gutter
    });
    const classList: string[] = ["lin-row"];
    if (props.type) {
      classList.push(`lin-row-${props.type}`);
    }
    if (props.justify) {
      classList.push(`lin-row-justify-${props.justify}`);
    }
    if (props.align) {
      classList.push(`lin-row-align-${props.align}`);
    }
    const Tag = props.tag as any;
    return () => <Tag class={classList}>{context.slots.default?.()}</Tag>;
  }
});
