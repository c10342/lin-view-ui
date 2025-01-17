import { zhCN } from "@packages/locale";
import { Size } from "@packages/types";
import { ExtractPropTypes, PropType } from "vue";

export const configProviderProps = {
  // 尺寸
  size: String as PropType<Size>,
  // 国际化
  locale: Object as PropType<typeof zhCN>
} as const; // 只读

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
