
import {dispatch} from '@lin-view-ui/utils'

const validate = {
  created() {
    this.$on('input', () => {
      dispatch.call(this, {
        eventName: 'validate',
        componentName: 'LinFormItem'
      });
    });
  }
};

export default validate;
