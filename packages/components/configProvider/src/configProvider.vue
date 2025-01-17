<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { ConfigProviderContext, providerGlobalConfig } from "@packages/hooks";
import { computed } from "vue";
import { configProviderProps } from "./configProvider";

defineOptions({
  name: "ZConfigProvider"
});

const props = defineProps(configProviderProps);

const config: ConfigProviderContext = {};

const init = () => {
  Object.keys(props).forEach((key) => {
    if ((props as any)[key]) {
      (config as any)[key] = computed(() => (props as any)[key]!);
    }
  });
};

init();

// 注入全局配置
providerGlobalConfig(config);
</script>
