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
        {{ errorMsg || t("LinViewUI.Image.errorMsg") }}
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
import { isArray } from "@lin-view-ui/utils";
import { LocaleMixin } from "@lin-view-ui/mixins";

export default {
  name: "LinImage",
  mixins: [LocaleMixin],
  props: {
    // 图片地址
    imgUrl: [Array, String],
    // 确定图片如何适应容器框，同原生 object-fit
    fit: {
      type: String,
      default: ""
    },
    // 原生 referrerPolicy
    referrerPolicy: {
      type: String,
      default: ""
    },
    // 原生 alt
    alt: {
      type: String,
      default: ""
    },
    // 开启图片预览
    preview: {
      type: Boolean,
      default: false
    },
    // 图片预览显示动画，即 transition 组件 name 属性
    transitionName: {
      type: String,
      default: "lin-image-animation"
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
      this.$emit("error", e);
      if (this.index === this.realImageUrl.length - 1) {
        this.isError = true;
        return;
      }
      this.index += 1;
    },
    // 图片加载成功回调
    onLoad(e) {
      this.$emit("success", e);
    }
  },
  computed: {
    realImageUrl() {
      let imageArr = this.imgUrl;
      if (!isArray(imageArr)) {
        imageArr = [imageArr];
      }
      return imageArr.filter(Boolean);
    },
    url() {
      return this.realImageUrl[this.index];
    },
    // 是否显示图片
    isShowImg() {
      if (this.realImageUrl.length === 0) {
        return false;
      }
      return !this.isError;
    }
  }
};
</script>
