<template>
  <button
    @click="onButtonClick"
    class="l-button"
    :class="[
      `l-button--${type}`,
      { 'l-button-plain': plain },
      { 'l-button-round': round },
      { 'l-button-circle': circle },
      { 'l-button-disabled': disabled },
    ]"
    :disabled="disabled"
  >
    <i v-if="icon" :class="icon"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "l-button",

  props: {
    type: {
      type: String,
      default: "default",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
  },

  methods: {
    onButtonClick() {
      console.log("onButtonClick");
    },
  },
};
</script>

<style lang="scss">
@import "packages/assets/styles/variables/button.scss";
@import "packages/assets/styles/mixin/button.scss";
.l-button {
  display: inline-block;
  line-height: $button-line-height;
  white-space: nowrap;
  cursor: pointer;
  background: $button-background-color;
  border: $button-border-width $button-border-style $button-border-color;
  color: $button-color;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: $button-margin;
  transition: $button-transition;
  font-weight: $button-font-weight;
  // 禁止元素的文字被选中
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: $button-padding-x $button-padding-y;
  font-size: $button-font-size;
  border-radius: $button-border-radius;
  &:hover,
  &:focus {
    color: $button-default-active-color;
    border-color: $button-default-active-border-color;
    background-color: $button-default-active-background-color;
  }
}

@each $key, $val in $button-theme-color {
  .l-button--#{$key} {
    color: $button-theme-color-color;
    background-color: $val;
    border-color: $val;
    &:hover,
    &:focus {
      background: lighten($val, 10%);
      border-color: lighten($val, 10%);
      color: $button-theme-color-color;
    }
  }
}

// 朴素的按钮
.l-button.l-button-plain {
  &:hover,
  &:focus {
    @include button-plain(
      $button-default-plain-active-background,
      $button-default-plain-active-border-color,
      $button-default-plain-active-color
    );
  }
}
.l-button--primary.l-button-plain {
  @include button-plain(
    $button-primary-plain-background,
    $button-primary-plain-border-color,
    $button-primary-plain-color
  );
  &:hover,
  &:focus {
    @include button-plain(
      $button-primary-plain-active-background,
      $button-primary-plain-active-border-color,
      $button-primary-plain-active-color
    );
  }
}
.l-button--success.l-button-plain {
  @include button-plain(
    $button-success-plain-background,
    $button-success-plain-border-color,
    $button-success-plain-color
  );
  &:hover,
  &:focus {
    @include button-plain(
      $button-success-plain-active-background,
      $button-success-plain-active-border-color,
      $button-success-plain-active-color
    );
  }
}

.l-button--info.l-button-plain {
  @include button-plain(
    $button-info-plain-background,
    $button-info-plain-border-color,
    $button-info-plain-color
  );
  &:hover,
  &:focus {
    @include button-plain(
      $button-info-plain-active-background,
      $button-info-plain-active-border-color,
      $button-info-plain-active-color
    );
  }
}
.l-button--warning.l-button-plain {
  @include button-plain(
    $button-warning-plain-background,
    $button-warning-plain-border-color,
    $button-warning-plain-color
  );
  &:hover,
  &:focus {
    @include button-plain(
      $button-warning-plain-active-background,
      $button-warning-plain-active-border-color,
      $button-warning-plain-active-color
    );
  }
}
.l-button--danger.l-button-plain {
  @include button-plain(
    $button-danger-plain-background,
    $button-danger-plain-border-color,
    $button-danger-plain-color
  );
  &:hover,
  &:focus {
    @include button-plain(
      $button-danger-plain-active-background,
      $button-danger-plain-active-border-color,
      $button-danger-plain-active-color
    );
  }
}

.l-button.l-button-round {
  border-radius: $button-round-border-radius;
  padding: $button-round-padding-x $button-round-padding-y;
}

// 原形按钮
.l-button.l-button-circle {
  border-radius: $button-circle-border-radius;
  padding: $button-circle-padding;
}

.l-button [class*="l-icon-"] + span {
  margin-left: $button-icon-margin-left;
}

.l-button-disabled {
  cursor: not-allowed;
}
</style>
