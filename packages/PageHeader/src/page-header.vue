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
    // 是否显示返回按钮
    back: {
      type: Boolean,
      default: true
    },
    // 返回按钮文字
    backTip: {
      type: String
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否显示右侧按钮
    right: {
      type: Boolean,
      default: false
    },
    // 是否显示激活状态
    active: {
      type: Boolean,
      default: false
    },
    // 是否显示底部边框
    border: {
      type: Boolean,
      default: false
    }
  }
};
</script>
