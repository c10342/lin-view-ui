/**
 * 向上通知
 * @param {Object} options
 */
function dispatch(options) {
  const { eventName, params, componentName } = options;

  let parent = this.$parent || this.$root;
  let name = parent.$options.name;

  while (parent) {
    if (componentName) {
      if (name === componentName) {
        parent.$emit(eventName, params);
      }
    } else {
      parent.$emit(eventName, params);
    }
    parent = parent.$parent;
    name = parent?.$options.name;
  }
}

export default dispatch;
