import { LinViewUIComponent } from "./component";

export declare class LinPagination extends LinViewUIComponent {
  // 页码按钮的数量，当总页数超过该值时会折叠
  pageCount: number;
  // 每页显示条目个数
  pageSize: number;
  // 总条目数
  total: number;
  // 当前页数，支持 .sync 修饰符
  pageIndex: number;
  // 是否为分页按钮添加背景色是否为分页按钮添加背景色
  background: boolean;
  // 组件布局，子组件名用逗号分隔
  layout: string;

  //   pageIndex 改变时会触发
  $emit(eventName: "currentChange", index: number): this;
  //   用户点击上一页按钮改变当前页后触发
  $emit(eventName: "prevClick", index: number): this;
  //   用户点击下一页按钮改变当前页后触发
  $emit(eventName: "nextClick", index: number): this;
  //   配合pageIndex.sync使用
  $emit(eventName: "update:pageIndex", index: number): this;
}
