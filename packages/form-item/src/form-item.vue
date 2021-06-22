<template>
  <div class="lin-form-item">
    <label
      v-if="label"
      class="lin-form-item-label"
      :style="{ width: itemLabelWidth }"
    >
      {{ label }}
    </label>
    <div class="lin-form-item-content">
      <slot></slot>
    </div>
    <transition name="lin-formItem-fade">
      <p
        v-if="errorMsg"
        class="lin-form-item-errormsg"
        :style="{ left: itemLabelWidth }"
      >
        {{ errorMsg }}
      </p>
    </transition>
  </div>
</template>

<script>
import Schema from "async-validator";

export default {
  name: "LinFormItem",
  props: {
    // 标签文本
    label: String,
    // 表单域model字段
    prop: String,
    // 表单域标签宽度
    labelWidth: String
  },
  inject: ["Form"],
  data() {
    return {
      // 错误信息
      errorMsg: ""
    };
  },
  mounted() {
    this.$on("validate", this.validate);
  },
  methods: {
    validate() {
      if (!this.prop) {
        return;
      }
      const value = this.Form.model[this.prop];
      const rules = this.Form.rules[this.prop];
      const schema = new Schema({ [this.prop]: rules });
      // return的是校验结果的Promise
      return schema
        .validate({ [this.prop]: value })
        .then(() => {
          this.errorMsg = "";
          this.Form.$emit("validate", {
            result: true,
            [this.prop]: value
          });
          return true;
        })
        .catch(({ fields }) => {
          this.errorMsg = fields[this.prop][0].message;
          this.Form.$emit("validate", {
            result: false,
            [this.prop]: value,
            ...fields
          });
          return false;
        });
    },
    clearValidate() {
      this.errorMsg = "";
    }
  },
  computed: {
    itemLabelWidth() {
      if (this.label) {
        if (this.labelWidth) {
          return this.labelWidth;
        }
        return this.Form.labelWidth;
      }
      return 0;
    }
  }
};
</script>
