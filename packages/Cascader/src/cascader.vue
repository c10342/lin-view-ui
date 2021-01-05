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
          { 'lin-cascader-popup-down': isDown },
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
import Input from 'packages/Input/index.js';
import documentClick from 'src/mixins/documentClick.js';
import LocaleMixin from 'src/mixins/locale.js';
import Panel from './panel.vue';

export default {
  name: 'LinCascader',
  mixins: [documentClick, LocaleMixin],
  components: {
    [Input.name]: Input,
    [Panel.name]: Panel
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    showFormat: {
      type: Function
    },
    value: {
      type: Array,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    lazy: {
      type: Boolean,
      default: false
    },
    lazyLoad: {
      type: Function
    },
    separator: {
      type: String,
      default: '/'
    },
    label: {
      type: String,
      default: 'label'
    },
    children: {
      type: String,
      default: 'children'
    },
    leaf: {
      type: String,
      default: 'leaf'
    },
    disabled: {
      type: String,
      default: 'disabled'
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    emptyTip: {
      type: String
    }
  },
  provide () {
    return {
      cascader: this
    };
  },
  data () {
    return {
      myValueArr: [],
      showPopup: false,
      isHover: false,
      optionsList: [],
      top: 0,
      isDown: false
    };
  },
  async created () {
    if (this.lazy && this.lazyLoad) {
      this.optionsList = await this.lazyLoad({ level: 0 });
    }
  },
  methods: {
    setPlacement () {
      this.$nextTick(() => {
        const { popupContainer } = this.$refs;
        const container = this.$refs.notOutsideContainer;
        const bottom = window.innerHeight - container.getBoundingClientRect().bottom;
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
    setDownTop () {
      this.isDown = true;
      const { boxContainer } = this.$refs;
      this.top = `${boxContainer.clientHeight + 10}px`;
    },
    setUpTop () {
      this.isDown = false;
      const { popupContainer } = this.$refs;
      this.top = `${-popupContainer.clientHeight - 10}px`;
    },
    onBlur (event) {
      this.$emit('blur', event);
    },
    onFocus (event) {
      this.$emit('focus', event);
    },
    clearValue () {
      this.valueArr = [];
      this.hidePuop();
    },
    onMouseEnter () {
      this.isHover = true;
    },
    onMouseLeave () {
      this.isHover = false;
    },
    setValue (data, level) {
      let { valueArr } = this;
      valueArr = valueArr.slice(0, level);
      valueArr.push(data);
      this.valueArr = valueArr;
      this.$emit('change', { data, level });
    },
    onInputClick () {
      if (this.showPopup) {
        this.hidePuop();
      } else {
        this.displayPuop();
      }
    },
    displayPuop () {
      this.showPopup = true;
      this.$children.forEach((child) => {
        if (child.$options.name === 'LinPanel') {
          child.$emit('displayPuop', this.valueArr);
        }
      });
      this.setPlacement();
      this.$emit('visible-change', true);
    },
    hidePuop () {
      this.showPopup = false;
      this.$emit('visible-change', false);
    },
    emitInputEvent (val) {
      this.$emit('input', val);
    },
    onDocumentClick (event) {
      const { notOutsideContainer } = this.$refs;
      if (!notOutsideContainer.contains(event.target)) {
        this.hidePuop();
      }
    }
  },
  computed: {
    valueArr: {
      get () {
        if (this.value !== null) {
          if (Array.isArray(this.value)) {
            return this.value;
          }
          // this.emitInputEvent([]);
          return [];
        }

        return this.myValueArr || [];
      },
      set (val) {
        if (this.value !== null) {
          this.emitInputEvent(val);
        } else {
          this.myValueArr = val;
        }
      }
    },
    text () {
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
    showClose () {
      return (
        this.clearable &&
        this.isHover &&
        this.valueArr &&
        this.valueArr.length !== 0
      );
    },
    myPlaceholder () {
      if (this.placeholder) {
        return this.placeholder;
      }
      return this.t('LinViewUI.Cascader.placeholder');
    },
    myEmptyTip () {
      if (this.emptyTip) {
        return this.emptyTip;
      }
      return this.t('LinViewUI.Cascader.emptyTip');
    },
    myOptions () {
      if (this.lazy && this.lazyLoad) {
        return this.optionsList;
      }
      return this.options;
    }
  }
};
</script>
