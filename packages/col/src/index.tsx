import { rowContextKey } from "@packages/tokens";
import { isNumber, isPlainObject } from "@packages/utils";
import { computed, defineComponent, h, inject, PropType } from "vue";

interface ColSizeObject {
  span?: number;
  offset?: number;
}
type ColSize = number | ColSizeObject;

export default defineComponent({
  name: "LinCol",
  props: {
    // 自定义元素标签
    tag: {
      type: String,
      default: "div"
    },
    // 栅格占据列数
    span: {
      type: Number,
      default: 24
    },
    // 栅格左侧的间隔数
    offset: {
      type: Number,
      default: 0
    },
    // 栅格向右移动格数
    pull: {
      type: Number,
      default: 0
    },
    // 栅格向左移动格数
    push: {
      type: Number,
      default: 0
    },
    // 响应式栅格数或者属性对象  <768px
    xs: [Number, Object] as PropType<ColSize>,
    // ≥768px 响应式栅格数或者栅格属性对象
    sm: [Number, Object] as PropType<ColSize>,
    // ≥992 响应式栅格数或者栅格属性对象
    md: [Number, Object] as PropType<ColSize>,
    // ≥1200 响应式栅格数或者栅格属性对象
    lg: [Number, Object] as PropType<ColSize>
  },
  setup(props, context) {
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });
    const style: { paddingLeft?: string; paddingRight?: string } = {};
    const classList = ["lin-col"];

    if (gutter) {
      style.paddingLeft = `${gutter.value / 2}px`;
      style.paddingRight = style.paddingLeft;
    }
    const pos = ["offset", "push", "pull", "span"] as const;
    pos.forEach((key) => {
      if (props[key]) {
        if (key !== "span") {
          classList.push(`lin-col-${key}-${props[key]}`);
        } else {
          classList.push(`lin-col-${props[key]}`);
        }
      }
    });
    const size = ["xs", "sm", "md", "lg"] as const;
    size.forEach((size) => {
      const sizeData = props[size];
      if (isNumber(sizeData)) {
        classList.push(`lin-col-${size}-${sizeData}`);
      } else if (isPlainObject(sizeData)) {
        Object.keys(props).forEach((prop) => {
          if (prop !== "span") {
            classList.push(
              `lin-col-${size}-${prop}-${(sizeData as any)[prop]}`
            );
          } else {
            classList.push(`lin-col-${size}-${sizeData[prop]}`);
          }
        });
      }
    });
    const Tag = props.tag as any;
    return () => (
      <Tag style={style} class={classList}>
        {context.slots.default?.()}
      </Tag>
    );
  }
});
