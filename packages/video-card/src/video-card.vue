<template>
  <div
    @click="onCardClick"
    class="video-card"
    :style="{ width: cardWidth, height: cardHeight }"
  >
    <slot name="top">
      <div class="video-cover-box" :style="{ height: imageHeight }">
        <img
          @error="loadError"
          v-if="!imageLoadError"
          class="cover-image"
          :src="url"
          :alt="t('LinViewUI.VideoCard.imgAlt')"
        />
        <div v-else class="error-tip">
          {{ errorTip || t('LinViewUI.VideoCard.errorTip') }}
        </div>
        <span class="cover-tip" v-if="coverTip">{{ coverTip }}</span>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
import {LocaleMixin} from '@lin-view-ui/mixins';

export default {
  name: 'LinVideoCard',
  mixins: [LocaleMixin],
  props: {
    // 卡片相关数据
    data: {
      type: Object
    },
    // 卡片高度
    cardHeight: {
      type: String,
      default: 'auto'
    },
    // 卡片宽度
    cardWidth: {
      type: String,
      default: '262px'
    },
    // 封面高度
    imageHeight: {
      type: String,
      default: '146px'
    },
    // 封面右下角提示
    coverTip: {
      type: String,
      default: ''
    },
    // 图片加载失败提示语
    errorTip: {
      type: String
    },
    // 封面默认图片
    defaultImageUrl: {
      type: String,
      default: ''
    },
    // 封面图片
    imageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 图片是否加载错误
      imageLoadError: false,
      // 图片地址
      url: ''
    };
  },
  methods: {
    // 图片加载错误回调
    loadError() {
      if (!this.defaultImageUrl || this.url === this.defaultImageUrl) {
        this.imageLoadError = true;
        return;
      }
      this.url = this.defaultImageUrl;
    },
    // 点击卡片
    onCardClick() {
      this.$emit('click', this.data);
    }
  },
  watch: {
    imageUrl: {
      immediate: true,
      handler(newVal) {
        this.url = newVal;
      }
    }
  }
};
</script>
