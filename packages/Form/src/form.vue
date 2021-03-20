<template>
  <div class="lin-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LinForm',
  props: {
    // 表单数据对象
    model: {
      type: Object,
      required: true
    },
    // 标签宽度
    labelWidth: {
      type: String,
      default: '80px'
    },
    // 表单校验规则
    rules: {
      type: Object,
      default: () => ({})
    }
  },
  provide () {
    return {
      Form: this
    };
  },
  methods: {
    // 校验表单数据
    validate (cb) {
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());

      // 所有任务都通过才算校验通过
      Promise.all(tasks)
        .then((res) => {
          cb(res.every(Boolean));
        })
        .catch(() => cb(false));
    },
    // 清空表单教研
    clearValidate () {
      const broad = (children) => {
        children.forEach((child) => {
          if (child.$options.name === 'LinFormItem' && child.clearValidate) {
            child.clearValidate();
          }
          if (child.$children) {
            broad(child.$children);
          }
        });
      };

      broad(this.$children);
    }
  }
};
</script>
