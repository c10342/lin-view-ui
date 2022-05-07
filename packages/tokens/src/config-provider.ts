import { configProviderProps } from "@packages/config-provider";
import { ExtractPropTypes, InjectionKey, Ref } from "vue";

export type ConfigProviderContext = Partial<
  ExtractPropTypes<typeof configProviderProps>
>;

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol();
