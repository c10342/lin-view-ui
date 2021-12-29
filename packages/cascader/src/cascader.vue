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
          <lin-panel :ref="getChildrenRef" :options="myOptions" />
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

<script lang='ts'>
import Input from "@packages/input";
import { isNull, isArray, UPDATE_MODEL_EVENT } from "@src/utils";
import { useClick,useLocale } from "@src/hooks";
import Panel from "./panel.vue";
import { componentName } from "./enum";
import {
  computed,
  DefineComponent,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onBeforeUpdate,
  onMounted,
  provide,
  ref,
} from "vue";

export default defineComponent({
  name: "LinCascader",
  components: {
    [Input.name]: Input,
    [Panel.name]: Panel,
  },
  props: {
    // 可选项数据源
    options: {
      type: Array,
      default: () => [],
    },
    // 自定义数据显示方法
    showFormat: {
      type: Function,
    },
    // 选项中绑定的值
    value: {
      type: Array,
      default: null,
    },
    // 是否支持清空
    clearable: {
      type: Boolean,
      default: false,
    },
    // 输入框文本占位符
    placeholder: {
      type: String,
    },
    // 是否动态加载子节点，需与 lazyLoad 方法结合使用
    lazy: {
      type: Boolean,
      default: false,
    },
    // 加载动态数据的方法，仅在 lazy 为 true 时有效
    lazyLoad: {
      type: Function,
    },
    // 选项分隔符
    separator: {
      type: String,
      default: "/",
    },
    // 指定选项标签为选项对象的某个属性值
    label: {
      type: String,
      default: "label",
    },
    // 指定选项的子选项为选项对象的某个属性值
    children: {
      type: String,
      default: "children",
    },
    // 指定选项的最终叶子节点的标志位为选项对象的某个属性值
    leaf: {
      type: String,
      default: "leaf",
    },
    // 指定选项的禁用为选项对象的某个属性值
    disabled: {
      type: String,
      default: "disabled",
    },
    // 指定选项的唯一值为选项对象的某个属性值
    valueKey: {
      type: String,
      default: "id",
    },
    // 暂无数据提示语
    emptyTip: {
      type: String,
    },
  },
  setup(props, context) {
    const {t} = useLocale()
    provide("cascader", getCurrentInstance());
    // 当没有传入value时内部使用该值存储选中的值
    const myValueArr = ref([]);
    // 下拉框是否显示
    const showPopup = ref(false);
    // 鼠标是否悬浮在输入框容器
    const isHover = ref(false);
    // 开启动态加载时，使用该值存储lazyLoad方法返回来的值
    const optionsList = ref([]);
    // 距离顶部距离
    const top = ref<number | string>(0);
    // 展开位置，当向下位置不足够时向上展开
    const isDown = ref(false);

    const childrenRef = ref<DefineComponent[]>([])

    const valueArr = computed<any>({
      get() {
        if (!isNull(props.value)) {
          if (isArray(props.value)) {
            return props.value as [];
          }
          return [];
        }

        return myValueArr.value || ([] as []);
      },
      set(val: []) {
        if (!isNull(props.value)) {
          emitInputEvent(val);
        } else {
          myValueArr.value = val;
        }
      },
    });
    // 显示在输入框中的文本
    const text = computed(() => {
      if (props.showFormat) {
        return props.showFormat(valueArr.value);
      }
      if (valueArr.value && valueArr.value.length > 0) {
        let str = "";
        valueArr.value.forEach((item:any) => {
          str += `${item[props.label]} ${props.separator} `;
        });
        return str.slice(0, -2);
      }
      return "";
    });
    // 是否线束清空图标
    const showClose = computed(() => {
      return (
        props.clearable &&
        isHover &&
        valueArr.value &&
        valueArr.value.length !== 0
      );
    });
    // 输入框文本占位符
    const myPlaceholder = computed(() => {
      if (props.placeholder) {
        return props.placeholder;
      }
      return t("LinViewUI.Cascader.placeholder");
    });
    // 暂无数据提示语
    const myEmptyTip = computed(() => {
      if (props.emptyTip) {
        return props.emptyTip;
      }
      return t("LinViewUI.Cascader.emptyTip");
    });
    // 可选项数据源
    const myOptions = computed(() => {
      if (props.lazy && props.lazyLoad) {
        return optionsList.value;
      }
      return props.options;
    });
    const popupContainer = ref<HTMLElement | null>(null);

    const notOutsideContainer = ref<HTMLElement | null>(null);

    const boxContainer = ref<HTMLElement | null>(null);


    // 设置下拉框出现位置
    function setPlacement() {
      nextTick(() => {
        if (!notOutsideContainer.value || !popupContainer.value) {
          return;
        }
        const bottom =
          window.innerHeight -
          notOutsideContainer.value.getBoundingClientRect().bottom;
        const { top } = notOutsideContainer.value.getBoundingClientRect();
        if (bottom > popupContainer.value.clientHeight) {
          setDownTop();
        } else if (top > popupContainer.value.clientHeight) {
          setUpTop();
        } else {
          setDownTop();
        }
      });
    }

    // 向下展示下拉框
    function setDownTop() {
      if (boxContainer.value) {
        isDown.value = true;
        top.value = `${boxContainer.value.clientHeight + 10}px`;
      }
    }
    // 向上展示下拉框
    function setUpTop() {
      if (popupContainer.value) {
        isDown.value = false;
        top.value = `${-popupContainer.value.clientHeight - 10}px`;
      }
    }

    // 失去焦点
    function onBlur(event: Event) {
      context.emit("blur", event);
    }
    // 获得焦点
    function onFocus(event: Event) {
      context.emit("focus", event);
    }

    // 清空值
    function clearValue() {
      valueArr.value = [];
      hidePuop();
    }
    // 监听鼠标进入输入框容器
    function onMouseEnter() {
      isHover.value = true;
    }
    // 监听鼠标离开输入框容器
    function onMouseLeave() {
      isHover.value = false;
    }

    // 发射input事件，配合v-model指令使用
    function emitInputEvent(val: any) {
      context.emit("input", val);
      context.emit(UPDATE_MODEL_EVENT, val);
    }

    // 隐藏下拉框
    function hidePuop() {
      showPopup.value = false;
      context.emit("visible-change", false);
    }

    // 设置选中的值
    function setValue(data: any, level: number) {
      let va = valueArr.value as any[];
      va = va.slice(0, level);
      va.push(data);
      valueArr.value = va;
      context.emit("change", { data, level });
    }
    // 点击输入框容器
    function onInputClick() {
      if (showPopup.value) {
        hidePuop();
      } else {
        displayPuop();
      }
    }
    // 显示下拉框
    function displayPuop() {
      showPopup.value = true;
      childrenRef.value.forEach((child) => {
        if (child.$options.name === componentName.panel) {
          child.$emit("displayPuop", valueArr.value);
        }
      });
      setPlacement();
      context.emit("visible-change", true);
    }

    function getChildrenRef(el:DefineComponent){
      childrenRef.value.push(el)
    }

    useClick(notOutsideContainer, hidePuop);

    onBeforeUpdate(()=>{
      childrenRef.value = []
    })
    
    onMounted(async () => {
      if (props.lazy && props.lazyLoad) {
        optionsList.value = await props.lazyLoad({ level: 0 });
      }
    });

    return {
      showPopup,
      top,
      isDown,
      text,
      showClose,
      myPlaceholder,
      myEmptyTip,
      myOptions,
      popupContainer,
      notOutsideContainer,
      boxContainer,
      onBlur,
      onFocus,
      clearValue,
      onMouseEnter,
      onMouseLeave,
      hidePuop,
      onInputClick,
      getChildrenRef
    }
  },
});
</script>
