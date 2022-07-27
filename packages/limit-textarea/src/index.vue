<template>
  <div class="lin-limit-textarea">
    <textarea
      v-bind="textareaProps"
      class="lin-limit-textarea-input"
      :class="{ 'is-over': isOver }"
      :value="value"
      @keyup="handleInput"
    />
    <span
      v-if="maxLen !== -1"
      class="lin-limit-textarea-text"
    >
      {{ isOver ? t("exceeded") : t("enterInput") }}
      <span
        class="lin-limit-textarea-num"
        :class="{ 'is-num-over': isOver }"
      >
        {{ num }}
      </span>
      {{ t("word") }}
    </span>
    <span
      v-else
      class="lin-limit-textarea-text"
    >
      {{ t("entered") }}
      <span class="lin-limit-textarea-num">
        {{ value.toString().length }}
      </span>
      {{ t("word") }}
    </span>
  </div>
</template>

<script lang="ts">
import { useScopeLocale } from "@packages/hooks";
import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "LinLimitTextarea",
  props: {
    // 输入框占位符
    placeholder: {
      type: String,
      default:null
    },
    // 行高
    rows: {
      type: Number,
      default: 4
    },
    // 最大长度
    maxLen: {
      type: Number,
      default: -1
    },
    // 超出字符是否裁剪
    isCut: {
      type: Boolean,
      default: false
    },
    // 绑定值
    value: {
      type: [String, Number] as PropType<string | number>,
      default: ""
    }
  },
  emits: ["change", "update:value"],
  setup(props, context) {
    const emitChange = (value: string | number) => {
      context.emit("change", value);
      context.emit("update:value", value);
    };
    const { t } = useScopeLocale("LimitTextarea");
    // 是否溢出,即超出最大长度
    const isOver = ref(false);
    // 可输入的字符数
    const num = ref(props.maxLen);

    const maxlength = computed(() => {
      if (props.isCut) {
        return props.maxLen;
      }
      return -1;
    });
    // 文本属性
    const textareaProps = computed(() => {
      const obj: { placeholder: string; rows: number; maxlength?: number } = {
        placeholder: props.placeholder ? props.placeholder : t("LimitTextarea"),
        rows: props.rows
      };
      if (maxlength.value !== -1) {
        obj.maxlength = maxlength.value;
      }
      return {
        ...context.attrs,
        ...obj
      };
    });

    const setCurrentValue = (value: number | string) => {
      const currentValue = value.toString();
      if (currentValue.length <= props.maxLen) {
        // 没有超出长度
        isOver.value = false;
        // 还可以输入多少字符数
        num.value = props.maxLen - currentValue.length;
      } else {
        isOver.value = true;
        num.value = currentValue.length - props.maxLen;
        emitChange(currentValue);
      }
    };
    const handleInput = (event: Event) => {
      const { value } = event.target as HTMLTextAreaElement;
      if (props.maxLen === -1) {
        // 不限制长度
        emitChange(value);
      } else if (value.length <= props.maxLen || !props.isCut) {
        // 限制长度
        emitChange(value);
        setCurrentValue(value);
      }
    };

    return {
      handleInput,
      isOver,
      num,
      maxlength,
      textareaProps,
      t
    };
  }
});
</script>

<style></style>
