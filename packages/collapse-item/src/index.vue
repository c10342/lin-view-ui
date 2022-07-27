<template>
  <div :class="[{ 'is-simple': simple }, 'lin-collapse-item']">
    <div
      class="lin-collapse-item-header"
      @click="onHeaderClick"
    >
      <LinIcon
        v-if="!hideArrow"
        name="right"
        class="lin-collapse-arrow"
        :class="{ 'lin-collapse-arrow-down': show }"
      />
      <slot />
    </div>
    <LinCollapseTransition>
      <div
        v-show="show"
        class="lin-collapse-item-content"
      >
        <slot name="content" />
      </div>
    </LinCollapseTransition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from "vue";
import LinCollapseTransition from "@packages/collapse-transition";
import LinIcon from "@packages/icon";
import { CollapseContextKey } from "@packages/tokens";
import { isArray, isNumber, isString } from "@packages/utils";
export default defineComponent({
  name: "LinCollapseItem",
  components: { LinCollapseTransition, LinIcon },
  props: {
    // 当前面板的 name，与 CollapseGroup 的 value 对应，必填项
    name: {
      type: [String, Number] as PropType<string | number>,
      require: true,
      default: ""
    },
    // 隐藏箭头
    hideArrow: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { simple, value, accordion, emitChange } = inject(
      CollapseContextKey,
      {
        simple: computed(() => false),
        value: computed(() => []),
        accordion: computed(() => false)
      }
    );
    const collapseValue = computed(() => {
      // 统一封装成数组使用
      if (value?.value && (isString(value.value) || isNumber(value.value))) {
        return [value.value];
      }
      if (isArray(value?.value)) {
        return value?.value;
      }
      return [];
    });
    const show = computed(() => {
      return collapseValue.value?.includes(props.name);
    });
    const onHeaderClick = () => {
      const val = !show.value;
      let data: any = collapseValue.value;
      if (accordion?.value) {
        // 手风琴模式
        if (val === false) {
          data = [];
        } else {
          data = [props.name];
        }
      } else if (val === false) {
        const index = data.findIndex(
          (item: string | number) => item === props.name
        );
        if (index > -1) {
          data.splice(index, 1);
        }
      } else {
        data.push(props.name);
      }
      emitChange?.(data);
    };
    return {
      simple,
      show,
      onHeaderClick
    };
  }
});
</script>
