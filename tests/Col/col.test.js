import { shallowMount } from '@vue/test-utils';

import Col from 'packages/Col/index.js';

const createCol = (obj = {}) => {
  return shallowMount(Col, obj);
};

describe('属性', () => {
  it('span', () => {
    const wrapper = createCol({
      propsData: {
        span: 24
      }
    });
    const div = wrapper.find('.lin-col.lin-col-24');
    expect(div.exists()).toBeTruthy();
  });
  it('tag', () => {
    const wrapper = createCol({
      propsData: {
        tag: 'span'
      }
    });
    const span = wrapper.find('span.lin-col');
    expect(span.exists()).toBeTruthy();
  });
  it('offset,pull,push', () => {
    const value = 5;
    ['offset', 'pull', 'push'].forEach((key) => {
      const wrapper = createCol({
        propsData: {
          [key]: value
        }
      });
      const div = wrapper.find(`.lin-col.lin-col-${key}-${value}`);
      expect(div.exists()).toBeTruthy();
    });
  });
  it('xs,sm,md,lg', () => {
    const value = 5;
    ['xs', 'sm', 'md', 'lg'].forEach((key) => {
      const wrapper = createCol({
        propsData: {
          [key]: value
        }
      });
      const div = wrapper.find(`.lin-col.lin-col-${key}-${value}`);
      expect(div.exists()).toBeTruthy();
    });

    ['xs', 'sm', 'md', 'lg'].forEach((key) => {
      const wrapper = createCol({
        propsData: {
          [key]: {
            span: value,
            offset: value,
            pull: value,
            push: value
          }
        }
      });
      const div = wrapper.find('.lin-col');
      expect(div.classes()).toContain(`lin-col-${key}-${value}`);
      expect(div.classes()).toContain(`lin-col-${key}-offset-${value}`);
      expect(div.classes()).toContain(`lin-col-${key}-pull-${value}`);
      expect(div.classes()).toContain(`lin-col-${key}-push-${value}`);
    });
  });
});

describe('插槽', () => {
  it('default', () => {
    const wrapper = createCol({
      slots: {
        default: "<div id='default'>插槽</div>"
      }
    });
    const div = wrapper.find('#default');
    expect(div.exists()).toBeTruthy();
  });
});
