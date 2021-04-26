export const sleep = function (ms = 50) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export const transitionStub = () => ({
  render: function (h) {
    return this.$options._renderChildren;
  }
});
