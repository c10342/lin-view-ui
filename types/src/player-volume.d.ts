import { LinViewUIComponent } from "./component";

export declare class LinPlayerVolume extends LinViewUIComponent {
  // 音量
  volume: number;
  // 设置音量
  $emit(eventName: "setVolume", volume: number): this;
}
