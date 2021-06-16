const documentClick = {
  mounted() {
    document.addEventListener('click', this._onDocumentClick);
  },
  methods: {
    _onDocumentClick(event) {
      // event.stopPropagation()
      if (typeof this.onDocumentClick === 'function') {
        this.onDocumentClick(event);
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this._onDocumentClick);
  }
};

export default documentClick;
