import { shallowMount } from '@vue/test-utils';

import Image from 'packages/image/index.js';
import { sleep } from '../utils.js';

const imageUrl = 'http://ui.linjiafu.top/img/video-card.4dc5325c.png';
const imageUrl2 = 'http://ui.linjiafu.top/img/video-card.4dc5325c2.png';

const createImage = (obj = {}) => {
  return shallowMount(Image, obj);
};

const createImageWithUrl = (obj = {}) => {
  const { propsData, ...restObj } = obj;
  return shallowMount(Image, {
    propsData: {
      imgUrl: imageUrl,
      ...propsData
    },
    ...restObj
  });
};

const createImageWithArrUrl = (obj = {}) => {
  const { propsData, ...restObj } = obj;
  return shallowMount(Image, {
    propsData: {
      imgUrl: [imageUrl, imageUrl2],
      ...propsData
    },
    ...restObj
  });
};

describe('属性', () => {
  it('imgUrl为String', () => {
    const wrapper = createImage({ propsData: { imgUrl: imageUrl } });
    const image = wrapper.find('img');
    const errorMessage = wrapper.find('.lin-image-error');
    expect(image.exists()).toBeTruthy();
    expect(image.attributes('src')).toBe(imageUrl);
    expect(errorMessage.exists()).toBeFalsy();
  });

  it('imgUrl为Array', () => {
    const wrapper = createImage({ propsData: { imgUrl: [imageUrl] } });
    const image = wrapper.find('img');
    const errorMessage = wrapper.find('.lin-image-error');
    expect(image.exists()).toBeTruthy();
    expect(image.attributes('src')).toBe(imageUrl);
    expect(errorMessage.exists()).toBeFalsy();
  });

  it('imgUrl不存在', () => {
    const wrapper = createImage();
    const image = wrapper.find('img');
    const errorMessage = wrapper.find('.lin-image-error');
    expect(image.exists()).toBeFalsy();
    expect(errorMessage.exists()).toBeTruthy();
  });

  it('imgUrl为空数组', () => {
    const wrapper = createImage({ propsData: { imgUrl: [] } });
    const image = wrapper.find('img');
    const errorMessage = wrapper.find('.lin-image-error');
    expect(image.exists()).toBeFalsy();
    expect(errorMessage.exists()).toBeTruthy();
  });
  it('imgUrl为无效url数组', () => {
    const wrapper = createImage({ propsData: { imgUrl: [''] } });
    expect(wrapper.vm.isError).toBeTruthy();
  });

  it('referrerPolicy', () => {
    const referrerPolicy = '123';
    const wrapper = createImageWithUrl({
      propsData: { referrerPolicy }
    });
    const image = wrapper.find('img');
    expect(image.attributes('referrer-policy')).toEqual(referrerPolicy);
  });

  it('alt', () => {
    const alt = '图片';
    const wrapper = createImageWithUrl({
      propsData: { alt }
    });
    const image = wrapper.find('img');
    expect(image.attributes('alt')).toEqual(alt);
  });

  it('preview', async () => {
    const wrapper = createImageWithUrl({
      propsData: { preview: true }
    });
    const image = wrapper.find('img');
    await image.trigger('click');
    let imageMask = wrapper.find('.lin-image-mask');
    const closeBtn = wrapper.find('.lin-image-close');
    expect(wrapper.vm.showPreview).toBeTruthy();
    expect(imageMask.exists()).toBeTruthy();

    await closeBtn.trigger('click');
    imageMask = wrapper.find('.lin-image-mask');
    expect(imageMask.exists()).toBeFalsy();
  });

  it('clickMask', async () => {
    const wrapper = createImageWithUrl({
      propsData: { clickMask: false, preview: true }
    });
    const image = wrapper.find('img');
    await image.trigger('click');
    let imageMask = wrapper.find('.lin-image-mask');
    expect(imageMask.exists()).toBeTruthy();

    await imageMask.trigger('click');
    imageMask = wrapper.find('.lin-image-mask');
    expect(imageMask.exists()).toBeTruthy();

    await wrapper.setProps({
      clickMask: true
    });
    imageMask = wrapper.find('.lin-image-mask');
    await imageMask.trigger('click');

    imageMask = wrapper.find('.lin-image-mask');
    expect(imageMask.exists()).toBeFalsy();
  });

  it('errorMsg', () => {
    const errorMsg = '图片加载失败';
    const wrapper = createImage({
      propsData: { errorMsg }
    });
    const errorMessage = wrapper.find('.lin-image-error');
    expect(errorMessage.exists()).toBeTruthy();
    expect(errorMessage.text()).toEqual(errorMsg);
  });
});

describe('插槽', () => {
  it('default', () => {
    const wrapper = createImage({
      slots: {
        default: '<span class="test-span">图片加载失败</span>'
      }
    });
    const errorMessage = wrapper.find('.test-span');
    expect(errorMessage.exists()).toBeTruthy();
    expect(errorMessage.text()).toEqual('图片加载失败');
  });
});

describe('事件', () => {
  const loadEvent = document.createEvent('HTMLEvents');
  loadEvent.initEvent('load', false, false);
  const errorEvent = document.createEvent('HTMLEvents');
  errorEvent.initEvent('error', false, false);
  it('success', () => {
    const wrapper = createImageWithUrl();
    const image = wrapper.find('.lin-image-img');
    image.element.dispatchEvent(loadEvent);
    expect(wrapper.emitted().success).toBeTruthy();
  });
  it('Allsuccess', async () => {
    const wrapper = createImageWithArrUrl();
    const image = wrapper.find('.lin-image-img');
    image.element.dispatchEvent(loadEvent);
    expect(wrapper.emitted().success).toBeTruthy();
  });
  it('error', async () => {
    const wrapper = createImageWithUrl();
    const image = wrapper.find('.lin-image-img');
    image.element.dispatchEvent(errorEvent);
    expect(wrapper.emitted().error).toBeTruthy();
  });
  it('Allerror', async () => {
    const wrapper = createImageWithArrUrl();
    const image = wrapper.find('.lin-image-img');
    image.element.dispatchEvent(errorEvent);
    await sleep(500);
    image.element.dispatchEvent(errorEvent);
    expect(wrapper.emitted().error).toBeTruthy();
    expect(wrapper.emitted().AllError).toBeTruthy();
  });
});
