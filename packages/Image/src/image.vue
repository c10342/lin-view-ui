<template>
  <div class="lin-image">
    <img
      @click="onImageClick"
      :alt="alt"
      :referrer-policy="referrerPolicy"
      :class="[{[`lin-image-object-${fit}`]:fit},'lin-image-img']"
      v-if="isShowImg"
      :src="url"
      @error="onError"
      @load="onLoad"
    />
    <slot v-else>
      <div class="lin-image-error">{{errorMsg || t('LinViewUI.Image.errorMsg')}}</div>
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
import LocaleMixin from 'src/mixins/locale.js'
export default {
  name: "LinImage",
  mixins:[LocaleMixin],
  props: {
    imgUrl: [Array, String],
    fit: {
      type: String,
      default: "",
    },
    referrerPolicy: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    preview: {
      type: Boolean,
      default: false,
    },
    transitionName: {
      type: String,
      default: "lin-image-animation",
    },
    clickMask: {
      type: Boolean,
      default: true,
    },
    errorMsg: {
      type: String
    },
  },
  data() {
    return {
      index: 0,
      isError: false,
      showPreview: false,
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
          e,
        });
        if (this.index === this.imgUrl.length - 1) {
          this.isError = true;
          this.$emit("AllError", {
            urls: this.imgUrl.slice(),
            e,
          });
          return;
        }
        this.index = this.index + 1;
      } else {
        this.$emit("error", {
          url: this.imgUrl,
          e,
        });
      }
    },
    onLoad(e) {
      if (Array.isArray(this.imgUrl)) {
        this.$emit("success", {
          url: this.imgUrl[this.index],
          index: this.index,
          e,
        });
      } else {
        this.$emit("success", {
          url: this.imgUrl,
          e,
        });
      }
    },
    getUrl() {
      const url = this.imgUrl[this.index];
      if (!url && this.imgUrl.length > this.index) {
        this.index += 1;
        return this.getUrl();
      } else {
        return url;
      }
    },
  },
  computed: {
    url() {
      if (Array.isArray(this.imgUrl)) {
        const url = this.getUrl();
        if (!url) {
          this.isError = true;
        }
        return url;
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
    },
  },
};
</script>
