<template>
  <div class="lin-image">
    <img
      v-if="isShowImg"
      :alt="alt"
      :referrer-policy="referrerPolicy"
      :class="[{ [`is-object-${fit}`]: fit }, 'lin-image-img']"
      :src="currentUrl"
      @error="onError"
      @load="onLoad"
    >
    <slot v-else>
      <div class="lin-image-error">
        {{ errorMsg || t("errorMsg") }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { useScopeLocale } from "@packages/hooks";
import { isString } from "@packages/utils";
import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "LinImage",
  props: {
    // 图片地址
    url: {
      type: [Array, String] as PropType<string | string[]>,
      default: null
    },
    // 确定图片如何适应容器框，同原生 object-fit
    fit: {
      type: String,
      default: ""
    },
    // 原生 referrerPolicy
    referrerPolicy: {
      type: String,
      default: ""
    },
    // 原生 alt
    alt: {
      type: String,
      default: ""
    },
    // 图片加载失败提示语
    errorMsg: {
      type: String,
      default: null
    }
  },
  emits: ["error", "success"],
  setup(props, context) {
    const images = computed(() => {
      if (!props.url) {
        return [];
      }
      if (isString(props.url)) {
        return [props.url].filter(Boolean);
      }
      return props.url.filter(Boolean);
    });

    // 正在加载第几张图片
    const index = ref(0);
    // 是否加载图片错误
    const isError = ref(false);

    const { t } = useScopeLocale("Image");

    const currentUrl = computed(() => {
      return images.value[index.value];
    });
    // 是否显示图片
    const isShowImg = computed(() => {
      if (images.value.length === 0) {
        return false;
      }
      return !isError.value;
    });

    // 图片加载错误回调
    const onError = (e: Event) => {
      context.emit("error", e, index.value);
      if (index.value >= images.value.length - 1) {
        isError.value = true;
        return;
      }
      index.value += 1;
    };
    // 图片加载成功回调
    const onLoad = (e: Event) => {
      context.emit("success", e, index.value);
    };
    return {
      onLoad,
      onError,
      t,
      currentUrl,
      isShowImg
    };
  }
});
</script>
