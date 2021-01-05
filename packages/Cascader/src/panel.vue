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
    options: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    }
  },
  inject: ['cascader'],
  computed: {
    valueKey () {
      if (this.cascader) {
        return this.cascader.valueKey;
      }
      return 'id';
    },
    label () {
      if (this.cascader) {
        return this.cascader.label;
      }
      return 'label';
    },
    disabled () {
      if (this.cascader) {
        return this.cascader.disabled;
      }
      return 'disabled';
    },
    leaf () {
      if (this.cascader) {
        return this.cascader.leaf;
      }
      return 'leaf';
    },
    children () {
      if (this.cascader) {
        return this.cascader.children;
      }
      return 'children';
    },
    valueArr () {
      if (this.cascader) {
        return this.cascader.valueArr;
      }
      return [];
    },
    lazy () {
      if (this.cascader) {
        return this.cascader.lazy;
      }
      return false;
    },
    lazyLoad () {
      if (this.cascader) {
        return this.cascader.lazyLoad;
      }
      return null;
    }
  },
  created () {
    this.$on('displayPuop', (data) => {
      if (data && data[this.level]) {
        const { valueKey } = this;
        const index = this.options.findIndex(
          (item) => item[valueKey] === data[this.level][valueKey]
        );
        if (index > -1) {
          const currentData = this.options[index];
          if (currentData[this.disabled]) {
            return;
          }
          this.currentList = currentData[this.children] || [];
          this.current = currentData || {};
          this.$nextTick(() => {
            this.$children.forEach((child) => {
              if (child.$options.name === 'LinPanel') {
                child.$emit('displayPuop', this.valueArr);
              }
            });
          });
        } else {
          this.currentList = [];
          this.current = {};
        }
      } else {
        this.currentList = [];
        this.current = {};
      }
    });
  },
  data () {
    return {
      currentList: [],
      current: {},
      loading: false
    };
  },
  methods: {
    async onItemClick (data) {
      if (data[this.disabled]) {
        return;
      }
      const { valueKey } = this;
      if (data[valueKey] === this.current[valueKey]) {
        return;
      }
      this.current = data;
      if (this.lazy && this.lazyLoad && !data[this.leaf]) {
        if (!data[this.children]) {
          this.loading = true;
          const result = await this.lazyLoad({ level: this.level + 1, data });
          const index = this.options.findIndex(
            (item) => item[valueKey] === data[valueKey]
          );
          // eslint-disable-next-line
          this.options[index][this.children] = result;
          this.loading = false;
        }
      }
      this.handleBehaver(data);
    },
    handleBehaver (data) {
      this.clearList(this.$children);
      this.currentList = [];
      if (data[this.children] && data[this.children].length !== 0) {
        this.currentList = data[this.children];
      } else {
        this.cascader?.hidePuop();
      }
      this.cascader?.setValue(data, this.level);
    },
    clearList (children) {
      children.forEach((child) => {
        child.currentList = [];
        if (child.$children.length !== 0) {
          this.clearList(child.$children);
        }
      });
    },
    showIconRight (data) {
      if (this.lazy && this.lazyLoad) {
        return !data[this.leaf];
      }
      return data[this.children] && data[this.children].length !== 0;
    },
    showLoading (data) {
      const { valueKey } = this;
      return data[valueKey] === this.current[valueKey] && this.loading;
    }
  }
};
</script>
