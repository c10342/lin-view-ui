import { VNode } from "vue";
import { LinViewUIComponent } from "./component";

export interface LiveCommentCommentItem {
  _username: string;
  _createTimeTip: string;
  _content: string;
  _avatorUrl: string;
  [key: string]: any;
}

export interface LinLiveCommentFixComment {
  _username: string;
  _content: string;
  [key: string]: any;
}

export declare class LinLiveComment extends LinViewUIComponent {
  // 评论列表
  commentList: LiveCommentCommentItem[];
  // 悬浮的评论，当 fixComment 不为空并且列表没有滚动到最底部时显示
  fixComment: LinLiveCommentFixComment;
  // 绑定值
  value: string;
  // 按钮文本
  btnText: string;
  // 是否允许发表评论
  arrowComment: boolean;
  // 输入框占位符
  placeholder: string;
  // 输入框最长长度
  maxlength: number;
  // 是否节流滚动事件
  throttle: boolean;
  // 标题
  title: string;
  // 观看人数
  viewCount: number;
  // 默认头像
  defaultAvator: string;
  // 是否正在加载，防止用户多次点击
  isLoading: boolean;
  //   列表滚动到底部时触发
  $emit(eventName: "toBottom"): this;
  //   列表滚动时触发
  $emit(eventName: "scroll", event: Event): this;
  //   点击发送按钮时触发
  $emit(eventName: "sendBtnClick"): this;
  //   配合v-model指令使用
  $emit(eventName: "input", data: string): this;
  //   点击登录时触发
  $emit(eventName: "loginBtnClick"): this;
  $slots: {
    // 评论列表项内容
    "": VNode[];
    default: VNode[];
    //   观看人数内容(副标题区内容)
    "view-count": VNode[];
    //   不允许发表评论时显示的内容
    mask: VNode[];
  };
}
