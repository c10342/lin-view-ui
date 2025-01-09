import { ExtractPropTypes, PropType } from "vue";

// 按钮尺寸大小
export type ButtonSize = "large" | "default" | "small";
// 原生 button type 属性
export type ButtonNativeType = "button" | "submit" | "reset";
// 按钮类型
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";

// 按钮属性
export const buttonProps = {
  // 按钮尺寸
  size: String as PropType<ButtonSize>,
  //   按钮类型
  type: {
    type: String,
    // 校验按钮类型
    validator: (val: string) => {
      return ["primary", "success", "warning", "danger", "info"].includes(val);
    }
  },
  //   原生 type 属性
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: "button"
  }
} as const; // 只读

// 按钮事件
export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent
};

// 按钮属性 ts 类型
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

// 按钮事件 ts 类型
export type ButtonEmits = typeof buttonEmits;
