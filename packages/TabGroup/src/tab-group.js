import './style.scss';

import 'src/fonts/iconfont.css';

export default {
  name: 'LinTabGroup',
  render () {
    const {
      type,
      // eslint-disable-next-line
      lineWidth,
      translateX,
      $slots,
      isScroll,
      onNextClick,
      onPrevClick,
      containerTranslateX,
      // eslint-disable-next-line
      containerWidth,
      renderTabLabel
    } = this;
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
              // eslint-disable-next-line
              width: containerwidth
            }}
            class="lin-tab-group-item-wrapper"
            ref="tabheaderWrapper"
          >
            {renderTabLabel()}

            {type !== 'default' || (
              <div
                class="lin-tab-group-active-line"
                style={{
                  // eslint-disable-next-line
                  width: linewidth,
                  transform: `translateX(${translateX})`
                }}
              ></div>
            )}
          </div>
          {isScroll
            ? (
            <span
              class="lin-tab-group-icon lin-icon-left"
              onClick={onPrevClick}
            ></span>
              )
            : null}
          {isScroll
            ? (
            <span
              class="lin-tab-group-icon lin-icon-right"
              onClick={onNextClick}
            ></span>
              )
            : null}
        </div>
        <div class="lin-tab-group-content">{$slots.default}</div>
      </div>
    );
  },
  data () {
    return {
      tabChildren: [],
      currentIndex: -1,
      lineWidth: '0px',
      translateX: '0px',
      isScroll: false,
      containerTranslateX: 0,
      containerWidth: '0px',
      step: 60
    };
  },
  props: {
    value: {
      type: String,
      default: null
    },
    type: {
      // card/border-card
      type: String,
      default: 'default'
    }
  },
  provide () {
    return {
      tabGroup: this
    };
  },
  mounted () {
    this.initTabChildren();
    this.initScroll();
    this.timer = null;
    window.addEventListener('resize', this.onResize);
  },
  methods: {
    renderTabLabel () {
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
    onResize () {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.initScroll, 500);
    },
    initScroll () {
      this.$nextTick(() => {
        const tabheader = this.$refs.tabheader;
        const tabheaderContainer = this.$refs.tabheaderContainer;

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
    onTabClick (data) {
      if (data.disabled) {
        return;
      }
      this.currentValue = data.name;
      this.$emit('tab-click', data.name);
    },
    initTabChildren () {
      const tabChildren = this.getTabs();
      const _tabChildren = tabChildren.map((child, index) => {
        if (!child.name) {
          child.index = index;
        }
        return {
          label: child.label,
          name: child.name || index,
          labelSlot: child.$slots.label || null,
          disabled: child.disabled
        };
      });
      this.tabChildren = _tabChildren;
      this.currentIndex = _tabChildren.length > 0 ? _tabChildren[0].name : 0;
    },
    getTabs () {
      return this.$children.filter((item) => item.$options.name === 'LinTabItem');
    },
    initVar () {
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
    onPrevClick () {
      this.containerTranslateX += this.step;
      if (this.containerTranslateX > 0) {
        this.containerTranslateX = 0;
      }
    },
    onNextClick () {
      const tabheader = this.$refs.tabheader;
      const tabheaderContainer = this.$refs.tabheaderContainer;
      const offsetWidth = tabheader.clientWidth - tabheaderContainer.scrollWidth - 40;
      this.containerTranslateX -= this.step;
      if (this.containerTranslateX < offsetWidth) {
        this.containerTranslateX = offsetWidth;
      }
    }
  },
  computed: {
    currentValue: {
      get () {
        if (this.value !== null) {
          return (
            this.value ||
            (this.tabChildren.length > 0 ? this.tabChildren[0].name : 0)
          );
        }
        return this.currentIndex;
      },
      set (value) {
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
      handler () {
        this.initVar();
      }
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    window.removeEventListener('resize', this.onResize);
  }
};
