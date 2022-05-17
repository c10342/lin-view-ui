<template>
  <div :class="[{ 'is-simple': simple }, 'lin-collapse-group']">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { CollapseContextKey } from "@packages/tokens";
import { computed, defineComponent, PropType, provide } from "vue";

type ArrayValue = Array<string | number>;
type ValueType = ArrayValue | string | number;
export default defineComponent({
  name: "LinCollapseGroup",
  props: {
    // 当前激活面板的name，accordion为true就是String或者Number,否则就是Array
    value: {
      type: [Array, String, Number] as PropType<ValueType>
    },
    // 是否开启手风琴模式，开启后每次至多展开一个面板
    accordion: {
      type: Boolean,
      default: false
    },
    // 是否开启简洁模式
    simple: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change", "update:value"],
  setup(props, context) {
    const emitChange = (data: ValueType) => {
      context.emit("change", handleData(data));
      context.emit("update:value", handleData(data));
    };
    provide(CollapseContextKey, {
      value: computed(() => props.value),
      simple: computed(() => props.simple),
      accordion: computed(() => props.accordion),
      emitChange
    });
    // 根据是否为手风琴模式返回一个(String|Number)或者Array
    const handleData = (data: ValueType) => {
      let currentData;
      if (props.accordion) {
        // 手风琴模式，一个值
        if ((data as ArrayValue).length > 0) {
          currentData = (data as ArrayValue)[0];
        } else {
          currentData = "";
        }
      } else {
        // 非手风琴，数组
        currentData = data;
      }
      return currentData;
    };
    return {};
  }
});
</script>
