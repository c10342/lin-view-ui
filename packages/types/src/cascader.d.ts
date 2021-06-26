import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export interface CascaderOption {
  // 显示标签
  label: string;
  // 值
  value: any;
  //   子节点
  children?: CascaderOption[];
  //   是否禁用
  disabled?: boolean;
  // 是否为最终的子节点
  leaf?: boolean;
  // 唯一标识
  id?: string | number;
}

export declare class LinCascader extends LinViewUIComponent {
  // 可选项数据源
  options: CascaderOption[];
  //   自定义数据显示方法
  showFormat: (value: CascaderOption) => string;
  //   选项中绑定的值
  value: CascaderOption;
  //   是否支持清空
  clearable: boolean;
  //   输入框文本占位符
  placeholder: string;
  //   是否动态加载子节点，需与 lazyLoad 方法结合使用
  lazy: boolean;
  // 加载动态数据的方法，仅在 lazy 为 true 时有效
  lazyLoad: (level: number, data: CascaderOption) => CascaderOption;
  // 选项分隔符
  separator: string;
  // 指定选项标签为选项对象的某个属性值
  label: string;
  // 指定选项的子选项为选项对象的某个属性值
  children: string;
  // 指定选项的最终叶子节点的标志位为选项对象的某个属性值
  leaf: string;
  // 指定选项的禁用为选项对象的某个属性值
  disabled: string;
  // 指定选项的唯一值为选项对象的某个属性值
  valueKey: string;
  // 暂无数据提示语
  emptyTip: string;
  // 失去焦点出发
  $emit(eventName: "blur", event: Event): this;
  //   获得焦点触发
  $emit(eventName: "focus", event: Event): this;
  //   选中节点发生变化时触发
  $emit(
    eventName: "change",
    data: { level: number; data: CascaderOption }
  ): this;
  //   下拉框显示或者隐藏时触发
  $emit(eventName: "visible-change", data: boolean): this;
  //   配合v-model指令事件
  $emit(eventName: "input", data: CascaderOption): this;
  // 插槽
  $slots: {
    empty: VNode[];
  };
}
