import {
  ConfigProviderContext,
  configProviderContextKey
} from "@packages/tokens";
import { computed, inject, provide, ref } from "vue";

const globalConfig = ref<ConfigProviderContext>();

export const useGlobalConfig = (
  key?: keyof ConfigProviderContext,
  defaultValue = undefined
) => {
  const config = inject(configProviderContextKey, globalConfig);
  if (key) {
    return computed(() => {
      return config.value?.[key] ?? defaultValue;
    });
  }
  return config;
};

export const providerGlobalConfig = (config: ConfigProviderContext) => {
  const context = computed(() => {
    return config;
  });

  provide(configProviderContextKey, context);

  return context;
};
