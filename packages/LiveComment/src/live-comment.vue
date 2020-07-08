<template>
  <div class="l-live-comment">
    <slot name="title">
      <p class="l-live-comment-title">{{title}}</p>
    </slot>
    <slot name="view-count">
      <p class="l-live-comment-view-count">{{viewCount}}人正在观看</p>
    </slot>
    <div class="l-live-comment-content" ref="scroll" @scroll="onScroll">
      <slot v-for="(item,index) in commentList" :item="item">
        <div class="l-live-comment-item" :key="index">
          <l-image
            errorMsg
            class="l-live-comment-user-avator"
            :imgUrl="[item._avatorUrl,defaultAvator]"
          />
          <div class="l-live-comment-info-box">
            <div class="l-live-comment-user-name">
              <span>{{item._username}}</span>
              <span>{{item._createTimeTip}}</span>
            </div>
            <div class="l-live-comment-info" v-html="changeContent(item._content)"></div>
          </div>
        </div>
      </slot>
    </div>
    <div class="l-live-comment-fix" v-if="!isScrollToBottom && fixComment">
      <span>{{fixComment._username}}：</span>
      <span v-html="changeContent(fixComment._content)"></span>
      <span @click="toBottom">
        <span>查看</span>
        <i class="l-icon-downarrow"></i>
      </span>
    </div>
    <div class="l-live-comment-input">
      <div class="l-live-comment-mask" v-if="!arrowComment">
        <slot name="mask">
          <span class="l-live-comment-mask-default">
            发表您的观点 /
            <span class="l-live-comment-login-btn" @click="gotoLogin">登录</span>
            后发表评论
          </span>
        </slot>
      </div>
      <textarea
        :value="value"
        :maxlength="maxlength"
        :placeholder="arrowComment?placeholder:''"
        @input="onInput"
        class="l-live-comment-textarea"
      ></textarea>
      <span class="l-live-comment-send-btn" @click="publishComment">{{btnText}}</span>
    </div>
  </div>
</template>

<script>
import Image from "../../Image";
export default {
  name: "l-live-comment",
  components: {
    [Image.name]: Image
  },
  props: {
    commentList: {
      type: Array,
      default: () => []
    },
    fixComment: {
      type: Object,
      default: null
    },
    value: {
      type: String,
      default: ""
    },
    btnText: {
      type: String,
      default: "发送"
    },
    arrowComment: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    maxlength: {
      type: Number,
      default: -1
    },
    throttle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "直播评论"
    },
    viewCount: {
      type: Number,
      default: 0
    },
    defaultAvator: {
      type: String,
      default: require("packages/assets/images/default_avatar.png")
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
        this.isScrollToBottom = false;
      } else {
        this.isScrollToBottom = true;
        this.$emit("toBottom");
      }
      this.$emit("scroll", e);
    },
    changeContent(str) {
      if (!str) {
        return "";
      }
      return str.replace(/\n/g, "<br/>");
    },
    toBottom() {
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
      this.isScrollToBottom = true;
    },
    publishComment() {
      if (this.isLoading) {
        return;
      }
      this.$emit("sendBtnClick");
    },
    onInput(e) {
      const { value } = e.target;
      this.$emit("input", value);
    },
    gotoLogin() {
      this.$emit("loginBtnClick");
    }
  },
  watch: {
    commentList: {
      immediate: true,
      handler: function(newVal) {
        if (newVal.length > 0 && this.isScrollToBottom) {
          this.$nextTick(() => {
            this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
          });
        }
      }
    }
  },
  beforeDestroy() {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
  }
};
</script>


