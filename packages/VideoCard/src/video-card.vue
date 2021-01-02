<template>
  <div @click="onCardClick" class="video-card" :style="{'width':cardWidth,'height':cardHeight}">
    <slot name="top">
      <div class="video-cover-box" :style="{'height':imageHeight}">
        <img
        @error="loadError"
         v-if="!imageLoadError"
         class="cover-image"
         :src="url"
         :alt="t('LinViewUI.VideoCard.imgAlt')" />
        <div v-else class="error-tip">{{errorTip || t('LinViewUI.VideoCard.errorTip')}}</div>
        <span class="cover-tip" v-if="coverTip">{{coverTip}}</span>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
import LocaleMixin from 'src/mixins/locale.js';

export default {
  name: 'LinVideoCard',
  mixins: [LocaleMixin],
  props: {
    data: {
      type: Object,
    },
    cardHeight: {
      type: String,
      default: 'auto',
    },
    cardWidth: {
      type: String,
      default: '262px',
    },
    imageHeight: {
      type: String,
      default: '146px',
    },
    coverTip: {
      type: String,
      default: '',
    },
    errorTip: {
      type: String,
    },
    defaultImageUrl: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      imageLoadError: false,
      url: '',
    };
  },
  methods: {
    loadError() {
      if (!this.defaultImageUrl || this.url === this.defaultImageUrl) {
        this.imageLoadError = true;
        return;
      }
      this.url = this.defaultImageUrl;
    },
    onCardClick() {
      this.$emit('click', this.data);
    },
  },
  watch: {
    imageUrl: {
      immediate: true,
      handler(newVal) {
        this.url = newVal;
      },
    },
  },
};
</script>
