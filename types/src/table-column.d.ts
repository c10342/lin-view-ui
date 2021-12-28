import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export type TableColumnAlign = "left" | "right" | "center";

export declare class LinTableColumn extends LinViewUIComponent {
  // 对应列内容的字段名
  prop: string;
  // 显示的标题
  label: string;
  // 对应列的宽度
  width: string;
  // 对齐方式
  align: TableColumnAlign;
  // 对应列的类型
  type: string;

  $slots: {
    // 自定义列内容
    "": VNode[];
    default: VNode[];
  };
}
