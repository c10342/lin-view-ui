<template>
  <div class="l-image">
    <img
      @click="onImageClick"
      :alt="alt"
      :referrer-policy="referrerPolicy"
      :class="[{[`l-image-object-${fit}`]:fit},'l-image-img']"
      v-if="isShowImg"
      :src="url"
      @error="onError"
      @load="onLoad"
    />
    <slot v-else>
      <div class="l-image-error">加载失败</div>
    </slot>
    <transition :name="transitionName">
      <div class="l-image-mask" v-if="showPreview" @click="onMaskClick">
        <span class="l-image-close" @click.stop="onImageClick">
          <span class="l-image-line l-image-line-left"></span>
          <span class="l-image-line l-image-line-right"></span>
        </span>
        <img :src="url" :alt="alt" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "l-image",
  props: {
    imgUrl: [Array, String],
    fit: {
      type: String,
      default: ""
    },
    referrerPolicy: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
    preview: {
      type: Boolean,
      default: false
    },
    transitionName: {
      type: String,
      default: "l-image-animation"
    },
    clickMask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      index: 0,
      isError: false,
      showPreview: false
    };
  },
  methods: {
    onImageClick() {
      if (this.preview) {
        this.showPreview = !this.showPreview;
      }
    },
    onMaskClick() {
      if (this.clickMask) {
        this.onImageClick();
      }
    },
    onError(e) {
      if (Array.isArray(this.imgUrl)) {
        this.$emit("error", {
          url: this.imgUrl[this.index],
          index: this.index,
          e
        });
        if (this.index === this.imgUrl.length - 1) {
          this.isError = true;
          this.$emit("AllError", {
            urls: this.imgUrl.slice(),
            e
          });
          return;
        }
        this.index = this.index + 1;
      } else {
        this.$emit("error", {
          url: this.imgUrl,
          e
        });
      }
    },
    onLoad(e) {
      if (Array.isArray(this.imgUrl)) {
        this.$emit("success", {
          url: this.imgUrl[this.index],
          index: this.index,
          e
        });
      } else {
        this.$emit("success", {
          url: this.imgUrl,
          e
        });
      }
    }
  },
  computed: {
    url() {
      if (Array.isArray(this.imgUrl)) {
        return this.imgUrl[this.index];
      } else {
        return this.imgUrl;
      }
    },
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
