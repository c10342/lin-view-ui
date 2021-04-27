import { shallowMount } from '@vue/test-utils';

import { createVue } from '../utils.js';

import Checkbox from 'packages/checkbox/index.js';

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

describe('事件', () => {
  const wrapper = createCheckbox();
  wrapper.vm.model = false;
  expect(wrapper.emitted().input).toBeTruthy();
  expect(wrapper.emitted().input[0][0]).toBe(false);
});

describe('组合', () => {
  it('value', async () => {
    const vm = createVue({
      template: `
      <lin-checkbox-group v-model="value">
        <lin-checkbox ref='a' label="抽烟"></lin-checkbox>
        <lin-checkbox ref='b' label="喝酒"></lin-checkbox>
        <lin-checkbox ref='c' label="探头"></lin-checkbox>
      </lin-checkbox-group>
      `,
      data() {
        return {
          value: []
        };
      }
    });
    expect(vm.value.length).toBe(0);
    vm.$refs.a.model = ['抽烟'];
    await vm.$nextTick();
    expect(vm.value).toContain('抽烟');
  });
  it('value', async () => {
    const vm = createVue({
      template: `
      <lin-checkbox-group disabled v-model="value">
        <lin-checkbox ref='a' label="抽烟"></lin-checkbox>
      </lin-checkbox-group>
      `,
      data() {
        return {
          value: []
        };
      }
    });
    const checkbox = vm.$refs.a;
    expect(checkbox.isDisabled).toBe(true);
    expect(
      checkbox.$el.classList.contains('lin-checkbox-is-disabled')
    ).toBeTruthy();
  });
});
