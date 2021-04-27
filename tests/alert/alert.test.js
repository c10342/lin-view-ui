import { shallowMount } from '@vue/test-utils';

import Alert from 'packages/alert/index.js';

const createAlert = (options = {}) => {
  return shallowMount(Alert, options);
};

describe('属性', () => {
  it('title', () => {
    const title = '你好';
    const wrapper = createAlert({
      propsData: {
        title
      }
    });
    const titleContainer = wrapper.find('.lin-alert-title');
    expect(titleContainer.text()).toBe(title);
  });

  it('description', async () => {
    const description = '描述';
    const wrapper = createAlert();
    let descriptionContainer = wrapper.find('.lin-alert-description');
    expect(descriptionContainer.exists()).toBeFalsy();
    await wrapper.setProps({
      description
    });
    descriptionContainer = wrapper.find('.lin-alert-description');
    expect(descriptionContainer.exists()).toBeTruthy();
    expect(descriptionContainer.text()).toBe(description);
  });

  it('icon', async () => {
    const iconName = 'icon-name';
    const wrapper = createAlert();
    let iconElement = wrapper.find('.lin-alert-icon');
    expect(iconElement.exists()).toBeFalsy();
    await wrapper.setProps({
      icon: iconName
    });
    iconElement = wrapper.find('.lin-alert-icon');
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.classes()).toContain(iconName);
  });

  it('closable', async () => {
    const wrapper = createAlert();
    let closeElement = wrapper.find('.lin-icon-close');
    expect(closeElement.exists()).toBeFalsy();
    await wrapper.setProps({
      closable: true
    });
    closeElement = wrapper.find('.lin-icon-close');
    expect(closeElement.exists()).toBeTruthy();
  });

  it('type', async () => {
    const typeList = ['success', 'warning', 'info', 'danger'];
    const wrapper = createAlert();
    for (let i = 0; i < typeList; i++) {
      const type = typeList[i];
      await wrapper.setProps({ type });
      const container = wrapper.find('.lin-alert');
      expect(container.classes()).toContain(`lin-alert-${type}`);
    }
  });

  it('effect', async () => {
    const effectList = ['light', 'dark'];
    const wrapper = createAlert();
    for (let i = 0; i < effectList; i++) {
      const effect = effectList[i];
      await wrapper.setProps({ effect });
      const container = wrapper.find('.lin-alert');
      expect(container.classes()).toContain(`lin-alert-${effect}`);
    }
  });

  it('center', async () => {
    const wrapper = createAlert();
    let container = wrapper.find('.lin-alert');
    expect(container.classes()).not.toContain('lin-alert-center');
    await wrapper.setProps({ center: true });
    container = wrapper.find('.lin-alert');
    expect(container.classes()).toContain('lin-alert-center');
  });
});

describe('事件', () => {
  it('click', async () => {
    const wrapper = createAlert({
      propsData: {
        closable: true
      }
    });

    let container = wrapper.find('.lin-alert');
    expect(container.exists()).toBeTruthy();
    const closeElement = wrapper.find('.lin-alert-close');
    await closeElement.trigger('click');
    container = wrapper.find('.lin-alert');
    expect(container.exists()).toBeFalsy();
  });

  it('close', () => {
    const wrapper = createAlert();
    wrapper.vm.afterLeave();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});

describe('插槽', () => {
  it('icon', () => {
    const iconSlot = '<div class="test-icon-slot">iconSlot</div>';
    const wrapper = createAlert({
      slots: {
        icon: iconSlot
      }
    });
    const iconElement = wrapper.find('.test-icon-slot');
    expect(iconElement.exists()).toBeTruthy();
    expect(iconElement.text()).toBe('iconSlot');
  });

  it('title', () => {
    const titleSolt = '<div class="test-title-slot">titleSlot</div>';
    const wrapper = createAlert({
      slots: {
        title: titleSolt
      }
    });
    const titleElement = wrapper.find('.test-title-slot');
    expect(titleElement.exists()).toBeTruthy();
    expect(titleElement.text()).toBe('titleSlot');
  });

  it('description', () => {
    const descriptionSolt =
      '<div class="test-description-slot">descriptionSlot</div>';
    const wrapper = createAlert({
      slots: {
        title: descriptionSolt
      }
    });
    const titleElement = wrapper.find('.test-description-slot');
    expect(titleElement.exists()).toBeTruthy();
    expect(titleElement.text()).toBe('descriptionSlot');
  });
  it('close', () => {
    const closeSolt = '<div class="test-close-slot">closeSolt</div>';
    const wrapper = createAlert({
      slots: {
        title: closeSolt
      }
    });
    const closeElement = wrapper.find('.test-close-slot');
    expect(closeElement.exists()).toBeTruthy();
    expect(closeElement.text()).toBe('closeSolt');
  });
});
