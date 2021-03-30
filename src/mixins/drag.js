const drag = {
  props: {
    // 是否可进行拖拽
    drag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 拖拽的时候的样式，就是位置
      dialogStyle: {
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    };
  },
  mounted() {
    // 开始点
    this.startY = 0;
    this.startX = 0;
  },
  beforeDestroy() {
    this.removeListener();
  },
  methods: {
    // 鼠标按下，开始拖拽
    onDragClick(event) {
      if (!this.drag) {
        return;
      }
      // 防止选中文字，导致mouseup事件丢失
      document.body.classList.add('user-select-none');
      // 开始点
      this.startY = event.clientY;
      this.startX = event.clientX;
      document.addEventListener('mousemove', this.onMousemove);
      document.addEventListener('mouseup', this.onMouseup);
    },
    onMousemove(event) {
      // 结束点
      const endY = event.clientY;
      const endX = event.clientX;
      // 移动的偏移量
      const offsetY = endY - this.startY;
      const offsetX = endX - this.startX;
      // 需要拖拽容器
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
      let dialogTop = parseInt(top + offsetY, 10);
      let dialogLeft = parseInt(left + offsetX, 10);
      // 判断是否越界，超出视图范围
      dialogTop = dialogTop < 0 ? 0 : dialogTop;
      dialogLeft = dialogLeft < 0 ? 0 : dialogLeft;
      dialogTop =
        dialogTop > windowHeight - height ? windowHeight - height : dialogTop;
      dialogLeft =
        dialogLeft > windowWidth - width ? windowWidth - width : dialogLeft;
      this.dialogStyle = {
        top: `${dialogTop}px`,
        left: `${dialogLeft}px`,
        transform: 'none',
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
      };
    },
    // 鼠标抬起
    onMouseup() {
      document.body.classList.remove('user-select-none');
      this.removeListener();
    },
    removeListener() {
      document.removeEventListener('mousemove', this.onMousemove);
      document.removeEventListener('mouseup', this.onMouseup);
    },
  },
};

export default drag;
