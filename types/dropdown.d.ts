import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinDropdown extends LinViewUIComponent {
  // 触发下拉的行为
  trigger: string;
  // 是否在点击菜单项后隐藏菜单
  hideOnClick: string;
  //   下拉框出现/隐藏时触发
  $emit(eventName: "visible-change", data: boolean): this;
  //   点击菜单项触发的事件回调
  $emit(eventName: "command", data: any): this;
  $slots: {
    //   自定义显示标签内容
    "": VNode[];
    default: VNode[];
    //   lin-dropdown-group 组件列表
    dropdown: VNode[];
  };
}
