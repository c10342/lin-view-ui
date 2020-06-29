

<script>
const oneHeight = 26;
export default {
  name: "l-selector-group",
  render(h) {
    const {
      renderMore,
      width,
      labelWidth,
      height,
      $slots,
      switchMore,
      label,
      status,
      renderLabel
    } = this;

    return (
      <div
        class="l-selector-group"
        ref="selector"
        style={{ width: `${width}px` }}
      >
        <label>
          {renderLabel ? (
            renderLabel(h)
          ) : (
            <span class="l-selector-label" style={{ width: labelWidth }}>
              {label}
            </span>
          )}
        </label>
        <div
          class="l-selector-list"
          ref="selectorList"
          style={{ height: height }}
        >
          {$slots.default}
        </div>
        {this.isShowBtn ? (
          <span class="l-selector-more-text" ref="more" onClick={switchMore}>
            {renderMore ? (
              renderMore(h, status)
            ) : (
              <span class="l-selector-more-text-tip">更多</span>
            )}
          </span>
        ) : null}
      </div>
    );
  },
  props: {
    width: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: String,
      default: "40px"
    },
    value: {
      type: [String, Object, Number, Boolean]
    },
    valueKey: {
      type: String,
      default: ""
    },
    renderMore: {
      type: Function,
      default: null
    },
    renderLabel: {
      type: Function,
      default: null
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      group: this
    };
  },
  data() {
    return {
      isShowBtn: false,
      height: "auto",
      //   1-收起，2-展开
      status: 1
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      window.addEventListener("resize", this.onResize);
    });
  },
  methods: {
    onResize() {
      this.resetStatus();
    },
    resetStatus() {
      const clientHeight = this.$refs.selectorList.clientHeight;
      const style = this.$refs.selectorList.style;
      // console.log(style.height);
      if (style.height === "auto") {
        this.init();
      } else {
        this.height = "auto";
        this.$nextTick(() => {
          this.init();
        });
      }
    },
    init() {
      const clientHeight = this.$refs.selectorList.clientHeight;

      if (clientHeight > oneHeight) {
        this.isShowBtn = true;
        this.hide();
      } else {
        this.isShowBtn = false;
        this.show();
      }
    },
    switchMore() {
      if (this.status === 1) {
        this.show();
        this.$emit("show");
      } else {
        this.hide();
        this.$emit("hide");
      }
    },
    show() {
      this.height = "auto";
      this.status = 2;
    },
    hide() {
      this.height = `${oneHeight}px`;
      this.status = 1;
    }
  },
  computed: {
    outWidth() {
      if (this.width) {
        return this.width;
      }
      return this.$refs.selector?.clientWidth || 0;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
