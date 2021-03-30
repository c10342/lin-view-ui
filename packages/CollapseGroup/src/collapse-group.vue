<template>
  <div :class="[{ 'lin-collapse-group-simple': simple }, 'lin-collapse-group']">
    <slot></slot>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';

export default {
  name: 'LinCollapseGroup',
  props: {
    // 当前激活面板的name，accordion为true就是String或者Number,否则就是Array
    value: {
      type: [Array, String, Number],
    },
    // 是否开启手风琴模式，开启后每次至多展开一个面板
    accordion: {
      type: Boolean,
      default: false,
    },
    // 是否开启简洁模式
    simple: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    collapseValue: {
      get() {
        if (this.canUseValue()) {
          return this.value;
        }
        return this.valueData;
      },
      set(val) {
        if (this.canUseValue()) {
          this.$emit('input', this.handleData(val));
        } else {
          this.valueData = this.handleData(val);
        }
        this.$emit('onChange', val);
      },
    },
  },
  provide() {
    return {
      collapseGroup: this,
    };
  },
  data() {
    return {
      // 外部没有绑定value的时候需要使用内部的valueData，防止因为外部没有绑定value而不能使用
      valueData: '',
    };
  },
  methods: {
    // 根据是否为手风琴模式返回一个(String|Number)或者Array
    handleData(data) {
      let da;
      if (this.accordion) {
        // 手风琴模式，一个值
        if (data.length > 0) {
          da = data[0];
        } else {
          da = '';
        }
      } else {
        // 非手风琴，数组
        da = data;
      }
      return cloneDeep(da);
    },
    // 是否使用外部传来value值
    canUseValue() {
      const value = this.value;
      return (
        typeof value === 'string' ||
        Array.isArray(value) ||
        typeof value === 'number'
      );
    },
  },
};
</script>
