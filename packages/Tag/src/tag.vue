<template>
  <transition name="fade" @after-leave="afterLeave">
    <div
      v-if="show"
      @click="onTagclick"
      :class="['l-tag',`l-tag-${type}`,`l-tag-${effect}`]"
      :style="{'background-color':color}"
    >
      <span>{{text}}</span>
      <i v-if="closable" @click="onCloseClick" class="l-icon-close l-tag-close"></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: "l-tag",
  props: {
    type: {
      type: String,
      default: "primary"
    },
    text: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    closable: {
      type: Boolean,
      default: false
    },
    effect: {
      type: String,
      default: "light"
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    onTagclick() {
      this.$emit("click");
    },
    onCloseClick() {
      this.show = false;
    },
    afterLeave() {
      this.$emit("close");
    }
  }
};
</script>

