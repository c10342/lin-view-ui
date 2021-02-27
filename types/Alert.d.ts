
import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export type AlertType = "success" | "warning" | "info" | "danger";

export type AlertEffect = "dark" | "light";

export declare class LinAlert extends LinViewUIComponent {
  // 标题
  title: string;
  //   辅助性文字
  description: string;
  //   图标
  icon: string;
  //   是否可关闭
  closable: boolean;
  //   类型
  type: AlertType;
  //   主题
  effect: AlertEffect;
  //   文字是否居中
  center: boolean;
  // 关闭时触发
  $emit(eventName: 'close'): this
  // 插槽
  $slots: {
    // 自定义图标
    'icon':VNode[],
    // 自定义标题
    'title':VNode[],
    // 自定义描述文字
    'description':VNode[],
    // 自定义关闭按钮
    'close':VNode[],
  }
}
