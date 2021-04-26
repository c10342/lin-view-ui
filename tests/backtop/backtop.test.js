import { shallowMount } from '@vue/test-utils';

import Backtop from 'packages/backtop/index.js';

import { sleep, transitionStub } from '../utils.js';

const createBacktop = (options = {}) => shallowMount(Backtop, options);

// mock定时器
jest.useFakeTimers();

describe('属性', () => {
  let wrapper;
  beforeEach(() => {
    if (wrapper) {
      wrapper.destroy();
      wrapper = null;
    }
  });
  it('right,bottom', () => {
    wrapper = createBacktop({
      propsData: {
        right: 100,
        bottom: 200
      },
      data() {
        return {
          visible: true
        };
      }
    });
    const container = wrapper.find('.lin-backtop');
    expect(container.attributes('style').replace(/\s+/g, '')).toContain(
      'right:100px;bottom:200px'
    );
  });

  it('target', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'jest-div');
    document.body.append(div);
    wrapper = createBacktop({
      propsData: {
        target: '#jest-div'
      }
    });
    expect(wrapper.vm.el).toEqual(div);
    expect(wrapper.vm.container).toEqual(div);
  });

  it('visibilityHeight', async () => {
    // 重写  scroll  事件
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('scroll', false, false);
    wrapper = createBacktop({
      stubs: {
        transition: transitionStub()
      },
      propsData: {
        visibilityHeight: 100
      }
    });
    expect(wrapper.html()).toBeFalsy();

    const el = document.documentElement || document.body;

    el.scrollTop = 2000;
    // 触发自定义事件
    document.dispatchEvent(evt);

    await sleep();

    expect(wrapper.html()).toBeTruthy();
  });
});

describe('事件', () => {
  let wrapper;
  beforeEach(() => {
    if (wrapper) {
      wrapper.destroy();
      wrapper = null;
    }
  });
  it('click', async () => {
    wrapper = createBacktop({
      data() {
        return {
          visible: true
        };
      }
    });
    const div = wrapper.find('.lin-backtop');

    await div.trigger('click');
    expect(wrapper.emitted().click).toBeTruthy();
  });
  it('scroll,end', async () => {
    wrapper = createBacktop({
      data() {
        return {
          visible: true
        };
      }
    });
    const el = document.documentElement || document.body;
    el.scrollTop = 500;
    const div = wrapper.find('.lin-backtop');

    await div.trigger('click');
    // 等待requestAnimationFrame函数执行完毕
    await sleep(500);

    expect(wrapper.emitted().scroll).toBeTruthy();
    expect(wrapper.emitted().end).toBeTruthy();
  });
});

describe('插槽', () => {
  let wrapper;
  beforeEach(() => {
    if (wrapper) {
      wrapper.destroy();
      wrapper = null;
    }
  });
  it('default', () => {
    wrapper = createBacktop({
      data() {
        return {
          visible: true
        };
      },
      slots: {
        default: '<span>defaultSlot</span>'
      }
    });
    expect(wrapper.text()).toBe('defaultSlot');
  });
});

describe('函数', () => {
  let wrapper;
  beforeEach(() => {
    if (wrapper) {
      wrapper.destroy();
      wrapper = null;
    }
  });

  it('init', () => {
    wrapper = createBacktop();
    expect(wrapper.vm.container).toEqual(document);
    expect(wrapper.vm.el).toEqual(document.documentElement || document.body);
    wrapper.setProps({
      target: 'demo-error'
    });
    // 异常断言
    expect(() => wrapper.vm.init()).toThrowError(Error);
  });
  it('scrollToTop', async () => {
    // 清除requestAnimationFrame，让代码运行另一条分支
    global.window.requestAnimationFrame = null;
    const el = document.documentElement || document.body;
    el.scrollTop = 500;
    wrapper = createBacktop({
      data() {
        return {
          visible: true
        };
      }
    });
    wrapper.vm.scrollToTop();
    // 运行所有定时器
    jest.runAllTimers();

    await sleep(1000);

    expect(wrapper.emitted().scroll).toBeTruthy();
    expect(wrapper.emitted().end).toBeTruthy();
  });
});
