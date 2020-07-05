<template>
  <transition name="fade" @after-leave="handleAfterLeave">
    <div v-if="show" :style="style" class="l-tooltip" :class="classes">{{text}}</div>
  </transition>
</template>

<script>
export default {
  name: "l-tooltip",
  data() {
    return {
      style: {},
      show: false,
      placement: "bottom",
      text: ""
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    }
  },
  computed: {
    classes() {
      return {
        "l-tooltip-bottom": this.placement === "top",
        "l-tooltip-top": this.placement === "bottom",
        "l-tooltip-left": this.placement === "right",
        "l-tooltip-right": this.placement === "left"
      };
    }
  }
};
</script>