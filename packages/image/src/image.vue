<template>
  <div class="lin-image">
    <img
      @click="onImageClick"
      :alt="alt"
      :referrer-policy="referrerPolicy"
      :class="[{ [`lin-image-object-${fit}`]: fit }, 'lin-image-img']"
      v-if="isShowImg"
      :src="url"
      @error="onError"
      @load="onLoad"
    />
    <slot v-else>
      <div class="lin-image-error">
        {{ errorMsg || t('LinViewUI.Image.errorMsg') }}
      </div>
    </slot>
    <transition :name="transitionName">
      <div class="lin-image-mask" v-if="showPreview" @click="onMaskClick">
        <span class="lin-image-close" @click.stop="onImageClick">
          <span class="lin-image-line lin-image-line-left"></span>
          <span class="lin-image-line lin-image-line-right"></span>
        </span>
        <img :src="url" :alt="alt" />
      </div>
    </transition>
  </div>
</template>

<script>
import LocaleMixin from 'src/mixins/locale.js';

export default {
  name: 'LinImage',
  mixins: [LocaleMixin],
  props: {
    // 图片地址
    imgUrl: [Array, String],
    // 确定图片如何适应容器框，同原生 object-fit
    fit: {
      type: String,
      default: ''
    },
    // 原生 referrerPolicy
    referrerPolicy: {
      type: String,
      default: ''
    },
    // 原生 alt
    alt: {
      type: String,
      default: ''
    },
    // 开启图片预览
    preview: {
      type: Boolean,
      default: false
    },
    // 图片预览显示动画，即 transition 组件 name 属性
    transitionName: {
      type: String,
      default: 'lin-image-animation'
    },
    // 点击遮罩层是否可以关闭图片预览
    clickMask: {
      type: Boolean,
      default: true
    },
    // 图片加载失败提示语
    errorMsg: {
      type: String
    }
  },
  data() {
    return {
      // 正在加载第几张图片
      index: 0,
      // 是否加载图片错误
      isError: false,
      // 显示预览图片
      showPreview: false
    };
  },
  methods: {
    // 点击图片
    onImageClick() {
      if (this.preview) {
        this.showPreview = !this.showPreview;
      }
    },
    // 点击预览图片的遮罩层
    onMaskClick() {
      if (this.clickMask) {
        this.onImageClick();
      }
    },
    // 图片加载错误回调
    onError(e) {
      if (Array.isArray(this.imgUrl)) {
        // 图片加载失败
        this.$emit('error', {
          url: this.imgUrl[this.index],
          index: this.index,
          e
        });
        if (this.index === this.imgUrl.length - 1) {
          // 所有图片加载失败
          this.isError = true;
          this.$emit('AllError', {
            urls: this.imgUrl.slice(),
            e
          });
          return;
        }
        this.index += 1;
      } else {
        this.$emit('error', {
          url: this.imgUrl,
          e
        });
      }
    },
    // 图片加载成功回调
    onLoad(e) {
      if (Array.isArray(this.imgUrl)) {
        this.$emit('success', {
          url: this.imgUrl[this.index],
          index: this.index,
          e
        });
      } else {
        this.$emit('success', {
          url: this.imgUrl,
          e
        });
      }
    },
    // 获取图片地址
    getUrl() {
      const url = this.imgUrl[this.index];
      if (!url && this.imgUrl.length > this.index) {
        this.index += 1;
        return this.getUrl();
      }
      return url;
    },
    setError(flag) {
      this.isError = flag;
    }
  },
  computed: {
    url() {
      if (Array.isArray(this.imgUrl)) {
        const imgUrl = this.getUrl();
        if (!imgUrl) {
          // 获取不到图片，说明发生了错误
          // this.isError = true;
          this.setError(true);
        }
        return imgUrl;
      }
      return this.imgUrl;
    },
    // 是否显示图片
    isShowImg() {
      if (!this.imgUrl) {
        return false;
      }
      if (Array.isArray(this.imgUrl) && this.imgUrl.length === 0) {
        return false;
      }
      return !this.isError;
    }
  }
};
</script>
