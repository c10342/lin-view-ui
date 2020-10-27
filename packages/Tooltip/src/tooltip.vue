<template>
  <transition name="lin-tooltip-fade" @after-leave="handleAfterLeave">
    <div v-if="show" :style="style" class="lin-tooltip" :class="classes">
      {{ text }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "LinTooltip",
  data() {
    return {
      style: {},
      show: false,
      placement: "bottom",
      text: "",
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    },
  },
  computed: {
    classes() {
      return {
        "lin-tooltip-bottom": this.placement === "top",
        "lin-tooltip-top": this.placement === "bottom",
        "lin-tooltip-left": this.placement === "right",
        "lin-tooltip-right": this.placement === "left",
      };
    },
  },
};
</script>