import LoadingRaw from 'packages/loading/index.js';

import LoadingConstruct from 'packages/loading/src/construct.js';

import { createVue, destroyVM, sleep } from '../utils.js';

import { openLoading, closeLoading } from 'packages/loading/src/directive.js';

const loadingSerVice = LoadingRaw.service;

beforeEach(() => {
  jest.resetModules();
});

describe('service', () => {
  let loadingInstance;
  afterEach(() => {
    loadingSerVice.close();
    if (loadingInstance) {
      loadingInstance.$el &&
        loadingInstance.$el.parentNode &&
        loadingInstance.$el.parentNode.removeChild(loadingInstance.$el);
    }
  });
  it('create', async () => {
    loadingInstance = loadingSerVice.open({ time: 500 });

    expect(document.querySelector('.lin-loading-mask')).toBeTruthy();

    await sleep(700);

    expect(document.querySelector('.lin-loading-mask')).toBeFalsy();
  });
  it('close', async () => {
    loadingInstance = loadingSerVice.open({
      time: 2000,
      fullscreen: false,
      lock: true
    });

    loadingInstance = loadingSerVice.open();

    const mask = document.querySelector('.lin-loading-mask');

    expect(mask).toBeTruthy();

    await sleep(500);

    loadingSerVice.close();

    await sleep(500);

    expect(document.querySelector('.lin-loading-mask')).toBeFalsy();
  });

  it('scroll', async () => {
    loadingInstance = loadingSerVice.open({ fullscreen: false, lock: false });

    const mask = document.querySelector('.lin-loading-mask');

    expect(mask).toBeTruthy();

    window.pageYOffset = 20;

    window.dispatchEvent(new Event('scroll'));

    expect(loadingInstance.$el.style.marginTop).toBe('20px');

    loadingSerVice.close();

    loadingInstance.$emit('after-leave');
  });

  it('LoadingConstruct', () => {
    const vm = new LoadingConstruct();

    vm.open();

    expect(vm.$el).toBeFalsy();
  });
});

describe('directive', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('bind', async () => {
    vm = createVue({
      template: `
      <div v-loading="loading"></div>
    `,

      data() {
        return {
          loading: false
        };
      }
    });
    let mask = vm.$el.querySelector('.lin-loading-mask');
    expect(mask).toBeFalsy();

    vm.loading = true;
    await sleep(1000);
    mask = vm.$el.querySelector('.lin-loading-mask');
    expect(mask).toBeTruthy();

    vm.loading = false;
    await sleep(1000);
    expect(mask.style.display).toBe('none');
  });

  it('body', () => {
    vm = createVue(
      {
        template: `
      <div v-loading.body="loading"></div>
    `,

        data() {
          return {
            loading: true
          };
        }
      },
      true
    );
    const mask = document.querySelector('.lin-loading-mask');
    expect(mask.parentNode).toEqual(document.body);
    vm.loading = false;
    // 因为是挂在到body上面的，所以要移除，否则可能会影响其他的
    document.body.removeChild(mask);
    document.body.removeChild(vm.$el);
  });

  it('fullscreen', () => {
    vm = createVue(
      {
        template: `
      <div v-loading.fullscreen="loading"></div>
    `,

        data() {
          return {
            loading: true
          };
        }
      },
      true
    );
    const mask = vm.$el.querySelector('.lin-loading-mask');
    expect(mask.classList.contains('lin-loading-is-fullscreen')).toBeTruthy();
    vm.loading = false;
  });

  it('lock', () => {
    vm = createVue(
      {
        template: `
      <div v-loading.fullscreen.lock="loading"></div>
    `,

        data() {
          return {
            loading: true
          };
        }
      },
      true
    );
    expect(vm.$el.classList.contains('lin-loading-lock')).toBeTruthy();
    vm.loading = false;
  });

  it('text', () => {
    vm = createVue(
      {
        template: `
      <div v-loading="loading" lin-loading-text="拼命加载中"></div>
    `,

        data() {
          return {
            loading: true
          };
        }
      },
      true
    );
    const text = vm.$el.querySelector('.lin-loading-text');
    expect(text).toBeTruthy();
    expect(text.innerHTML).toMatch('拼命加载中');
  });
  it('el no defind', () => {
    expect(openLoading()).toBeFalsy();
    expect(closeLoading()).toBeFalsy();
  });
});
