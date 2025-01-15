import { zhCN } from "@packages/locale";
import { Size } from "@packages/types";
import { computed, ComputedRef, inject, InjectionKey, provide } from "vue";

export interface ConfigProviderContext {
  locale?: ComputedRef<typeof zhCN>;
  size?: ComputedRef<Size>;
}

const configProviderContextKey: InjectionKey<ConfigProviderContext> = Symbol(
  "ConfigProviderContextKey"
);

// 全局配置
export const useGlobalConfig = () => {
  return inject(configProviderContextKey, {
    // config-provider组件没有注入全局配置的情况下，使用默认配置
    locale: computed(() => zhCN),
    size: computed(() => ""),
  }) as Required<ConfigProviderContext>;
};

// 通过config-provider组件注入全局配置
export const providerGlobalConfig = (props: ConfigProviderContext) => {
  provide(configProviderContextKey, props);
};
