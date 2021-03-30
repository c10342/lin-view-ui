import './style.scss';

export default {
  name: 'LinCol',

  props: {
    // 自定义元素标签
    tag: {
      type: String,
      default: 'div',
    },
    // 栅格占据列数
    span: {
      type: Number,
      default: 24,
    },
    // 栅格左侧的间隔数
    offset: {
      type: Number,
      default: 0,
    },
    // 栅格向右移动格数
    pull: {
      type: Number,
      default: 0,
    },
    // 栅格向左移动格数
    push: {
      type: Number,
      default: 0,
    },
    // 响应式栅格数或者属性对象  <768px
    xs: [Number, Object],
    // ≥768px 响应式栅格数或者栅格属性对象
    sm: [Number, Object],
    // ≥992 响应式栅格数或者栅格属性对象
    md: [Number, Object],
    // ≥1200 响应式栅格数或者栅格属性对象
    lg: [Number, Object],
  },

  inject: {
    row: {
      default: '',
    },
  },
  computed: {
    // 栅格之间的间隔
    gutter() {
      if (this.row) {
        return this.row.gutter;
      }
      return 0;
    },
  },

  render(h) {
    const style = {};
    const classList = [];

    if (this.gutter) {
      style.paddingLeft = `${this.gutter / 2}px`;
      style.paddingRight = style.paddingLeft;
    }

    ['offset', 'push', 'pull', 'span'].forEach((key) => {
      if (this[key]) {
        if (key !== 'span') {
          classList.push(`lin-col-${key}-${this[key]}`);
        } else {
          classList.push(`lin-col-${this[key]}`);
        }
      }
    });
    ['xs', 'sm', 'md', 'lg'].forEach((size) => {
      if (typeof this[size] === 'number') {
        classList.push(`lin-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        const props = this[size];
        Object.keys(props).forEach((prop) => {
          if (prop !== 'span') {
            classList.push(`lin-col-${size}-${prop}-${props[prop]}`);
          } else {
            classList.push(`lin-col-${size}-${props[prop]}`);
          }
        });
      }
    });
    return h(
      this.tag,
      {
        class: ['lin-col', classList],
        style,
      },
      this.$slots.default
    );
  },
};
