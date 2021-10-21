import { VNode } from "vue";
import { LinViewUIComponent, LinViewUIDragMixin } from "./component";

export declare class LinDialog extends LinViewUIComponent
  implements LinViewUIDragMixin {
  // 标题
  title: string;
  // 宽度
  width: string;
  // 距离顶部距离，即margin-top的属性
  top: string;
  // 控制组件是否显示，支持.sync 修饰符
  visible: boolean;
  // 关闭前的回调，会暂停 Dialog 的关闭
  beforeClose: (claaback: () => void) => void;
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModa: boolean;
  // 是否可进行拖拽
  drag: boolean;
  // 配合.sync修饰符使用
  $emit(eventName:'update:visible',data:false):this;
  // 关闭的回调
  $emit(eventName:'close'):this;

  $slots:{
    // 主内容
    '':VNode[]
    default:VNode[]
    // 标题区内容
    title:VNode[]
    // 脚步内容
    footer:VNode[]
  }
}
