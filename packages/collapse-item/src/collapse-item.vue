<template>
  <div :class="[{ 'lin-collapse-item-simple': simple }, 'lin-collapse-item']">
    <div class="lin-collapse-item-header" @click="onHeaderClick">
      <i
        :class="[
          { 'lin-collapse-arrow-down': show },
          'lin-icon-right',
          'lin-collapse-arrow'
        ]"
        v-if="!hideArrow"
      ></i>
      <slot></slot>
    </div>
    <collapse-transition>
      <div class="lin-collapse-item-content" v-show="show">
        <slot name="content"></slot>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { collapseTransition } from "@lin-view-ui/utils";

export default {
  name: "LinCollapseItem",
  props: {
    // 当前面板的 name，与 CollapseGroup 的 value 对应，必填项
    name: {
      type: [String, Number],
      require: true
    },
    // 隐藏箭头
    hideArrow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    collapseTransition
  },
  inject: {
    collapseGroup: {
      default: ""
    }
  },
  // data () {
  //   return {
  //     index: 0
  //   };
  // },
  computed: {
    // 是否开启简洁模式
    simple() {
      if (this.collapseGroup) {
        return this.collapseGroup.simple;
      }
      return false;
    },
    // collapse-group的collapseValue值
    collapseValue() {
      if (this.collapseGroup) {
        // 统一封装成数组使用
        const val = this.collapseGroup.collapseValue;
        if (val && (typeof val === "string" || typeof val === "number")) {
          return [val];
        }
        if (Array.isArray(val)) {
          return val;
        }
      }
      return [];
    },
    // 是否为手风琴模式
    accordion() {
      if (this.collapseGroup) {
        return this.collapseGroup.accordion;
      }
      return false;
    },
    // 控制面板的显示
    show: {
      get() {
        if (this.collapseValue.includes(this.name)) {
          return true;
        }
        return false;
      },
      set(val) {
        if (this.collapseGroup) {
          let data = cloneDeep(this.collapseValue);
          if (this.accordion) {
            // 手风琴模式
            if (val === false) {
              data = [];
            } else {
              data = [this.name];
            }
          } else if (val === false) {
            const index = data.findIndex(item => item === this.name);
            if (index > -1) {
              data.splice(index, 1);
            }
          } else {
            data.push(this.name);
          }
          this.collapseGroup.collapseValue = data;
        }
      }
    }
  },
  methods: {
    onHeaderClick() {
      this.show = !this.show;
    }
  }
};
</script>
