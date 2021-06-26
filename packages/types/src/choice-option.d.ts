import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export declare class LinChoiceOption extends LinViewUIComponent {
  // 分组的组名
  label: string;
  // 是否禁用该分组
  disabled: boolean;

  $slots: {
    // ChoiceItem 组件列表
    "": VNode[];
    default: VNode[];
    // 自定义分组显示内容
    label: VNode[];
  };
}
