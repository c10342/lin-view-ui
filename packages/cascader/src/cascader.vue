<template>
  <div class="lin-cascader" ref="notOutsideContainer">
    <div
      ref="boxContainer"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @click="onInputClick"
    >
      <lin-input
        @blur="onBlur"
        @focus="onFocus"
        :value="text"
        :placeholder="myPlaceholder"
        readonly
        class="lin-cascader-input"
      >
        <i class="lin-icon-down" v-if="!showClose && !showPopup"></i>
        <i class="lin-icon-up" v-if="!showClose && showPopup"></i>
        <i class="lin-icon-close" v-if="showClose" @click.stop="clearValue"></i>
      </lin-input>
    </div>
    <transition name="lin-cascader-fade">
      <div
        ref="popupContainer"
        :class="[
          'lin-cascader-popup',
          { 'lin-cascader-popup-up': !isDown },
          ,
          { 'lin-cascader-popup-down': isDown }
        ]"
        v-show="showPopup"
        :style="{ top }"
      >
        <div class="lin-panel-wrapper" v-if="myOptions.length !== 0">
          <lin-panel :options="myOptions" />
        </div>
        <div class="lin-panel-wrapper" v-if="myOptions.length === 0">
          <div class="lin-panel-empty" @click="hidePuop">
            <slot name="empty">
              {{ myEmptyTip }}
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Input from '@lin-view-ui/input'
import {DocumentClickMixins,LocaleMixin} from '@lin-view-ui/mixins'
import Panel from './panel.vue';

export default {
  name: 'LinCascader',
  mixins: [DocumentClickMixins, LocaleMixin],
  components: {
    [Input.name]: Input,
    [Panel.name]: Panel
  },
  props: {
    // 可选项数据源
    options: {
      type: Array,
      default: () => []
    },
    // 自定义数据显示方法
    showFormat: {
      type: Function
    },
    // 选项中绑定的值
    value: {
      type: Array,
      default: null
    },
    // 是否支持清空
    clearable: {
      type: Boolean,
      default: false
    },
    // 输入框文本占位符
    placeholder: {
      type: String
    },
    // 是否动态加载子节点，需与 lazyLoad 方法结合使用
    lazy: {
      type: Boolean,
      default: false
    },
    // 加载动态数据的方法，仅在 lazy 为 true 时有效
    lazyLoad: {
      type: Function
    },
    // 选项分隔符
    separator: {
      type: String,
      default: '/'
    },
    // 指定选项标签为选项对象的某个属性值
    label: {
      type: String,
      default: 'label'
    },
    // 指定选项的子选项为选项对象的某个属性值
    children: {
      type: String,
      default: 'children'
    },
    // 指定选项的最终叶子节点的标志位为选项对象的某个属性值
    leaf: {
      type: String,
      default: 'leaf'
    },
    // 指定选项的禁用为选项对象的某个属性值
    disabled: {
      type: String,
      default: 'disabled'
    },
    // 指定选项的唯一值为选项对象的某个属性值
    valueKey: {
      type: String,
      default: 'id'
    },
    // 暂无数据提示语
    emptyTip: {
      type: String
    }
  },
  provide() {
    return {
      cascader: this
    };
  },
  data() {
    return {
      // 当没有传入value时内部使用该值存储选中的值
      myValueArr: [],
      // 下拉框是否显示
      showPopup: false,
      // 鼠标是否悬浮在输入框容器
      isHover: false,
      // 开启动态加载时，使用该值存储lazyLoad方法返回来的值
      optionsList: [],
      // 距离顶部距离
      top: 0,
      // 展开位置，当向下位置不足够时向上展开
      isDown: false
    };
  },
  async created() {
    // 动态加载节点
    if (this.lazy && this.lazyLoad) {
      this.optionsList = await this.lazyLoad({ level: 0 });
    }
  },
  methods: {
    // 设置下拉框出现位置
    setPlacement() {
      this.$nextTick(() => {
        const { popupContainer } = this.$refs;
        const container = this.$refs.notOutsideContainer;
        const bottom =
          window.innerHeight - container.getBoundingClientRect().bottom;
        const { top } = container.getBoundingClientRect();
        if (bottom > popupContainer.clientHeight) {
          this.setDownTop();
        } else if (top > popupContainer.clientHeight) {
          this.setUpTop();
        } else {
          this.setDownTop();
        }
      });
    },
    // 向下展示下拉框
    setDownTop() {
      this.isDown = true;
      const { boxContainer } = this.$refs;
      this.top = `${boxContainer.clientHeight + 10}px`;
    },
    // 向上展示下拉框
    setUpTop() {
      this.isDown = false;
      const { popupContainer } = this.$refs;
      this.top = `${-popupContainer.clientHeight - 10}px`;
    },
    // 失去焦点
    onBlur(event) {
      this.$emit('blur', event);
    },
    // 获得焦点
    onFocus(event) {
      this.$emit('focus', event);
    },
    // 清空值
    clearValue() {
      this.valueArr = [];
      this.hidePuop();
    },
    // 监听鼠标进入输入框容器
    onMouseEnter() {
      this.isHover = true;
    },
    // 监听鼠标离开输入框容器
    onMouseLeave() {
      this.isHover = false;
    },
    // 设置选中的值
    setValue(data, level) {
      let { valueArr } = this;
      valueArr = valueArr.slice(0, level);
      valueArr.push(data);
      this.valueArr = valueArr;
      this.$emit('change', { data, level });
    },
    // 点击输入框容器
    onInputClick() {
      if (this.showPopup) {
        this.hidePuop();
      } else {
        this.displayPuop();
      }
    },
    // 显示下拉框
    displayPuop() {
      this.showPopup = true;
      this.$children.forEach((child) => {
        if (child.$options.name === 'LinPanel') {
          child.$emit('displayPuop', this.valueArr);
        }
      });
      this.setPlacement();
      this.$emit('visible-change', true);
    },
    // 隐藏下拉框
    hidePuop() {
      this.showPopup = false;
      this.$emit('visible-change', false);
    },
    // 发射input事件，配合v-model指令使用
    emitInputEvent(val) {
      this.$emit('input', val);
    },
    // 点击组件外部
    onDocumentClick(event) {
      const { notOutsideContainer } = this.$refs;
      if (!notOutsideContainer.contains(event.target)) {
        this.hidePuop();
      }
    }
  },
  computed: {
    // 存储选中的值
    valueArr: {
      get() {
        if (this.value !== null) {
          if (Array.isArray(this.value)) {
            return this.value;
          }
          // this.emitInputEvent([]);
          return [];
        }

        return this.myValueArr || [];
      },
      set(val) {
        if (this.value !== null) {
          this.emitInputEvent(val);
        } else {
          this.myValueArr = val;
        }
      }
    },
    // 显示在输入框中的文本
    text() {
      if (this.showFormat) {
        return this.showFormat(this.valueArr);
      }
      if (this.valueArr && this.valueArr.length > 0) {
        let str = '';
        this.valueArr.forEach((item) => {
          str += `${item[this.label]} ${this.separator} `;
        });
        return str.slice(0, -2);
      }
      return '';
    },
    // 是否线束清空图标
    showClose() {
      return (
        this.clearable &&
        this.isHover &&
        this.valueArr &&
        this.valueArr.length !== 0
      );
    },
    // 输入框文本占位符
    myPlaceholder() {
      if (this.placeholder) {
        return this.placeholder;
      }
      return this.t('LinViewUI.Cascader.placeholder');
    },
    // 暂无数据提示语
    myEmptyTip() {
      if (this.emptyTip) {
        return this.emptyTip;
      }
      return this.t('LinViewUI.Cascader.emptyTip');
    },
    // 可选项数据源
    myOptions() {
      if (this.lazy && this.lazyLoad) {
        return this.optionsList;
      }
      return this.options;
    }
  }
};
</script>
