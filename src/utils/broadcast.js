/**
 * 向下通知
 * @param {Object} options
 */
function broadcast (options) {
  const { eventName, params, componentName } = options;

  // 获取当前组件下的所有的孩子
  const broad = (children) => {
    children.forEach((child) => {
      if (componentName) {
        if (child.$options.name === componentName) {
          child.$emit(eventName, params);
        }
      } else {
        child.$emit(eventName, params);
      }

      if (child.$children) {
        broad(child.$children);
      }
    });
  };
  broad(this.$children);
}

export default broadcast;
