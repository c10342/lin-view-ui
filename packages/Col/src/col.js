import "./style.scss";

export default {
  name: "l-col",

  props: {
    tag: {
      type: String,
      default: "div",
    },
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
    pull: {
      type: Number,
      default: 0,
    },
    push: {
      type: Number,
      default: 0,
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
  },

  inject: {
    row: {
      default: "",
    },
  },
  computed: {
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

    ["offset", "push", "pull", "span"].forEach((key) => {
      if (this[key]) {
        if (key !== "span") {
          classList.push(`l-col-${key}-${this[key]}`);
        } else {
          classList.push(`l-col-${this[key]}`);
        }
      }
    });
    ["xs", "sm", "md", "lg"].forEach((size) => {
      if (typeof this[size] === "number") {
        classList.push(`l-col-${size}-${this[size]}`);
      } else if (typeof this[size] === "object") {
        const props = this[size];
        Object.keys(props).forEach((prop) => {
          if (prop !== "span") {
            classList.push(`l-col-${size}-${prop}-${props[prop]}`);
          } else {
            classList.push(`l-col-${size}-${props[prop]}`);
          }
        });
      }
    });
    return h(
      this.tag,
      {
        class: ["l-col", classList],
        style,
      },
      this.$slots.default
    );
  },
};
