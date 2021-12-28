import { LinViewUIComponent } from "./component";

export declare class LinPlayerProcess extends LinViewUIComponent {
  // 总时长
  totalTime: number;
  // 当前时间
  currentTime: number;
  // 已经缓冲的时长
  preloadTime: number;
  // 跳转
  $emit(eventName: "seek", time: number): this;
  // 时差
  $emit(eventName: "offsetTime", offsetTime: number): this;
}
