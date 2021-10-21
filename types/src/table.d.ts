import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

type RowClassNameFn = (data: {
  row: Record<string, any>;
  rowIndex: Number;
}) => string;

export type TableRowClassName = string | RowClassNameFn;

export declare class LinTable extends LinViewUIComponent {
  // 数据源
  dataSource: Array<Record<string, any>>;
  // 边框表格
  border: boolean;
  // 斑马纹
  stripe: boolean;
  // 每一行的类名
  rowClassName: TableRowClassName;
  // 每一行数据的唯一标识key
  valueKey: string;
  //   当选择项发生变化时会触发该事件
  $emit(eventName: "selection-change", data: Array<Record<string, any>>): this;
  //   当用户手动勾选全选 Checkbox 时触发的事件
  $emit(eventName: "select-all", data: Array<Record<string, any>>): this;
  //   当用户手动勾选数据行的 Checkbox 时触发的事件
  $emit(
    eventName: "select",
    data: { row: Record<string, any>; checked: boolean; rowIndex: number }
  ): this;
  //   当某一行被点击时会触发该事件
  $emit(
    eventName: "row-click",
    data: { row: Record<string, any>; rowIndex: number }
  ): this;
  //   当某个单元格被点击时会触发该事件
  $emit(
    eventName: "cell-click",
    data: {
      row: Record<string, any>;
      rowIndex: number;
      prop: Record<string, any>;
      cellIndex: number;
    }
  ): this;
  //   用于多选表格，清空用户的选择
  clearSelection: () => void;
  //   用于多选表格，切换所有行的选中状态
  toggleAllSelection: () => void;
  //   用于多选表格，用来选择中多行
  selectSelection: (
    data: Array<{ valueKey: string; [key: string]: any }>
  ) => void;

  $slots: {
    // 一般是LinTableColumn组件
    "": VNode[];
    default: VNode[];
  };
}
