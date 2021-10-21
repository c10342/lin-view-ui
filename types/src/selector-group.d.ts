import { CreateElement, VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinSelectorGroup extends LinViewUIComponent {
  // 选择器整体宽度
  width: string;
  // labelWidth
  labelWidth: string;
  // 绑定值
  value: string | Record<string, any> | number | boolean;
  // 作为 value 唯一标识的键名，绑定值为对象类型时必填
  valueKey: string;
  // 自定义渲染更多标签内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是否展开或收起的状态值。可以使用 jsx
  renderMore: (h: CreateElement, status: number) => VNode[];
  // 自定义渲染头部标签内容，使用 Vue 的 Render 函数，参数是 h，可以使用 jsx
  renderLabel: (h: CreateElement) => VNode[];
  // 头部标签内容
  label: string;
  // 是否禁用
  disabled: boolean;
//   标签全部显示时触发	
  $emit(eventName:'show'):this;
//   标签超出部分隐藏时触发
  $emit(eventName:'hide'):this;
//   配合v-model使用
  $emit(eventName:'input'):this;
//   选中值发生变化时触发
  $emit(eventName:'onChange'):this;

  $slots:{
    //   一般是LinSelectorItem组件
      '':VNode[]
      default:VNode[]
  }
}
