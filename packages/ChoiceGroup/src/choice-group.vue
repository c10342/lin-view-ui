<template>
  <div class="lin-choice-group" ref="choiceGroup">
    <div
      ref="choiceGroupInput"
      :class="[
        { 'lin-choice-group-disabled': disabled },
        'lin-choice-group-input-container',
      ]"
      @mouseleave="onMouseLeave"
      @mouseenter="onMouseEnter"
    >
      <input
      @keyup="onInputChange"
        @click="onClick"
        @blur="onBlur"
        @focus="onFocus"
        :readonly='!filterable'
        :placeholder="placeholder || t('LinViewUI.Choice.placeholder')"
        class="lin-choice-group-input"
        type="text"
        :value="innerValue"
      />
      <i
        :class="[
          { 'lin-choice-group-icon-up': isShow },
          'lin-icon-down',
          'lin-choice-group-down-icon',
          'lin-choice-group-icon',
        ]"
        v-if="!showCloseIcon"
      ></i>
      <i
        class="lin-icon-close lin-choice-group-icon lin-choice-group-close-icon"
        v-if="showCloseIcon"
        @click="clearValue"
      ></i>
    </div>
    <transition name="lin-choice-group-fade">
      <div
        :style="{ top }"
        :class="[
          'lin-choice-container-wrapper',
          { 'lin-choice-container-wrapper-up': !isDown },
          { 'lin-choice-container-wrapper-down': isDown },
        ]"
        v-show="isShow"
      >
        <div class="lin-choice-search-wrapper" v-if="showSearchInput">
          <lin-input
            v-model="searchKey"
            :placeholder="searchPlaceholder || t('LinViewUI.Choice.searchPlaceholder')"
            @keyup.native.enter="onSearch"
          >
            <i class="lin-icon-search" @click.stop="onSearch"></i>
          </lin-input>
        </div>
        <div
          ref="scrollContainer"
          class="lin-choice-container"
          @scroll.stop="onScroll"
        >
          <div ref="scrollContent">
            <slot></slot>
            <div class="lin-choice-group-empty" v-if="!$slots.default || noData">
              <slot name="empty">
                <p class="lin-choice-group-empty-tip">
                  {{ emptyTip || t("LinViewUI.Choice.emptyTip") }}
                </p>
              </slot>
            </div>
          </div>
          <div class="lin-choice-loading-wrapper" v-show="loading">
            <slot name="loading">
              <span class="lin-choice-loading"></span>
              <span class="lin-choice-loading-tip" v-if="loadingTip">
                {{ loadingTip }}
              </span>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import LocaleMixin from 'src/mixins/locale.js';
import documentClick from 'src/mixins/documentClick.js';
import findChildren from 'src/utils/findChildren.js';
import Input from 'packages/Input/index.js';

export default {
  name: 'LinChoiceGroup',
  mixins: [LocaleMixin, documentClick],
  components: {
    [Input.name]: Input
  },
  props: {
    placeholder: {
      type: String
    },
    value: {
      type: [Object, String, Number]
    },
    valueKey: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isThrottle: {
      type: Boolean,
      default: true
    },
    scroll: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: 500
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingTip: {
      type: String,
      default: ''
    },
    emptyTip: {
      type: String
    },
    finishLoading: {
      type: Boolean,
      default: false
    },
    defaultLabelName: {
      type: [String, Number],
      default: ''
    },
    showSearchInput: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    },
    filterMethod: {
      type: Function
    }
  },
  data () {
    return {
      groupLabel: '',
      isShow: false,
      isHover: false,
      isDown: true,
      top: 0,
      searchKey: '',
      inputValue: '',
      noData: false,
      isSearch: false
    };
  },
  provide () {
    return {
      group: this
    };
  },
  computed: {
    showCloseIcon () {
      return this.clearable && this.isHover && this.value && !this.disabled;
    },
    innerValue () {
      if (this.isSearch) {
        return this.inputValue;
      }
      return this.groupLabel || this.defaultLabelName;
    }
  },
  mounted () {
    this.timer = null;
    this.lock = false;
    this.lockTimer = null;
    this.setPlacement();
  },
  watch: {
    loading (newVal) {
      if (newVal) {
        this.lock = true;
      } else {
        if (this.lockTimer) {
          clearTimeout(this.lockTimer);
        }
        this.lockTimer = setTimeout(() => {
          this.lock = false;
        }, 500);
      }
    }
  },
  methods: {
    setPlacement () {
      this.$nextTick(() => {
        const { scrollContainer } = this.$refs;
        const { choiceGroup } = this.$refs;
        const bottom =
          window.innerHeight - choiceGroup.getBoundingClientRect().bottom;
        const { top } = choiceGroup.getBoundingClientRect();
        if (bottom > scrollContainer.clientHeight) {
          this.setDownTop();
        } else if (top > scrollContainer.clientHeight) {
          this.setUpTop();
        } else {
          this.setDownTop();
        }
      });
    },
    setDownTop () {
      this.isDown = true;
      const { choiceGroupInput } = this.$refs;
      this.top = `${choiceGroupInput.clientHeight + 8}px`;
    },
    setUpTop () {
      this.isDown = false;
      const { scrollContainer } = this.$refs;
      this.top = `${-(scrollContainer.clientHeight + 10)}px`;
    },
    onScroll (event) {
      if (!this.scroll || this.loading || this.lock || this.finishLoading) {
        return;
      }
      if (this.isThrottle) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.handleScroll(event);
        }, this.time);
      } else {
        this.handleScroll(event);
      }
    },
    handleScroll (event) {
      const { scrollTop } = event.target;
      const height = this.$refs.scrollContainer.clientHeight;
      const contentHeight = this.$refs.scrollContent.clientHeight;
      if (scrollTop + height >= contentHeight) {
        this.$emit('scrollToBottom', event);
      }
    },
    onMouseLeave () {
      this.isHover = false;
    },
    onMouseEnter () {
      this.isHover = true;
    },
    onBlur (event) {
      this.$emit('blur', event);
    },
    onFocus (event) {
      this.$emit('focus', event);
    },
    onClick () {
      if (this.disabled) {
        return;
      }
      if (this.isShow) {
        this.hideVisible();
      } else {
        this.showVisible();
      }
    },
    clearValue () {
      this.groupLabel = '';
      this.emitInputEvent('');
      this.$emit('clear');
    },
    emitInputEvent (value) {
      this.$emit('input', value);
      this.$emit('change', value);
      this.hideVisible();
    },
    hideVisible () {
      if (this.isShow) {
        this.isShow = false;
        this.isSearch = false;
        this.$emit('visible-change', false);
      }
    },
    showVisible () {
      if (!this.isShow) {
        this.isShow = true;
        this.setPlacement();
        this.inputValue = '';
        this.noData = false;
        this.$emit('visible-change', true);
      }
    },
    onDocumentClick (event) {
      const { choiceGroup } = this.$refs;
      if (!choiceGroup.contains(event.target)) {
        this.hideVisible();
      }
    },
    onSearch () {
      this.$emit('search', this.searchKey);
    },
    onInputChange (event) {
      this.isSearch = true;
      this.inputValue = event.currentTarget.value;
      this.$nextTick(() => {
        const children = findChildren(this, 'LinChoiceItem');
        this.noData = children.every(child => !child.isShow);
      });
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.lockTimer) {
      clearTimeout(this.lockTimer);
    }
  }
};
</script>
