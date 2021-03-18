import Vue, { VNodeDirective } from "vue";

export interface LinTooltip {
  install(vue: typeof Vue): void;
}

export interface LinTooltipDirective extends VNodeDirective {
  name: "tooltip";
  // 绑定值
  value: string;
  // 修饰符
  modifiers: {
    // 设置 tooltip 展示方向为上边
    top: boolean;
    // 设置 tooltip 展示方向为下边
    bottom: boolean;
    // 设置 tooltip 展示方向为左边
    left: boolean;
    // 设置 tooltip 展示方向为右边
    right: boolean;
    // 文字超出则显示 tooltip ，不超出则不显示 tooltip
    auto: boolean;
  };
}
