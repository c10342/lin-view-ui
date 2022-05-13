import {
  configProviderContextKey,
  ConfigProviderContext,
  ConfigProviderProps
} from "@packages/tokens";
import { computed, inject, provide } from "vue";

const globalConfig: Partial<ConfigProviderContext> = {};

export const useGlobalConfig = (
  defaultValue: Partial<ConfigProviderContext> = {}
) => {
  return inject(configProviderContextKey, {
    ...globalConfig,
    ...defaultValue
  });
};

export const providerGlobalConfig = (props: ConfigProviderProps) => {
  const config: Partial<ConfigProviderContext> = {};
  Object.keys(props).forEach((key) => {
    (config as any)[key] = computed(() => (props as any)[key]);
  });
  provide(configProviderContextKey, config);
};
