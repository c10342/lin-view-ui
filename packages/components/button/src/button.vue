<template>
  <button @click="onClick" :class="[bem.b(), bem.m(size), bem.m(type)]" :nativeType="nativeType">
    <slot></slot>
    <ZIcon></ZIcon>
  </button>
</template>

<script setup lang="ts">
import { createNamespace } from "@packages/utils";
import { buttonEmits, buttonProps } from "./button";
import { ZIcon } from '@packages/components'

// 定义组件名称
defineOptions({ name: "ZButton" });
// 定义组件事件
const emits = defineEmits(buttonEmits);
// 定义组件属性
defineProps(buttonProps);

const bem = createNamespace("button");

const onClick = (e: MouseEvent) => {
  emits('click', e)
}
</script>
