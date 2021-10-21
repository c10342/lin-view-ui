import { VNode } from "vue";
import { LinViewUIComponent,DefaultType } from "./component";

export type LinkType = DefaultType| 'info'

export declare class LinLink extends LinViewUIComponent {
  // 类型
  type: LinkType;
  // 是否有下划线
  underline: boolean;
  // 是否禁用
  disabled: boolean;
  // 原生href属性
  href: string;
  // 图标类名
  icon: string;

  $slots:{
    '':VNode[]
    default:VNode[]
  }
}
