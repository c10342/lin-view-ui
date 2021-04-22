import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export interface ColObject {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
}

export declare class LinCol extends LinViewUIComponent {
  // 自定义元素标签
  tag: string;
  // 栅格占据列数
  span: number;
  // 栅格左侧的间隔数
  offset: number;
  // 栅格向右移动格数
  pull: number;
  // 栅格向左移动格数
  push: number;
  // 响应式栅格数或者属性对象  <768px
  xs: number | ColObject;
  // ≥768px 响应式栅格数或者栅格属性对象
  sm: number | ColObject;
  // ≥992 响应式栅格数或者栅格属性对象
  md: number | ColObject;
  // ≥1200 响应式栅格数或者栅格属性对象
  lg: number | ColObject;

  $slots: {
    '': VNode[]
    default:VNode[]
  }
}
