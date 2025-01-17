<template>
  <button
    :class="[bem.b(), bem.m(size), bem.m(type)]"
    :nativeType="nativeType"
    @click="onClick"
  >
    <slot></slot>
    {{ t("year") }}
  </button>
</template>

<script setup lang="ts">
import { createNamespace } from "@packages/utils";
import { useGlobalConfig, useLocale } from "@packages/hooks";
import { buttonEmits, buttonProps } from "./button";

// 定义组件名称
defineOptions({ name: "ZButton" });
// 定义组件事件
const emits = defineEmits(buttonEmits);
// 定义组件属性
defineProps(buttonProps);

const { size } = useGlobalConfig();

const bem = createNamespace("button");

const onClick = (e: MouseEvent) => {
  emits("click", e);
};

const { t } = useLocale();
</script>
