import { shallowMount } from '@vue/test-utils';

import Checkbox from 'packages/Checkbox/index.js';

const createCheckbox = (obj = {}) => {
  return shallowMount(Checkbox, obj);
};

describe('属性', () => {
  it('value', () => {
    const wrapper = createCheckbox({
      propsData: {
        value: false
      }
    });
    const input = wrapper.find('input');
    const label = wrapper.find('label');
    expect(input.attributes('value')).toEqual('');
    expect(wrapper.vm.model).toBeFalsy();
    expect(wrapper.vm.isChecked).toBeFalsy();
    expect(label.classes('lin-checkbox-is-checked')).toBe(false);
  });

  it('name', () => {
    const wrapper = createCheckbox({
      propsData: {
        name: 'sex'
      }
    });
    const input = wrapper.find('input');
    expect(input.attributes('name')).toEqual('sex');
  });

  it('label', () => {
    const wrapper = createCheckbox({
      propsData: {
        label: '男'
      }
    });
    const input = wrapper.find('input');
    const template = wrapper.find('.lin-checkbox-label');
    expect(input.attributes('value')).toEqual('男');
    expect(template.text()).toEqual('男');
  });

  it('disabled', async () => {
    const wrapper = createCheckbox({
      propsData: {
        disabled: true
      }
    });
    const input = wrapper.find('input');
    const label = wrapper.find('label');
    expect(wrapper.classes('lin-checkbox-is-disabled')).toBeTruthy();
    expect(input.attributes('disabled')).toBeTruthy();
    await label.trigger('click');
    expect(wrapper.emitted().input).toBeFalsy();
  });
});

describe('插槽', () => {
  it('default', () => {
    const wrapper = createCheckbox({
      slots: {
        default: '女'
      }
    });
    const template = wrapper.find('.lin-checkbox-label');
    expect(template.text()).toEqual('女');
  });
});
