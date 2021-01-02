import dispatch from 'src/utils/dispatch.js';

const validate = {
  created() {
    this.$on('input', () => {
      dispatch.call(this, {
        eventName: 'validate',
        componentName: 'LinFormItem',
      });
    });
  },
};

export default validate;
