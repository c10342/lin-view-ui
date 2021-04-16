import { shallowMount } from '@vue/test-utils';

import Dialog from 'packages/Dialog/index.js';

const createDialog = (obj = {}) => {
  return shallowMount(Dialog, obj);
};

describe('属性', () => {
  it('title', () => {
    const title = 'title属性';
    const wrapper = createDialog({ propsData: { title } });
    const titleDom = wrapper.find('.lin-dialog-title');
    expect(titleDom.exists()).toBeTruthy();
    expect(titleDom.text()).toEqual(title);
  });

  it('width', () => {
    const width = '300px';
    const wrapper = createDialog({ propsData: { width } });
    const container = wrapper.element.getElementsByClassName('lin-dialog');
    expect(container[0].style.width).toEqual(width);
  });

  it('top', () => {
    const top = '150px';
    const wrapper = createDialog({ propsData: { top } });
    const container = wrapper.element.getElementsByClassName('lin-dialog');
    expect(container[0].style.marginTop).toEqual(top);
  });

  it('visible', () => {
    const wrapper = createDialog({
      propsData: { visible: true }
    });
    expect(
      wrapper.findComponent({ name: 'lin-dialog' }).element
    ).not.toBeNull();
  });

  it('beforeClose', () => {
    const beforeClose = jest.fn();
    const wrapper = createDialog({ propsData: { visible: true, beforeClose } });
    const button = wrapper.find('.lin-dialog-headerbtn');
    button.trigger('click');
    expect(beforeClose).toBeCalled();
  });

  it('closeOnClickModa', () => {
    const beforeClose = jest.fn();
    const wrapper = createDialog({ propsData: { visible: true, beforeClose } });
    const container = wrapper.find('.lin-dialog-wrapper');
    container.trigger('click');
    expect(beforeClose).toBeCalled();
  });
});

describe('插槽', () => {
  it('default', () => {
    const defaultSolt = '<span>default</span>';
    const wrapper = createDialog({
      slots: {
        default: defaultSolt
      }
    });
    const defaultContainer = wrapper.find('.lin-dialog-body');
    expect(defaultContainer.get('span').exists()).toBeTruthy();
    expect(defaultContainer.exists()).toBeTruthy();
    expect(defaultContainer.html()).toContain(defaultSolt);
  });

  it('title', () => {
    const titleSolt = '<span>title</span>';
    const wrapper = createDialog({
      slots: {
        title: titleSolt
      }
    });
    const titleContainer = wrapper.find('.lin-dialog-header');
    expect(titleContainer.get('span').exists()).toBeTruthy();
    expect(titleContainer.exists()).toBeTruthy();
    expect(titleContainer.html()).toContain(titleSolt);
  });

  it('footer', () => {
    const footerSolt = '<span>footer</span>';
    const wrapper = createDialog({
      slots: {
        footer: footerSolt
      }
    });
    const footerContainer = wrapper.find('.lin-dialog-footer');
    expect(footerContainer.get('span').exists()).toBeTruthy();
    expect(footerContainer.exists()).toBeTruthy();
    expect(footerContainer.html()).toContain(footerSolt);
  });
});

describe('事件', () => {
  it('close', () => {
    const wrapper = createDialog({ propsData: { visible: true } });
    const button = wrapper.find('.lin-dialog-headerbtn');
    button.trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
