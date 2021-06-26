import { VNode } from "vue";
import { LinViewUIComponent } from "./component";
import {ChoiceItemProps,ChoiceItemValue} from './choice-item'



export declare class LinChoiceGroup extends LinViewUIComponent {
  // 输入框占位符
  placeholder: string;
  //   绑定值
  value: ChoiceItemValue;
  //   作为 value 唯一标识的键名，绑定值为对象类型时必填
  valueKey: string;
  //   是否可清空
  clearable: boolean;
  //   是否禁用
  disabled: boolean;
  //   开启下拉加载时是否进行防抖
  isThrottle: boolean;
  //   是否开启下拉加载
  scroll: boolean;
  //   防抖间隔
  time: number;
  //   是否开启加载动画
  loading: boolean;
  //   加载提示语
  loadingTip: string;
  // 数据为空时提示语
  emptyTip: string;
  //   是否完成加载，一般用于滚动加载
  finishLoading: boolean;
  //   默认显示内容，一般用于滚动加载回显数据
  defaultLabelName: string | number;
  //   是否显示远程搜索输入框
  showSearchInput: boolean;
  //   远程搜索输入框占位符
  searchPlaceholder: string;
  //   是否开启本地搜索
  filterable: boolean;
  // 自定义本地搜索方法
  filterMethod: (value: ChoiceItemValue, props: ChoiceItemProps) => boolean;
  //   滚动到底部时触发触发
  $emit(eventName: "scrollToBottom", event: Event): this;
  //   input失去焦点
  $emit(eventName: "blur", event: Event): this;
  // input获得焦点
  $emit(eventName: "focus", event: Event): this;
  // 用户点击清空按钮时触发
  $emit(eventName: "clear"): this;
  // 配合v-model使用
  $emit(eventName: "input", value: ChoiceItemValue): this;
  //   选中值发生边变化
  $emit(eventName: "change", value: ChoiceItemValue): this;
  //   下拉框出现/隐藏时触发
  $emit(eventName: "visible-change", value: boolean): this;
  // 开启远程搜索时，在输入框按下回车或者点击搜索图标时触发
  $emit(eventName: "search", value: string): this;

  $slots: {
    // ChoiceItem 组件列表 或者 ChoiceOption 组件列表
    "": VNode[];
    default: VNode[];
    // 自定义数据为空的内容
    empty: VNode[];
    // 自定义加载动画
    loading: VNode[];
  };
}
