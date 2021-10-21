import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinTabItem extends LinViewUIComponent {
  // 选项卡标题
  label: string;
  // 与选项卡绑定值 value 对应的标识符，表示选项卡别名
  name: string;
  // 是否禁用
  disabled: boolean;

  $slots: {
    //   选项卡的内容
    "": VNode[];
    default: VNode[];
    //   自定义标签内容
    label: VNode[];
  };
}
