<template>
  <transition name="lin-tag-fade" @after-leave="afterLeave">
    <div
      v-if="show"
      @click="onTagclick"
      :class="['lin-tag', `lin-tag-${type}`, `lin-tag-${effect}`]"
      :style="{ 'background-color': color }"
    >
      <span>{{ text }}</span>
      <i
        v-if="closable"
        @click="onCloseClick"
        class="lin-icon-close lin-tag-close"
      ></i>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LinTag",
  props: {
    type: {
      type: String,
      default: "primary",
    },
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    closable: {
      type: Boolean,
      default: false,
    },
    effect: {
      type: String,
      default: "light",
    },
  },
  data() {
    return {
      show: true,
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
    },
  },
};
</script>

