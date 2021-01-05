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
import LocaleMixin from 'src/mixins/locale.js';
import Image from 'packages/Image/index.js';
import defaultAvator from 'src/images/default_avatar.png';

export default {
  name: 'LinLiveComment',
  mixins: [LocaleMixin],
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
      default: ''
    },
    btnText: {
      type: String
    },
    arrowComment: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
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
      type: String
    },
    viewCount: {
      type: Number,
      default: 0
    },
    defaultAvator: {
      type: String,
      default: defaultAvator
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isScrollToBottom: true
    };
  },
  methods: {
    onScroll (e) {
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
    handlerOnScroll (e) {
      const { scrollTop, scrollHeight, offsetHeight } = e.target;
      if (scrollTop + offsetHeight + 40 < scrollHeight) {
        this.isScrollToBottom = false;
      } else {
        this.isScrollToBottom = true;
        this.$emit('toBottom');
      }
      this.$emit('scroll', e);
    },
    changeContent (str) {
      if (!str) {
        return '';
      }
      return str.replace(/\n/g, '<br/>');
    },
    toBottom () {
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
      this.isScrollToBottom = true;
    },
    publishComment () {
      if (this.isLoading) {
        return;
      }
      this.$emit('sendBtnClick');
    },
    onInput (e) {
      const { value } = e.target;
      this.$emit('input', value);
    },
    gotoLogin () {
      this.$emit('loginBtnClick');
    }
  },
  watch: {
    commentList: {
      immediate: true,
      handler (newVal) {
        if (newVal.length > 0 && this.isScrollToBottom) {
          this.$nextTick(() => {
            this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
          });
        }
      }
    }
  },
  computed: {
    commentPlaceholder () {
      if (this.placeholder) {
        return this.placeholder;
      }
      return this.t('LinViewUI.LiveComment.placeholder');
    },
    textareaAttr () {
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
  beforeDestroy () {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
  }
};
</script>
