import { isFunction } from "@src/utils";

const documentClick = {
  mounted() {
    document.addEventListener("click", this._onDocumentClick);
  },
  methods: {
    _onDocumentClick(event) {
      // event.stopPropagation()
      if (isFunction(this.onDocumentClick)) {
        this.onDocumentClick(event);
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this._onDocumentClick);
  }
};

export default documentClick;
