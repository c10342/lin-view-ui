<template>
  <div class="lin-panel">
    <div class="lin-panel-container lin-panel-scroll">
      <ul class="lin-panel-list">
        <li
          :class="[
            'lin-panel-item',
            { 'lin-panel-active': current[valueKey] === item[valueKey] },
            { 'lin-panel-disabled': item[disabled] },
          ]"
          v-for="(item, index) in options"
          :key="index"
          @click="onItemClick(item)"
        >
          {{ item[label] }}
          <span
            class="lin-icon-right"
            v-if="showIconRight(item) && !showLoading(item)"
          ></span>
          <span class="lin-panel-loading" v-if="showLoading(item)"></span>
        </li>
      </ul>
    </div>
    <div v-if="currentList.length !== 0" class="lin-panel">
      <lin-panel :level="level + 1" :options="currentList" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinPanel',
  props: {
    // 可选项数据源
    options: {
      type: Array,
      default: () => [],
    },
    // 面板所在的层级，就是第几个面板
    level: {
      type: Number,
      default: 0,
    },
  },
  inject: ['cascader'],
  computed: {
    valueKey() {
      // 指定选项的唯一值为选项对象的某个属性值
      if (this.cascader) {
        return this.cascader.valueKey;
      }
      return 'id';
    },
    // 指定选项标签为选项对象的某个属性值
    label() {
      if (this.cascader) {
        return this.cascader.label;
      }
      return 'label';
    },
    // 指定选项的禁用为选项对象的某个属性值
    disabled() {
      if (this.cascader) {
        return this.cascader.disabled;
      }
      return 'disabled';
    },
    // 指定选项的最终叶子节点的标志位为选项对象的某个属性值
    leaf() {
      if (this.cascader) {
        return this.cascader.leaf;
      }
      return 'leaf';
    },
    // 指定选项的子选项为选项对象的某个属性值
    children() {
      if (this.cascader) {
        return this.cascader.children;
      }
      return 'children';
    },
    // 存储选中的值
    valueArr() {
      if (this.cascader) {
        return this.cascader.valueArr;
      }
      return [];
    },
    // 是否动态加载子节点，需与 lazyLoad 方法结合使用
    lazy() {
      if (this.cascader) {
        return this.cascader.lazy;
      }
      return false;
    },
    // 加载动态数据的方法，仅在 lazy 为 true 时有效
    lazyLoad() {
      if (this.cascader) {
        return this.cascader.lazyLoad;
      }
      return null;
    },
  },
  created() {
    // 监听displayPuop事件
    this.$on('displayPuop', (data) => {
      if (data && data[this.level]) {
        const { valueKey } = this;
        // 找出改层是否有选中的值
        const index = this.options.findIndex(
          (item) => item[valueKey] === data[this.level][valueKey]
        );
        if (index > -1) {
          // 改层有选中的值
          // 获取可选数据源当前选中值的对象
          const currentData = this.options[index];
          if (currentData[this.disabled]) {
            return;
          }
          // 获取子节点列表
          this.currentList = currentData[this.children] || [];
          // 当前选中数据源的对象
          this.current = currentData || {};
          this.$nextTick(() => {
            // 通知子组件
            this.$children.forEach((child) => {
              if (child.$options.name === 'LinPanel') {
                child.$emit('displayPuop', this.valueArr);
              }
            });
          });
        } else {
          // 改层没有选中的值
          this.currentList = [];
          this.current = {};
        }
      } else {
        this.currentList = [];
        this.current = {};
      }
    });
  },
  data() {
    return {
      // children节点列表
      currentList: [],
      // 当前选中数据源的对象
      current: {},
      // 是否显示加载器
      loading: false,
    };
  },
  methods: {
    // 点击下拉框选项
    async onItemClick(data) {
      if (data[this.disabled]) {
        return;
      }
      const { valueKey } = this;
      // 点击的是同一个数据,防止重复渲染
      if (data[valueKey] === this.current[valueKey]) {
        return;
      }
      this.current = data;
      if (this.lazy && this.lazyLoad && !data[this.leaf]) {
        // 开启了动态加载子节点,并且当前点击的不是最后一个节点
        if (!data[this.children]) {
          // 没有子节点的情况
          this.loading = true;
          // 开始加载数据
          const result = await this.lazyLoad({ level: this.level + 1, data });
          // 找出是属于哪个对象的子节点
          const index = this.options.findIndex(
            (item) => item[valueKey] === data[valueKey]
          );
          // 追加子节点
          // eslint-disable-next-line
          this.options[index][this.children] = result;
          this.loading = false;
        }
      }
      this.handleBehaver(data);
    },
    // 处理点击行为
    handleBehaver(data) {
      // 清空所有子组件的children列表，因为需要显示新的children列表
      this.clearList(this.$children);
      this.currentList = [];
      if (data[this.children] && data[this.children].length !== 0) {
        // 点击的不是最后有一个子节点，即不是最后一个面板，则需要显示下一个面板出来
        this.currentList = data[this.children];
      } else {
        // 点击的是最后一项,则隐藏面板
        this.cascader?.hidePuop();
      }
      // 设置选中的值
      this.cascader?.setValue(data, this.level);
    },
    // 清空所有子组件的children列表,递归
    clearList(children) {
      children.forEach((child) => {
        child.currentList = [];
        if (child.$children.length !== 0) {
          this.clearList(child.$children);
        }
      });
    },
    // 是否需要显示右侧箭头图标，最后一个子节点面板不需要显示有测箭头图标
    showIconRight(data) {
      if (this.lazy && this.lazyLoad) {
        // 动态加载则通过标志位判断是否为最后一个子节点面板
        return !data[this.leaf];
      }
      return data[this.children] && data[this.children].length !== 0;
    },
    // 动态加载子节点，请求的时候显示loading图标
    showLoading(data) {
      const { valueKey } = this;
      return data[valueKey] === this.current[valueKey] && this.loading;
    },
  },
};
</script>
