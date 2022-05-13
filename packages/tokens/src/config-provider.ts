import { configProviderProps } from "@packages/config-provider";
import { ComputedRef, ExtractPropTypes, InjectionKey } from "vue";

export interface ConfigProviderContext {
  size: ComputedRef<"large" | "small">;
  locale: ComputedRef<{
    LinViewUI: { [key: string]: any };
  }>;
}

export type ConfigProviderProps = Partial<
  ExtractPropTypes<typeof configProviderProps>
>;

export const configProviderContextKey: InjectionKey<ConfigProviderContext> =
  Symbol();
