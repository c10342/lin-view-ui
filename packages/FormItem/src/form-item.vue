<template>
  <div class="lin-form-item">
    <label v-if="label" class="lin-form-item-label" :style="{width: labelWidth}">{{label}}</label>
    <div class="lin-form-item-content">
      <slot></slot>
    </div>
    <transition name="lin-formItem-fade">
      <p v-if="errorMsg" class="lin-form-item-errormsg" :style="{left:labelWidth}">{{errorMsg}}</p>
    </transition>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  name: "LinFormItem",
  props: {
    label: String,
    prop: String,
  },
  inject: ["Form"],
  data() {
    return {
      errorMsg: "",
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
            [this.prop]: value,
          });
          return true;
        })
        .catch(({ fields }) => {
          this.errorMsg = fields[this.prop][0].message;
          this.Form.$emit("validate", {
            result: false,
            [this.prop]: value,
            ...fields,
          });
          return false;
        });
    },
    clearValidate() {
      this.errorMsg = "";
    },
  },
  computed: {
    labelWidth() {
      if (this.label) {
        return this.Form.labelWidth;
      }
      return 0;
    },
  },
};
</script>

