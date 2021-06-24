export default function transitionStub() {
  return {
    render: function(h) {
      return this.$options._renderChildren;
    }
  };
}
