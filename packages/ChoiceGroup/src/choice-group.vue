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
        @click="onClick"
        @blur="onBlur"
        @focus="onFocus"
        readonly
        :placeholder="placeholder"
        class="lin-choice-group-input"
        type="text"
        :value="groupLabel"
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
    <transition name="fade">
      <div
        :style="{top}"
        :class="[
      'lin-choice-container-wrapper',
      {'lin-choice-container-wrapper-up':!isDown},
      {'lin-choice-container-wrapper-down':isDown},
      ]"
        v-show="isShow"
      >
        <div ref="scrollContainer" class="lin-choice-container" @scroll="onScroll">
          <div ref="scrollContent">
            <slot></slot>
            <div class="lin-choice-group-empty" v-if="!$slots.default">
              <slot name="empty">
                <p class="lin-choice-group-empty-tip">{{ emptyTip }}</p>
              </slot>
            </div>
          </div>
          <div class="lin-choice-loading-wrapper" v-show="loading">
            <slot name="loading">
              <span class="lin-choice-loading"></span>
              <span class="lin-choice-loading-tip" v-if="loadingTip">
                {{
                loadingTip
                }}
              </span>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: "LinChoiceGroup",
  props: {
    placeholder: {
      type: String,
      default: "请选择",
    },
    value: {
      type: [Object, String, Number],
    },
    valueKey: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isThrottle: {
      type: Boolean,
      default: true,
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      default: 500,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingTip: {
      type: String,
      default: "",
    },
    emptyTip: {
      type: String,
      default: "暂无数据",
    },
  },
  data() {
    return {
      groupLabel: "",
      isShow: false,
      isHover: false,
      isDown: true,
      top: 0,
    };
  },
  provide() {
    return {
      group: this,
    };
  },
  computed: {
    showCloseIcon() {
      return this.clearable && this.isHover && this.value;
    },
  },
  mounted() {
    this.timer = null;
    this.lock = false;
    this.lockTimer = null;
    this.setPlacement();
  },
  watch: {
    loading(newVal) {
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
    },
  },
  methods: {
    setPlacement() {
      this.$nextTick(() => {
        const scrollContainer = this.$refs.scrollContainer;
        const choiceGroup = this.$refs.choiceGroup;
        const bottom =
          window.innerHeight - choiceGroup.getBoundingClientRect().bottom;
        const top = choiceGroup.getBoundingClientRect().top;
        if (bottom > scrollContainer.clientHeight) {
          this.setDownTop();
        } else if (top > scrollContainer.clientHeight) {
          this.setUpTop();
        } else {
          this.setDownTop();
        }
      });
    },
    setDownTop() {
      this.isDown = true;
      const choiceGroupInput = this.$refs.choiceGroupInput;
      this.top = `${choiceGroupInput.clientHeight + 8}px`;
    },
    setUpTop() {
      this.isDown = false;
      const scrollContainer = this.$refs.scrollContainer;
      this.top = `${-(scrollContainer.clientHeight + 10)}px`;
    },
    onScroll(event) {
      if (!this.scroll || this.loading || this.lock) {
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
    handleScroll(event) {
      const scrollTop = event.target.scrollTop;
      const height = this.$refs.scrollContainer.clientHeight;
      const contentHeight = this.$refs.scrollContent.clientHeight;
      if (scrollTop + height >= contentHeight) {
        this.$emit("scrollToBottom", event);
      }
    },
    onMouseLeave() {
      this.isHover = false;
    },
    onMouseEnter() {
      this.isHover = true;
    },
    onBlur(event) {
      this.isShow = false;
      this.$emit("blur", event);
      this.$emit("visible-change", false);
    },
    onFocus(event) {
      this.$emit("focus", event);
    },
    onClick() {
      if (this.disabled) {
        return;
      }
      this.isShow = !this.isShow;
      if (this.isShow) {
        this.setPlacement();
      }
      this.$emit("visible-change", this.isShow);
    },
    clearValue() {
      this.groupLabel = "";
      this.emitInputEvent("");
      this.$emit("clear");
    },
    emitInputEvent(value) {
      this.$emit("input", value);
      this.$emit("change", value);
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.lockTimer) {
      clearTimeout(this.lockTimer);
    }
  },
};
</script>

