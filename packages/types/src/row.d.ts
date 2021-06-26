import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinRow extends LinViewUIComponent {
  // 自定义标签元素
  tag: string;
  // 栅格间隔
  gutter: number;
  // 布局模式
  type: string;
  // flex 布局下的水平排列方式
  justify: string;
  // flex 布局下的垂直排列方式
  align: string;

  $slots: {
    // Col组件列表
    '': VNode[]
    default:VNode[]
  }
}
