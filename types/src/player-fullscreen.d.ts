import { LinViewUIComponent } from "./component";

export declare class LinPlayerFullscreen extends LinViewUIComponent {
  // 点击浏览器全屏按钮
  $emit(eventName: "browser-fullscreen"): this;
  // 点击网页全屏按钮
  $emit(eventName: "web-fullscreen"): this;
}
