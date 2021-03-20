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
    // 输入框占位符
    placeholder: {
      type: String
    },
    // 绑定值
    value: {
      type: [Object, String, Number]
    },
    //  作为 value 唯一标识的键名，绑定值为对象类型时必填
    valueKey: {
      type: String,
      default: ''
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 开启下拉加载时是否进行防抖
    isThrottle: {
      type: Boolean,
      default: true
    },
    // 是否开启下拉加载
    scroll: {
      type: Boolean,
      default: false
    },
    // 防抖间隔
    time: {
      type: Number,
      default: 500
    },
    // 是否开启加载动画
    loading: {
      type: Boolean,
      default: false
    },
    // 加载提示语
    loadingTip: {
      type: String,
      default: ''
    },
    // 数据为空时提示语
    emptyTip: {
      type: String
    },
    // 是否完成加载，一般用于滚动加载
    finishLoading: {
      type: Boolean,
      default: false
    },
    // 默认显示内容，一般用于滚动加载回显数据
    defaultLabelName: {
      type: [String, Number],
      default: ''
    },
    // 是否显示远程搜索输入框
    showSearchInput: {
      type: Boolean,
      default: false
    },
    // 远程搜索输入框占位符
    searchPlaceholder: {
      type: String,
      default: ''
    },
    // 是否开启本地搜索
    filterable: {
      type: Boolean,
      default: false
    },
    // 自定义本地搜索方法
    filterMethod: {
      type: Function
    }
  },
  data () {
    return {
      // 不是本地搜索时输入框显示内容
      groupLabel: '',
      // 是否显示下拉框
      isShow: false,
      // 鼠标是否悬停在输入框容器中
      isHover: false,
      // 是否向下展开下拉框
      isDown: true,
      // 下拉框距离顶部距离
      top: 0,
      // 远程搜索输入框value
      searchKey: '',
      // 本地搜索时，输入框显示的值
      inputValue: '',
      // 是否暂无数据
      noData: false,
      // 是否正在进行本地搜索
      isSearch: false
    };
  },
  provide () {
    return {
      group: this
    };
  },
  computed: {
    // 是否需要显示清空按钮
    showCloseIcon () {
      return this.clearable && this.isHover && this.value && !this.disabled;
    },
    // input输入框的值
    innerValue () {
      if (this.isSearch) {
        return this.inputValue;
      }
      return this.groupLabel || this.defaultLabelName;
    }
  },
  mounted () {
    // 处理滚动行为定时器
    this.timer = null;
    // 是否正在请求，防止多次请求
    this.lock = false;
    // 上锁定时器
    this.lockTimer = null;
    // 设置显示位置，向上或者向下
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
    // 设置显示位置
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
    // 向下显示
    setDownTop () {
      this.isDown = true;
      const { choiceGroupInput } = this.$refs;
      this.top = `${choiceGroupInput.clientHeight + 8}px`;
    },
    // 向上显示
    setUpTop () {
      this.isDown = false;
      const { scrollContainer } = this.$refs;
      this.top = `${-(scrollContainer.clientHeight + 20)}px`;
    },
    // 滚动行为
    onScroll (event) {
      // 没开启下拉滚动或者正在加载中，或者上锁了，或者已经完成全部加载
      if (!this.scroll || this.loading || this.lock || this.finishLoading) {
        return;
      }
      if (this.isThrottle) {
        // 防抖
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
    // 处理滚动行为
    handleScroll (event) {
      const { scrollTop } = event.target;
      const height = this.$refs.scrollContainer.clientHeight;
      const contentHeight = this.$refs.scrollContent.clientHeight;
      if (scrollTop + height >= contentHeight) {
        // 滚动到底部
        this.$emit('scrollToBottom', event);
      }
    },
    // 鼠标离开input输入框容器
    onMouseLeave () {
      this.isHover = false;
    },
    // 鼠标进入input输入框容器
    onMouseEnter () {
      this.isHover = true;
    },
    // input失去焦点
    onBlur (event) {
      this.$emit('blur', event);
    },
    // input获得焦点
    onFocus (event) {
      this.$emit('focus', event);
    },
    // 点击input输入框选项
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
    // 点击清空按钮，清空值
    clearValue () {
      this.groupLabel = '';
      this.emitInputEvent('');
      this.$emit('clear');
    },
    // 发射相关事件
    emitInputEvent (value) {
      this.$emit('input', value);
      this.$emit('change', value);
      this.hideVisible();
    },
    // 隐藏下拉框
    hideVisible () {
      if (this.isShow) {
        this.isShow = false;
        this.isSearch = false;
        this.$emit('visible-change', false);
      }
    },
    // 显示下拉框
    showVisible () {
      if (!this.isShow) {
        this.isShow = true;
        this.setPlacement();
        this.inputValue = '';
        this.noData = false;
        this.$emit('visible-change', true);
      }
    },
    // 点击组件外部
    onDocumentClick (event) {
      const { choiceGroup } = this.$refs;
      if (!choiceGroup.contains(event.target)) {
        this.hideVisible();
      }
    },
    // 远程搜索
    onSearch () {
      this.$emit('search', this.searchKey);
    },
    // 键盘抬起事件，本地搜索
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
