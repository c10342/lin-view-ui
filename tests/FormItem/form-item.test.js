import { shallowMount } from '@vue/test-utils';

import FormItem from 'packages/FormItem/index.js';

const createFormItem = (obj = {}) => {
  return shallowMount(FormItem, {
    provide: {
      Form: {
        labelWidth: '20px',
      },
    },
    ...obj,
  });
};

describe('属性', () => {
  it('label', () => {
    const wrapper = createFormItem({
      propsData: {
        label: '你好',
      },
    });

    const label = wrapper.find('.lin-form-item-label');
    expect(label.text()).toBe('你好');
  });

  it('inject', () => {
    const wrapper = createFormItem({
      propsData: {
        label: '你好',
      },
    });

    const label = wrapper.find('.lin-form-item-label');
    expect(label.element.style.width).toBe('20px');
    expect(wrapper.vm.Form.labelWidth).toBe('20px');
  });
});

describe('插槽', () => {
  const wrapper = createFormItem({
    slots: {
      default: '<span>你好</span>',
    },
  });
  const soltContent = wrapper.find('.lin-form-item-content');
  expect(soltContent.text()).toBe('你好');
});
