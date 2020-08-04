import "./style.scss";

export default {
  name: "LinRow",

  props: {
    tag: {
      type: String,
      default: "div",
    },
    gutter: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "",
    },
    justify: {
      type: String,
      default: "",
    },
    align: {
      type: String,
      default: "",
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
        class: ["lin-row", classList],
      },
      this.$slots.default
    );
  },
};
