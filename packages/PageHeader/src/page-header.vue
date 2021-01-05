<template>
  <div
    :class="['lin-page-header', { 'lin-page-header-border-bottom': border }]"
  >
    <div class="lin-page-header-left">
      <div class="lin-page-header-back" v-if="back">
        <slot name="back">
          <div class="lin-page-header-back-wrapper" @click="$emit('back')">
            <i class="lin-icon-back"></i>
            <span>{{ backTip ||  t('LinViewUI.PageHeader.backTip')}}</span>
          </div>
        </slot>
      </div>
      <div
        :class="[
          'lin-page-header-content',
          { 'lin-page-header-active': active },
        ]"
      >
        <slot>
          {{ title }}
        </slot>
      </div>
    </div>
    <div class="lin-page-header-right" v-if="right">
      <slot name="right">
        <div class="lin-page-header-more" @click="$emit('more')">
          <span>{{t('LinViewUI.PageHeader.more')}}</span>
          <i class="lin-icon-right"></i>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import LocaleMixin from 'src/mixins/locale.js';

export default {
  name: 'LinPageHeader',
  mixins: [LocaleMixin],
  props: {
    back: {
      type: Boolean,
      default: true
    },
    backTip: {
      type: String
    },
    title: {
      type: String,
      default: ''
    },
    right: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  }
};
</script>
