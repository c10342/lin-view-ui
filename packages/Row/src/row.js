import './style.scss';

export default {
  name: 'LinRow',

  props: {
    // 自定义标签元素
    tag: {
      type: String,
      default: 'div',
    },
    // 栅格间隔
    gutter: {
      type: Number,
      default: 0,
    },
    // 布局模式
    type: {
      type: String,
      default: '',
    },
    // flex 布局下的水平排列方式
    justify: {
      type: String,
      default: '',
    },
    // flex 布局下的垂直排列方式
    align: {
      type: String,
      default: '',
    },
  },

  provide() {
    return {
      row: this,
    };
  },

  render(h) {
    const classList = [];
    if (this.type) {
      classList.push(`lin-row-${this.type}`);
    }
    if (this.justify) {
      classList.push(`lin-row-justify-${this.justify}`);
    }
    if (this.align) {
      classList.push(`lin-row-align-${this.align}`);
    }
    return h(
      this.tag,
      {
        class: ['lin-row', classList],
      },
      this.$slots.default
    );
  },
};
