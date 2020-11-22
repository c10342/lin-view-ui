const drag = {
  props: {
    drag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogStyle: {
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
      },
    };
  },
  mounted() {
    this.startY = 0;
    this.startX = 0;
  },
  beforeDestroy() {
    this.removeListener();
  },
  methods: {
    onDragClick(event) {
      if (!this.drag) {
        return;
      }
      document.body.classList.add("user-select-none");
      this.startY = event.clientY;
      this.startX = event.clientX;
      document.addEventListener("mousemove", this.onMousemove);
      document.addEventListener("mouseup", this.onMouseup);
    },
    onMousemove(event) {
      const endY = event.clientY;
      const endX = event.clientX;
      const offsetY = endY - this.startY;
      const offsetX = endX - this.startX;
      const dialog = this.$refs.dragContainer;
      const rect = dialog.getBoundingClientRect();
      const left = rect.left;
      const top = rect.top;
      const width = rect.width;
      const height = rect.height;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      this.startY = endY;
      this.startX = endX;
      let dialogTop = parseInt(top + offsetY);
      let dialogLeft = parseInt(left + offsetX);
      dialogTop = dialogTop < 0 ? 0 : dialogTop;
      dialogLeft = dialogLeft < 0 ? 0 : dialogLeft;
      dialogTop =
        dialogTop > windowHeight - height ? windowHeight - height : dialogTop;
      dialogLeft =
        dialogLeft > windowWidth - width ? windowWidth - width : dialogLeft;
      this.dialogStyle = {
        top: `${dialogTop}px`,
        left: `${dialogLeft}px`,
        transform: "none",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      };
    },
    onMouseup() {
      document.body.classList.remove("user-select-none");
      this.removeListener();
    },
    removeListener() {
      document.removeEventListener("mousemove", this.onMousemove);
      document.removeEventListener("mouseup", this.onMouseup);
    },
  },
};

export default drag;
