<template>
  <div class="lin-live-comment">
    <slot name="title">
      <p class="lin-live-comment-title">
        {{ title || t("LinViewUI.LiveComment.title") }}
      </p>
    </slot>
    <slot name="view-count">
      <p class="lin-live-comment-view-count">
        {{ viewCount }}{{ t("LinViewUI.LiveComment.viewPeople") }}
      </p>
    </slot>
    <div class="lin-live-comment-content" ref="scroll" @scroll="onScroll">
      <slot v-for="(item, index) in commentList" :item="item">
        <div class="lin-live-comment-item" :key="index">
          <lin-image
            errorMsg
            class="lin-live-comment-user-avator"
            :imgUrl="[item._avatorUrl, defaultAvator]"
          />
          <div class="lin-live-comment-info-box">
            <div class="lin-live-comment-user-name">
              <span>{{ item._username }}</span>
              <span>{{ item._createTimeTip }}</span>
            </div>
            <div
              class="lin-live-comment-info"
              v-html="changeContent(item._content)"
            ></div>
          </div>
        </div>
      </slot>
    </div>
    <div class="lin-live-comment-fix" v-if="!isScrollToBottom && fixComment">
      <span>{{ fixComment._username }}：</span>
      <span v-html="changeContent(fixComment._content)"></span>
      <span @click="toBottom">
        <span>{{ t("LinViewUI.LiveComment.see") }}</span>
        <i class="lin-icon-downarrow"></i>
      </span>
    </div>
    <div class="lin-live-comment-input">
      <div class="lin-live-comment-mask" v-if="!arrowComment">
        <slot name="mask">
          <span class="lin-live-comment-mask-default">
            {{ t("LinViewUI.LiveComment.publishOpinion") }} /
            <span class="lin-live-comment-login-btn" @click="gotoLogin">{{
              t("LinViewUI.LiveComment.login")
            }}</span>
            {{ t("LinViewUI.LiveComment.commentAfter") }}
          </span>
        </slot>
      </div>
      <textarea
        :value="value"
        v-bind="textareaAttr"
        @keyup="onInput"
        class="lin-live-comment-textarea"
      ></textarea>
      <span class="lin-live-comment-send-btn" @click="publishComment">{{
        btnText || t("LinViewUI.LiveComment.btnText")
      }}</span>
    </div>
  </div>
</template>

<script>
import { LocaleMixin } from "@src/mixins";
import Image from "@packages/image";
import defaultAvator from "./images/default_avatar.png";

export default {
  name: "LinLiveComment",
  mixins: [LocaleMixin],
  components: {
    [Image.name]: Image
  },
  props: {
    // 评论列表
    commentList: {
      type: Array,
      default: () => []
    },
    // 悬浮的评论，当 fixComment 不为空并且列表没有滚动到最底部时显示
    fixComment: {
      type: Object,
      default: null
    },
    // 绑定值
    value: {
      type: String,
      default: ""
    },
    // 按钮文本
    btnText: {
      type: String
    },
    // 是否允许发表评论
    arrowComment: {
      type: Boolean,
      default: false
    },
    // 输入框占位符
    placeholder: {
      type: String
    },
    // 输入框最长长度
    maxlength: {
      type: Number,
      default: -1
    },
    // 是否节流滚动事件
    throttle: {
      type: Boolean,
      default: true
    },
    // 标题
    title: {
      type: String
    },
    // 观看人数
    viewCount: {
      type: Number,
      default: 0
    },
    // 默认头像
    defaultAvator: {
      type: String,
      default: defaultAvator
    },
    // 是否正在加载，防止用户多次点击
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 是否滚动到底部，默认是在底部
      isScrollToBottom: true
    };
  },
  methods: {
    onScroll(e) {
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }
      if (this.throttle) {
        this.scrollTimer = setTimeout(() => {
          this.handlerOnScroll(e);
        }, 500);
      } else {
        this.handlerOnScroll(e);
      }
    },
    handlerOnScroll(e) {
      const { scrollTop, scrollHeight, offsetHeight } = e.target;
      if (scrollTop + offsetHeight + 40 < scrollHeight) {
        // 还没滚动到底部
        this.isScrollToBottom = false;
      } else {
        this.isScrollToBottom = true;
        this.$emit("toBottom");
      }
      this.$emit("scroll", e);
    },
    // 处理评论内容
    changeContent(str) {
      if (!str) {
        return "";
      }
      return str.replace(/\n/g, "<br/>");
    },
    // 跳转到底部
    toBottom() {
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
      this.isScrollToBottom = true;
    },
    // 点击发表评论按钮
    publishComment() {
      if (this.isLoading) {
        return;
      }
      this.$emit("sendBtnClick");
    },
    // 输入框输入事件
    onInput(e) {
      const { value } = e.target;
      this.$emit("input", value);
    },
    // 点击登录按钮
    gotoLogin() {
      this.$emit("loginBtnClick");
    }
  },
  watch: {
    commentList: {
      immediate: true,
      handler(newVal) {
        if (newVal.length > 0 && this.isScrollToBottom) {
          // 如果列表本来就是在底部，当有新的评论的时候需要滚动到底部
          this.$nextTick(() => {
            this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
          });
        }
      }
    }
  },
  computed: {
    commentPlaceholder() {
      if (this.placeholder) {
        return this.placeholder;
      }
      return this.t("LinViewUI.LiveComment.placeholder");
    },
    // 文本输入框属性
    textareaAttr() {
      const obj = {};
      if (this.maxlength !== -1) {
        obj.maxlength = this.maxlength;
      }
      if (this.arrowComment) {
        obj.placeholder = this.commentPlaceholder;
      }
      return obj;
    }
  },
  beforeDestroy() {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
  }
};
</script>
