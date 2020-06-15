import "./style.scss";

export default {
  name: "l-row",

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
      classList.push(`l-row-${this.type}`);
    }
    if (this.justify) {
      classList.push(`l-row-justify-${this.justify}`);
    }
    if (this.align) {
      classList.push(`l-row-align-${this.align}`);
    }
    return h(
      this.tag,
      {
        class: ["l-row", classList],
      },
      this.$slots.default
    );
  },
};
