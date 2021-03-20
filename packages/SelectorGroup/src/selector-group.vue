<script>
import LocaleMixin from 'src/mixins/locale.js';

const oneHeight = 26;
export default {
  name: 'LinSelectorGroup',
  mixins: [LocaleMixin],
  render (h) {
    const {
      renderMore,
      width,
      labelWidth,
      height,
      $slots,
      switchMore,
      label,
      status,
      renderLabel,
      t
    } = this;

    return (
      <div
        class="lin-selector-group"
        ref="selector"
        style={{ width: `${width}px` }}
      >
        <label>
          {renderLabel
            ? (
                renderLabel(h)
              )
            : (
            <span class="lin-selector-label" style={{ width: labelWidth }}>
              {label}
            </span>
              )}
        </label>
        <div
          class="lin-selector-list"
          ref="selectorList"
          style={{ height }}
        >
          {$slots.default}
        </div>
        {this.isShowBtn
          ? (
          <span class="lin-selector-more-text" ref="more" onClick={switchMore}>
            {renderMore
              ? (
                  renderMore(h, status)
                )
              : (
              <span class="lin-selector-more-text-tip">
              {status === 2
                ? t('LinViewUI.Selector.hide')
                : t('LinViewUI.Selector.show')}
                </span>
                )}
          </span>
            )
          : null}
      </div>
    );
  },
  props: {
    // 选择器整体宽度
    width: {
      type: String,
      default: ''
    },
    // labelWidth
    labelWidth: {
      type: String,
      default: '40px'
    },
    // 绑定值
    value: {
      type: [String, Object, Number, Boolean]
    },
    // 作为 value 唯一标识的键名，绑定值为对象类型时必填
    valueKey: {
      type: String,
      default: ''
    },
    // 自定义渲染更多标签内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个是否展开或收起的状态值。可以使用 jsx
    renderMore: {
      type: Function,
      default: null
    },
    // 自定义渲染头部标签内容，使用 Vue 的 Render 函数，参数是 h，可以使用 jsx
    renderLabel: {
      type: Function,
      default: null
    },
    // 头部标签内容
    label: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      group: this
    };
  },
  data () {
    return {
      // 是否显示展开/隐藏按钮
      isShowBtn: false,
      // 容器高度
      height: 'auto',
      //   1-收起，2-展开
      status: 1
    };
  },
  mounted () {
    this.$nextTick(() => {
      // 初始化 收起/展开按钮
      this.init();
      window.addEventListener('resize', this.onResize);
    });
  },
  methods: {
    onResize () {
      this.resetStatus();
    },
    // 重置状态
    resetStatus () {
      const style = this.$refs.selectorList.style;
      if (style.height === 'auto') {
        // 展开状态
        this.init();
      } else {
        // 折叠状态
        this.height = 'auto';
        this.$nextTick(() => {
          this.init();
        });
      }
    },
    init () {
      // 选择器高度
      const clientHeight = this.$refs.selectorList.clientHeight;

      if (clientHeight > oneHeight) {
        // 选择器高度大于一行的高度
        // 需要显示 收起/展开按钮
        this.isShowBtn = true;
        // 超出高度需要隐藏变成一行
        this.hide();
      } else {
        this.isShowBtn = false;
        this.show();
      }
    },
    // 点击 收起/展开按钮，切换状态
    switchMore () {
      if (this.status === 1) {
        // 收起状态，此时点击需要展开它
        this.show();
        this.$emit('show');
      } else {
        this.hide();
        this.$emit('hide');
      }
    },
    // 展开选择器
    show () {
      // 高度设置为自适应
      this.height = 'auto';
      this.status = 2;
    },
    // 隐藏选择器
    hide () {
      // 高度设置为一行的高度
      this.height = `${oneHeight}px`;
      this.status = 1;
    }
  },
  // computed: {
  //   // 最外层容器宽度
  //   outWidth () {
  //     if (this.width) {
  //       return this.width;
  //     }
  //     return this.$refs.selector?.clientWidth || 0;
  //   }
  // },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize);
  }
};
</script>
