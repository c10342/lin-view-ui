import { shallowMount } from '@vue/test-utils';

import Cascader from 'packages/cascader/index.js';

import { options } from './options.js';

const createCascader = (obj = {}) => {
  return shallowMount(Cascader, obj);
};

describe('属性', () => {
  it('options', () => {
    const wrapper = createCascader({
      propsData: {
        options
      }
    });
    expect(wrapper.vm.myOptions).toEqual(options);
  });
  it('showFormat', () => {
    const wrapper = createCascader({
      propsData: {
        options,
        showFormat: function () {
          return 'showFormat';
        }
      }
    });
    expect(wrapper.vm.text).toEqual('showFormat');
  });
  it('value', () => {
    const value = [{ label: '一致', value: 'yizhi' }];
    const wrapper = createCascader({
      propsData: {
        options,
        value
      }
    });
    expect(wrapper.vm.valueArr).toEqual(value);
  });
});
