<template>
  <div class="l-comment" :style="{width,height}">
    <slot name="title">
      <p class="l-comment-title">{{title}}</p>
    </slot>
    <slot name="view-cont">
      <p class="l-comment-view-count">{{viewCount}}人正在观看</p>
    </slot>
    <div class="l-comment-content" ref="scroll" @scroll="onScroll">
      <slot v-for="(item,index) in commentList" :item="item">
        <div class="l-comment-item" :key="index">
          <l-image
            errorMsg
            class="l-comment-user-avator"
            :imgUrl="[item._avatorUrl,defaultAvator]"
          />
          <div class="l-comment-info-box">
            <div class="l-comment-user-name">
              <span>{{item.username}}</span>
              <span>{{item.createTimeTip}}</span>
            </div>
            <div class="l-comment-info" v-html="changeContent(item.content)"></div>
          </div>
        </div>
      </slot>
    </div>
    <div class="l-comment-fix" v-if="!isScrollToBottom && fixComment">
      <span>{{fixComment.username}}：</span>
      <span v-html="changeContent(fixComment.content)"></span>
      <span @click="toBottom">
        <span>查看</span>
        <i class="l-icon-downarrow"></i>
      </span>
    </div>
    <div class="l-comment-input">
      <div class="l-comment-mask" v-if="!arrowComment">
        <slot name="mask">
          <span class="l-comment-mask-default">
            发表您的观点 /
            <span class="l-comment-login-btn" @click="gotoLogin">登录</span>
            后发表评论
          </span>
        </slot>
      </div>
      <textarea
        :maxlength="maxlength"
        :placeholder="arrowComment?placeholder:''"
        @input="onInput"
        class="l-comment-textarea"
      ></textarea>
      <span class="l-comment-send-btn" @click="publishComment">{{btnText}}</span>
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
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "100%"
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

<style lang="scss" scoped>
@mixin one-line {
  // width: 100%;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 美化滚动条
@mixin beautyScroll {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
.l-comment {
  width: 320px;
  height: 500px;
  background: rgba(16, 26, 42, 1);
  position: relative;
  display: flex;
  flex-direction: column;
}
.l-comment-login-btn {
  color: #ef7237;
  cursor: pointer;
}
.l-comment-title {
  margin: 0;
  width: 320px;
  height: 40px;
  background: rgba(40, 58, 86, 1);

  font-size: 14px;
  font-weight: 400;
  color: rgba(196, 208, 227, 1);
  line-height: 40px;
  text-align: center;
}

.l-comment-content {
  overflow: auto;
  flex: 1;
  height: 0;
  background: rgba(16, 26, 42, 1);
  box-sizing: border-box;
  padding: 10px;
  position: relative;
  @include beautyScroll;
}
.l-comment-input {
  height: 72px;
  background: rgba(34, 52, 82, 1);
  box-sizing: border-box;
  //   padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}

.l-comment-textarea {
  resize: none;
  width: 238px;
  height: 52px;
  background: rgba(25, 36, 54, 1);
  border: none;
  appearance: none;
  outline: none;
  margin: 0;
  box-sizing: border-box;
  padding: 5px;
  color: #767891;

  @include beautyScroll;
}
.l-comment-send-btn {
  width: 62px;
  height: 52px;
  background: rgba(59, 87, 133, 1);

  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);

  line-height: 52px;
  text-align: center;
  cursor: pointer;
}
.l-comment-mask {
  position: absolute;
  width: 238px;
  height: 52px;
  box-sizing: border-box;
  padding: 5px;
  top: 10px;
  left: 15px;
}
.l-comment-mask-default {
  font-size: 14px;
  color: #767891;
}
.l-comment-item {
  display: flex;
  flex-direction: row;
  > .l-comment-user-avator {
    width: 26px;
    height: 26px;
    border-radius: 50%;
  }
}

.l-comment-info-box {
  width: 264px;
  box-sizing: border-box;
  padding-left: 10px;
}

.l-comment-user-name {
  display: flex;
  flex-direction: row;
  line-height: 26px;
  margin-bottom: 5px;
  > span:nth-child(1) {
    max-width: 127px;
    font-size: 14px;
    font-weight: 400;
    margin-right: 5px;
    color: rgba(184, 198, 216, 1);
    @include one-line;
  }
  > span:nth-child(2) {
    font-size: 12px;
    font-weight: 400;
    color: rgba(120, 138, 161, 1);
    text-align: right;
    flex: 1;
    width: 0;
  }
}
.l-comment-view-count {
  text-align: right;
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: rgba(120, 138, 161, 1);
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
}
.l-comment-info {
  width: 254px;
  box-sizing: border-box;
  padding: 5px;
  // height:44px;
  background: rgba(46, 62, 85, 1);
  border-radius: 2px;

  font-size: 12px;
  font-weight: 400;
  color: rgba(184, 198, 216, 1);
  line-height: 20px;

  word-wrap: break-word;
  word-break: normal;
}

.l-comment-fix {
  position: absolute;
  bottom: 71px;
  left: 0;
  width: 100%;
  height: 32px;
  background: #665c47;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: rgba(250, 247, 235, 1);
  box-sizing: border-box;
  padding: 0 7px;
  > span:nth-child(1) {
    width: 50px;
    @include one-line;
  }
  > span:nth-child(2) {
    width: 216px;
    @include one-line;
  }
  > span:nth-child(3) {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
