import { LinViewUIComponent } from "./component";

export declare class LinUpload extends LinViewUIComponent {
  // 文本
  text: string;
  // 切片大小
  fileChunkSize: number;
  // 上传地址
  uploadUrl: string;
  // 请求合并切片地址
  mergeUrl: string;
  // 是否切片上传
  isSlice: boolean;
  // 开启断点续传功能
  breakpoint: boolean;
  // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  beforeUpload: (file: File) => Promise<any>;
  // 对文件进行切片的处理方法
  splitFileChunk: (file: File, chunkSize: number) => Array<File>;
  // 计算文件 hash 值的方法，需返回一个 Promise
  caculateFileHash: (file: File) => Promise<string>;
  // 请求合并切片的方法 ，需返回一个 Promise
  requestMergeFileFn: (params: {
    filename: string;
    size: number;
    fileHash?: string;
  }) => Promise<any>;
  //   计算文件 hash 值成功的时候触发，仅在 breakpoint 为 true 时有效
  $emit(eventName: "caculateFileHashSuccess", data: string): this;
  //   计算文件 hash 值失败的时候触发，仅在 breakpoint 为 true 时有效
  $emit(eventName: "caculateFileHashFail", error: any): this;
  //   文件上传成功的时候触发，仅在 breakpoint 为 false 和 isSlice 为 false 有效
  $emit(eventName: "uploadSuccess", data: any): this;
  //   文件上传失败的时候触发，仅在 breakpoint 为 false 和 isSlice 为 false 有效
  $emit(eventName: "uploadFail", error: any): this;
  //   所有切片上传成功的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效
  $emit(eventName: "uploadChunkSuccess", data: any): this;
  //   所有切片上传失败的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效
  $emit(eventName: "uploadChunkFail", error: any): this;
  //   对文件进行切片成功的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效
  $emit(eventName: "createChunkListSuccess", data: Array<File>): this;
  //   对文件进行切片失败的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效
  $emit(eventName: "createChunkListFail", error: any): this;
  //   请求合并文件成功的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效
  $emit(eventName: "mergeFileSuccess", data: any): this;
  //   请求合并文件失败的时候触发，仅在 breakpoint 为 true 或者 isSlice 为 true 有效
  $emit(eventName: "mergeFileFail", error: any): this;
}
