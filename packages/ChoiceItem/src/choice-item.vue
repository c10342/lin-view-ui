<template>
  <div
    v-show="isShow"
    @click="onItemClick"
    :class="[
      { 'lin-choice-item-active': itemValue === groupValue },
      { 'lin-choice-item-disabled': itemDisabled },
      'lin-choice-item',
    ]"
  >
    <slot>
      {{ itemLabel }}
    </slot>
  </div>
</template>

<script>
export default {
  name: 'LinChoiceItem',
  props: {
    // 选项的标签，若不设置则默认与 value 相同
    label: {
      type: String,
      default: '',
    },
    // 选项的值
    value: {
      type: [Object, String, Number],
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    group: {
      default: '',
    },
    option: {
      default: '',
    },
  },
  data() {
    return {
      // 本地搜索时控制该选项是否显示
      isShow: true,
    };
  },
  computed: {
    // 是否禁用该选项，优先option中的，然后在自己的
    itemDisabled() {
      if (this.option && this.option.disabled) {
        return true;
      }
      return this.disabled;
    },
    // 组件选择项的值
    itemValue() {
      const valueKey = this.group?.valueKey;
      if (valueKey && this.value) {
        return this.value[valueKey];
      }
      return this.value;
    },
    // choice-group组件的value值
    groupValue() {
      const valueKey = this.group?.valueKey;
      const value = this.group?.value;
      if (valueKey && value) {
        return value[valueKey];
      }
      return value;
    },
    // 显示的内容
    itemLabel() {
      return this.label ? this.label : this.value;
    },
    // choice-group组件输入框的值
    inputValue() {
      if (this.group) {
        return this.group.inputValue;
      }
      return '';
    },
  },
  methods: {
    // 点击选项
    onItemClick() {
      if (this.group && !this.itemDisabled) {
        this.group.emitInputEvent(this.value);
      }
    },
    // 本地搜索，选出符合条件的
    matchLabel(value) {
      // 值被清空时，显示该组件
      if (value === '') {
        this.isShow = true;
        return;
      }
      // 自定义过滤方法
      if (this.group && typeof this.group.filterMethod === 'function') {
        this.isShow = this.group.filterMethod(value, this.$props);
      } else {
        // 组件内部过滤方法
        this.isShow = this.itemLabel.toString().includes(value);
      }
    },
  },
  watch: {
    // 监听choice-group的value值变化
    groupValue: {
      immediate: true,
      handler(newVal) {
        // 用户在外部手动改变该值的时候，需要找出对象的label值，显示在输入框中
        if (this.itemValue === newVal && this.group) {
          this.group.groupLabel = this.itemLabel;
        }
      },
    },
    // 监听choice-group的input值变化，进行本地搜索
    inputValue(newVal) {
      if (typeof newVal === 'string') {
        newVal = newVal.trim();
      }
      this.matchLabel(newVal);
    },
  },
};
</script>
