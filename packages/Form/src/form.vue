<template>
  <div class="lin-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LinForm",
  props: {
    model: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: String,
      default: "80px"
    },
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  provide() {
    return {
      Form: this
    };
  },
  methods: {
    validate(cb) {
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate());

      // 所有任务都通过才算校验通过
      Promise.all(tasks)
        .then((res) => {
          
          cb(res.every(Boolean))
        })
        .catch(() => cb(false));
    }
  }
};
</script>
