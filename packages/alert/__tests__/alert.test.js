
import { mount } from '@vue/test-utils';

import Alert from '../index.js';

const title = 'this is title'

const description = 'this is description'

describe('Alert', () => {
  test('render test & class', () => {
    const wrapper = mount(Alert, {
      propsData: {
        title: title
      },
    })
    expect(wrapper.find('.lin-alert-title').text()).toEqual(title)
    expect(wrapper.find('.lin-alert').classes()).toContain('lin-alert-success')
  })

  test('type', () => {
    const wrapper = mount(Alert, {
      propsData: {
        title: title,
        type: 'warning',
      },
    })
    expect(wrapper.find('.lin-alert').classes()).toContain('lin-alert-warning')
  })

  test('description', () => {
    const wrapper = mount(Alert, {
      propsData: {
        title: title,
        description: description,
      },
    })
    expect(wrapper.find('.lin-alert-description').text()).toEqual(description)
  })

  test('effect', () => {
    const wrapper = mount(Alert, {
      propsData: {
        title:title,
        effect: 'dark',
      },
    })
    expect(wrapper.find('.lin-alert').classes()).toContain('lin-alert-dark')
  })

  test('title slot', () => {
    const wrapper = mount(Alert, {
      slots: {
        title: title,
      },
    })
    expect(wrapper.find('.lin-alert-content').text()).toContain(title)
  })

  test('closable', async () => {
    const wrapper = mount(Alert, {
      propsData: {
        closable: true,
      },
    })

    const closeBtn = wrapper.find('.lin-alert-close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.vm.show).toBe(false)
    wrapper.vm.afterLeave()
    expect(wrapper.emitted().close).toBeTruthy()
  })
})