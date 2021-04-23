import { shallowMount } from '@vue/test-utils';

import Input from 'packages/input/index.js';

const createInput = (obj = {}) => {
  return shallowMount(Input, obj);
};

describe('属性', () => {
  it('placeholder', () => {
    const placeholder = '请输入';
    const wrapper = createInput({ propsData: { placeholder } });
    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe(placeholder);
  });

  it('type', () => {
    const type = 'password';
    const wrapper = createInput({ propsData: { type } });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe(type);
  });

  it('type', () => {
    const name = 'username';
    const wrapper = createInput({ propsData: { name } });
    const input = wrapper.find('input');
    expect(input.attributes('name')).toBe(name);
  });

  it('disabled', () => {
    const wrapper = createInput({ propsData: { disabled: true } });
    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeTruthy();
  });

  it('value', () => {
    const value = 'hello';
    const wrapper = createInput({ propsData: { value } });
    const input = wrapper.find('input');
    expect(input.element.value).toEqual(value);
  });

  it('clearable', async () => {
    const wrapper = createInput({
      propsData: {
        clearable: true
      }
    });
    let closeBtn = wrapper.find('.lin-input-icon.lin-icon-close');
    expect(closeBtn.exists()).toBeFalsy();
    await wrapper.setProps({ value: '1' });
    closeBtn = wrapper.find('.lin-input-icon.lin-icon-close');
    expect(closeBtn.exists()).toBeTruthy();
  });

  it('showPassword', () => {
    const wrapper = createInput({ propsData: { showPassword: true } });
    const pwdBtn = wrapper.find('.lin-input-icon.lin-icon-password');
    expect(pwdBtn.exists()).toBeTruthy();
  });

  it('maxlength', async () => {
    const maxlength = 5;
    const wrapper = createInput({ propsData: { maxlength } });
    const input = wrapper.find('input');
    expect(input.attributes('maxlength')).toBe(maxlength.toString());
    // await input.setValue("1233443322");
    // expect(input.element.value.length).toBe(maxlength);
  });

  it('minlength', async () => {
    const minlength = 5;
    const wrapper = createInput({ propsData: { minlength } });
    const input = wrapper.find('input');
    expect(input.attributes('minlength')).toBe(minlength.toString());
    // await input.setValue("1233443322");
    // expect(input.element.value.length).toBe(minlength);
  });
});

describe('插槽', () => {
  it('default', () => {
    const str = 'default-slot';
    const wrapper = createInput({
      slots: {
        default: str
      }
    });
    const suffix = wrapper.find('.lin-input-suffix');
    expect(suffix.exists()).toBeTruthy();
    expect(suffix.text()).toBe(str);
  });
});

describe('事件', () => {
  let wrapper;
  let input;
  beforeEach(() => {
    wrapper = createInput();
    input = wrapper.find('input');
  });
  it('input', () => {
    const value = 'hello';
    input.setValue(value);
    input.trigger('keyup');
    expect(wrapper.emitted().input[0][0]).toEqual(value);
  });

  it('blur', () => {
    input.trigger('blur');
    expect(wrapper.emitted().blur).toBeTruthy();
  });
  it('focus', () => {
    input.trigger('focus');
    expect(wrapper.emitted().focus).toBeTruthy();
  });
});
