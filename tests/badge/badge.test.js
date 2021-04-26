import { shallowMount } from '@vue/test-utils';

import Badge from 'packages/badge/index.js';

const createBadge = (options = {}) => {
  return shallowMount(Badge, options);
};

describe('属性', () => {
  it('value,max', () => {
    const wrapper = createBadge({
      propsData: {
        value: 1
      }
    });
    expect(wrapper.vm.text).toBe(1);
    wrapper.setProps({
      max: 99,
      value: 100
    });
    expect(wrapper.vm.text).toBe('99+');

    wrapper.setProps({
      value: 'hello'
    });
    expect(wrapper.vm.text).toBe('hello');

    wrapper.setProps({
      value: undefined
    });
    expect(wrapper.vm.text).toBe('');
  });

  it('isDot', async () => {
    const wrapper = createBadge();

    let text = wrapper.find('.lin-badge-text');
    let dot = wrapper.find('.lin-badge-dot');
    expect(text.exists()).toBeTruthy();
    expect(dot.exists()).toBeFalsy();

    await wrapper.setProps({
      isDot: true
    });

    text = wrapper.find('.lin-badge-text');
    dot = wrapper.find('.lin-badge-dot');
    expect(text.exists()).toBeFalsy();
    expect(dot.exists()).toBeTruthy();
  });

  it('type', async () => {
    const typeList = ['primary', 'success', 'warning', 'danger', 'info'];
    const wrapper = createBadge({
      propsData: {
        isDot: true
      }
    });
    for (let i = 0; i < typeList.length; i++) {
      const type = typeList[i];
      await wrapper.setProps({
        type
      });
      const dot = wrapper.find('.lin-badge-dot');
      expect(dot.classes()).toContain(`lin-badge-${type}`);
    }

    wrapper.setProps({
      isDot: false
    });

    for (let i = 0; i < typeList.length; i++) {
      const type = typeList[i];
      await wrapper.setProps({
        type
      });
      const text = wrapper.find('.lin-badge-text');
      expect(text.classes()).toContain(`lin-badge-${type}`);
    }
  });
});
