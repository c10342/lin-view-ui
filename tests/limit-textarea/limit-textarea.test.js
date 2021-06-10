import { shallowMount } from '@vue/test-utils';

import LimitTextarea from 'packages/limit-textarea/index.js';

describe('属性', () => {
  it('type,rows', () => {
    const props = {
      placeholder: '请输入',
      rows: 5
    };
    const wrapper = shallowMount(LimitTextarea, {
      propsData: props
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('placeholder')).toBe(props.placeholder);
    expect(textarea.attributes('rows')).toBe(props.rows + '');
  });
  it('maxLen,isCut', async () => {
    const wrapper = shallowMount(LimitTextarea, {
      propsData: {
        maxLen: 10
      }
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.attributes('maxlength')).toEqual(undefined);

    await wrapper.setProps({
      isCut: true
    });
    expect(textarea.attributes('maxlength')).toEqual(10 + '');

    await textarea.setValue('你好');
    await textarea.trigger('keyup');
    const numspan = wrapper.find('.lin-limit-textarea-num');
    expect(numspan.exists()).toBeTruthy();
    expect(numspan.text()).toBe(8 + '');
  });
  it('value', () => {
    const wrapper = shallowMount(LimitTextarea, {
      propsData: {
        value: 'value'
      }
    });
    const textarea = wrapper.find('textarea');
    expect(textarea.element.value).toEqual('value');
  });
});

describe('事件', () => {
  it('change', () => {
    const wrapper = shallowMount(LimitTextarea);
    const value = '你好';
    const input = wrapper.find('textarea');
    input.setValue(value);
    input.trigger('keyup');
    expect(wrapper.emitted().change[0][0]).toEqual(value);
  });
  it('overText', () => {
    const wrapper = shallowMount(LimitTextarea, {
      propsData: {
        maxLen: 3
      }
    });
    const value = '1234';
    const textarea = wrapper.find('textarea');
    textarea.setValue(value);
    textarea.trigger('keyup');
    expect(wrapper.emitted().overText[0][0]).toEqual(value);
  });
});
