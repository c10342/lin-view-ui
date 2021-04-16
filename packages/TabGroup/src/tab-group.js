import './style.scss';

import 'src/fonts/iconfont.css';

export default {
  name: 'LinTabGroup',
  render(h) {
    const {
      type,
      lineWidth,
      translateX,
      $slots,
      isScroll,
      onNextClick,
      onPrevClick,
      containerTranslateX,
      containerWidth,
      renderTabLabel
    } = this;
    const containerwidth = containerWidth;
    const linewidth = lineWidth;
    return (
      <div
        class={[
          { 'lin-tab-group-card': type === 'card' },
          { 'lin-tab-group-border': type === 'border-card' },
          'lin-tab-group'
        ]}
      >
        <div
          class={[
            'lin-tab-group-header',
            { 'lin-tab-group-header-scroll': isScroll }
          ]}
          ref="tabheader"
        >
          <div
            style={{
              transform: `translateX(${containerTranslateX}px)`,
              width: containerwidth
            }}
            class="lin-tab-group-item-wrapper"
            ref="tabheaderWrapper"
          >
            {renderTabLabel(h)}

            {type !== 'default' || (
              <div
                class="lin-tab-group-active-line"
                style={{
                  width: linewidth,
                  transform: `translateX(${translateX})`
                }}
              ></div>
            )}
          </div>
          {isScroll ? (
            <span
              class="lin-tab-group-icon lin-icon-left"
              onClick={onPrevClick}
            ></span>
          ) : null}
          {isScroll ? (
            <span
              class="lin-tab-group-icon lin-icon-right"
              onClick={onNextClick}
            ></span>
          ) : null}
        </div>
        <div class="lin-tab-group-content">{$slots.default}</div>
      </div>
    );
  },
  data() {
    return {
      // 存储LinTabItem组件孩子信息
      tabChildren: [],
      // 当前选中的是哪一个tab
      currentIndex: -1,
      // 下划线宽度
      lineWidth: '0px',
      // 下划线水平位移
      translateX: '0px',
      // 是否需要滚动
      isScroll: false,
      // tab容器的水平位移
      containerTranslateX: 0,
      // tab容器的宽度
      containerWidth: '0px',
      // 每次移动的步伐
      step: 60
    };
  },
  props: {
    // 绑定值，选中选项卡的 name
    value: {
      type: String,
      default: null
    },
    // 风格类型
    type: {
      // card/border-card
      type: String,
      default: 'default'
    }
  },
  provide() {
    return {
      tabGroup: this
    };
  },
  mounted() {
    // 初始化tab
    this.initTabChildren();
    // 初始化滚动行为
    this.initScroll();
    this.timer = null;
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    // 渲染tab标签
    renderTabLabel(h) {
      const { tabChildren, currentValue, onTabClick } = this;
      return (
        <div class="lin-tab-group-item-container" ref="tabheaderContainer">
          {tabChildren.map((item, index) => (
            <div
              class={[
                { 'lin-tab-group-active': currentValue === item.name },
                'lin-tab-group-header-item',
                { 'lin-tab-group-header-item-disabled': item.disabled }
              ]}
              id={`tab-${item.name}`}
              key={index}
              onClick={() => onTabClick(item)}
            >
              {item.labelSlot || item.label}
            </div>
          ))}
        </div>
      );
    },
    // 窗口大小发生变化事件
    onResize() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.initScroll, 500);
    },
    initScroll() {
      this.$nextTick(() => {
        const tabheader = this.$refs.tabheader;
        const tabheaderContainer = this.$refs.tabheaderContainer;
        // 判断是否需要进行横向滚动
        this.containerTranslateX = 0;
        if (tabheader.clientWidth < tabheaderContainer.scrollWidth) {
          this.isScroll = true;
          this.containerWidth = `${tabheaderContainer.scrollWidth}px`;
        } else {
          this.containerWidth = '100%';
          this.isScroll = false;
        }
        if (this.type === 'default') {
          this.initVar();
        }
      });
    },
    // 点击tab
    onTabClick(data) {
      if (data.disabled) {
        return;
      }
      this.currentValue = data.name;
      this.$emit('tab-click', data.name);
    },
    // 初始化Tab
    initTabChildren() {
      // 获取LinTabItem组件孩子
      const tabChildren = this.getTabs();
      const _tabChildren = tabChildren.map((child, index) => {
        if (!child.name) {
          // 没有name字段则使用索引代替
          child.index = index;
        }
        return {
          label: child.label,
          name: child.name || index,
          labelSlot: child.$slots.label || null,
          disabled: child.disabled
        };
      });
      // 存储所需要的组件信息
      this.tabChildren = _tabChildren;
      // 初始化第一个为激活状态
      this.currentIndex = _tabChildren.length > 0 ? _tabChildren[0].name : 0;
    },
    // 获取LinTabItem组件孩子
    getTabs() {
      return this.$children.filter(
        (item) => item.$options.name === 'LinTabItem'
      );
    },
    // 初始化下划线相关数据
    initVar() {
      this.$nextTick(() => {
        if (this.currentValue !== -1) {
          const dom = document.getElementById(`tab-${this.currentValue}`);
          if (dom) {
            this.lineWidth = `${dom.offsetWidth}px`;
            const left = dom.getBoundingClientRect().left;
            const tabheaderWrapper = this.$refs.tabheaderWrapper;
            const tabheaderWrapperX = tabheaderWrapper.getBoundingClientRect()
              .left;
            this.translateX = `${left - tabheaderWrapperX}px`;
          }
        }
      });
    },
    // 点击左移
    onPrevClick() {
      this.containerTranslateX += this.step;
      if (this.containerTranslateX > 0) {
        this.containerTranslateX = 0;
      }
    },
    // 点击右移
    onNextClick() {
      const tabheader = this.$refs.tabheader;
      const tabheaderContainer = this.$refs.tabheaderContainer;
      const offsetWidth =
        tabheader.clientWidth - tabheaderContainer.scrollWidth - 40;
      this.containerTranslateX -= this.step;
      if (this.containerTranslateX < offsetWidth) {
        this.containerTranslateX = offsetWidth;
      }
    }
  },
  computed: {
    // 当前值，就是在哪一个tab
    currentValue: {
      get() {
        if (this.value !== null) {
          return (
            this.value ||
            (this.tabChildren.length > 0 ? this.tabChildren[0].name : 0)
          );
        }
        return this.currentIndex;
      },
      set(value) {
        if (this.value !== null) {
          this.$emit('input', value);
        } else {
          this.currentIndex = value;
        }
      }
    }
  },
  watch: {
    currentValue: {
      immediate: true,
      handler() {
        this.initVar();
      }
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    window.removeEventListener('resize', this.onResize);
  }
};
