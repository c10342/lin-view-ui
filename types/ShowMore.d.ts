import { LinViewUIComponent } from "./component";

export declare class LinShowMore extends LinViewUIComponent {
  // 显示文本的长度
  len: number;
  // 文本
  text: string;
  // 折叠时需要显示文案
  showText: string;
  // 隐藏时需要显示文案
  hiddenText: string;
  // 是否允许折叠
  allowFold: boolean;
}
