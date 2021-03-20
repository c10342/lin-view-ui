import Vue from "vue";

export interface LinVideoPlayerOptions {
  // 播放器容器元素
  el: string | HTMLElement;
  //   播放类型，必填项，当 customType 参数存在时非必填
  type: "mp4" | "hls" | "flv";
  //   是否自动播放
  autoplay?: boolean;
  //   视频速度倍数列表
  speedList?: Array<{ label: string; value: string }>;
  //   视频列表，必填项
  videoList: Array<{ label: string; url: string }>;
  //   是否开启直播
  live?: boolean;
  //   需要自定义支持其他 MSE 可使用此参数
  customType?: (
    video: HTMLVideoElement,
    data: {
      // 当前播放的视频
      currenVideo: { label: string; url: string };
      //   是否自动播放
      autoplay: boolean;
      //   倍数列表
      speedList: Array<{ label: string; value: string }>;
      //   视频列表
      videoList: Array<{ label: string; url: string }>;
      //   是否为直播
      live: boolean;
    }
  ) => void;
}

export declare class LinVideoPlayerService {
  // 原生 video
  video: HTMLVideoElement;
  //   hls 实例对象
  hls: any;
  //   flv 实例对象
  flv: any;
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
  //   切换到其他视频
  switchVideo(options: {
    videoList: Array<{ label: string; url: string }>;
    autoplay?: boolean;
  }): void;
  //   显示通知，时间的单位为毫秒，默认时间 2000 毫秒
  notice(text: string, time: number): void;
  //   切换清晰度
  switchQuality(index: number): void;
  //   销毁播放器
  destroy(): void;
  //   设置视频速度
  speed(rate: number): void;
  //   设置视频音量
  volume(percentage: number): void;
}

export interface LinVideoPlayer {
  install(vue: typeof Vue): void;
}

declare module "vue/types/vue" {
  interface Vue {
    $VideoPlayer: LinVideoPlayerService;
  }
}
