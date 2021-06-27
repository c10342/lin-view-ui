import Vue from "vue";

export interface LinMultiPlayerOptions {
  // 播放器容器元素
  el: string | HTMLElement;
  //   播放类型，必填项，当 customType 参数存在时非必填
  type: "mp4" | "hls" | "flv";
  //   是否自动播放
  autoplay?: boolean;
  //   视频列表，必填项
  videoList: Array<{ label: string; url: string }>;
  //   是否开启直播
  live?: boolean;
}

export declare class LinMultiPlayerService {
  //   返回视频当前播放时间
  currentTime: number;
  //   返回视频总时间
  totalTime: number;
  //   返回视频是否暂停
  paused: boolean;
  fullScreen: {
    // 进入全屏
    request(type: "web" | "browser");
    // 退出全屏
    cancel(type: "web" | "browser");
  };
  //   播放视频
  play(): void;
  //   暂停视频
  pause(): void;
  //   跳转到特定时间
  seek(time: number): void;
  //   切换播放和暂停
  toggle(): void;
  //   绑定 video 标签事件
  on(event: string, handler: (event: Event) => void): void;
  // 设置音量
  setVolume(percent: number): void;
  //   销毁播放器
  destory(): void;
}

export interface LinMultiPlayer {
  install(vue: typeof Vue): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $MultiPlayer: LinMultiPlayerService;
  }
}
