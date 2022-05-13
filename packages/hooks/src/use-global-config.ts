import {
  configProviderContextKey,
  ConfigProviderContext,
  ConfigProviderProps
} from "@packages/tokens";
import { computed, inject, provide } from "vue";

const globalConfig: Partial<ConfigProviderContext> = {};
export const useGlobalConfig = (
  key?: keyof ConfigProviderContext,
  defaultValue?: any
) => {
  const config = inject(configProviderContextKey, globalConfig);

  if (key) {
    if (config) {
      return config[key] ?? defaultValue;
    }
    return defaultValue;
  }
  return config;
};

export const providerGlobalConfig = (props: ConfigProviderProps) => {
  const config: Partial<ConfigProviderContext> = {};
  Object.keys(props).forEach((key) => {
    (config as any)[key] = computed(() => (props as any)[key]);
  });
  provide(configProviderContextKey, config);
};
