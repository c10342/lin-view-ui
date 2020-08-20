import { shallowMount } from "@vue/test-utils";

import Image from "packages/Image";

const imageUrl = "http://ui.linjiafu.top/img/video-card.4dc5325c.png";

const createImage = (obj = {}) => {
  return shallowMount(Image, obj);
};

const createImageWithUrl = (obj = {}) => {
  const { propsData, ...restObj } = obj;
  return shallowMount(Image, {
    propsData: {
      imgUrl: imageUrl,
      ...propsData,
    },
    ...restObj,
  });
};

describe("属性", () => {
  it("imgUrl为String", () => {
    const wrapper = createImage({ propsData: { imgUrl: imageUrl } });
    const image = wrapper.find("img");
    const errorMessage = wrapper.find(".lin-image-error");
    expect(image.exists()).toBeTruthy();
    expect(image.attributes("src")).toBe(imageUrl);
    expect(errorMessage.exists()).toBeFalsy();
  });

  it("imgUrl为Array", () => {
    const wrapper = createImage({ propsData: { imgUrl: [imageUrl] } });
    const image = wrapper.find("img");
    const errorMessage = wrapper.find(".lin-image-error");
    expect(image.exists()).toBeTruthy();
    expect(image.attributes("src")).toBe(imageUrl);
    expect(errorMessage.exists()).toBeFalsy();
  });

  it("imgUrl不存在", () => {
    const wrapper = createImage();
    const image = wrapper.find("img");
    const errorMessage = wrapper.find(".lin-image-error");
    expect(image.exists()).toBeFalsy();
    expect(errorMessage.exists()).toBeTruthy();
  });

  it("imgUrl为空数组", () => {
    const wrapper = createImage({ propsData: { imgUrl: [] } });
    const image = wrapper.find("img");
    const errorMessage = wrapper.find(".lin-image-error");
    expect(image.exists()).toBeFalsy();
    expect(errorMessage.exists()).toBeTruthy();
  });

  it("referrerPolicy", () => {
    const referrerPolicy = "123";
    const wrapper = createImageWithUrl({
      propsData: { referrerPolicy },
    });
    const image = wrapper.find("img");
    expect(image.attributes("referrer-policy")).toEqual(referrerPolicy);
  });

  it("alt", () => {
    const alt = "图片";
    const wrapper = createImageWithUrl({
      propsData: { alt },
    });
    const image = wrapper.find("img");
    expect(image.attributes("alt")).toEqual(alt);
  });

  it("preview", async () => {
    const wrapper = createImageWithUrl({
      propsData: { preview: true },
    });
    const image = wrapper.find("img");
    await image.trigger("click");
    let imageMask = wrapper.find(".lin-image-mask");
    const closeBtn = wrapper.find(".lin-image-close");
    expect(wrapper.vm.showPreview).toBeTruthy();
    expect(imageMask.exists()).toBeTruthy();

    await closeBtn.trigger("click");
    imageMask = wrapper.find(".lin-image-mask");
    expect(imageMask.exists()).toBeFalsy();
  });

  it("clickMask", async () => {
    const wrapper = createImageWithUrl({
      propsData: { clickMask: false, preview: true },
    });
    const image = wrapper.find("img");
    await image.trigger("click");
    let imageMask = wrapper.find(".lin-image-mask");
    expect(imageMask.exists()).toBeTruthy();

    await imageMask.trigger("click");
    imageMask = wrapper.find(".lin-image-mask");
    expect(imageMask.exists()).toBeTruthy();
  });

  it("errorMsg", () => {
    const errorMsg = "图片加载失败";
    const wrapper = createImage({
      propsData: { errorMsg },
    });
    const errorMessage = wrapper.find(".lin-image-error");
    expect(errorMessage.exists()).toBeTruthy();
    expect(errorMessage.text()).toEqual(errorMsg);
  });
});

describe("插槽", () => {
  it("default", () => {
    const wrapper = createImage({
      slots: {
        default: '<span class="test-span">图片加载失败</span>',
      },
    });
    const errorMessage = wrapper.find(".test-span");
    expect(errorMessage.exists()).toBeTruthy();
    expect(errorMessage.text()).toEqual("图片加载失败");
  });
});

// describe("事件", () => {
//   const LOAD_FAILURE_SRC = "LOAD_FAILURE_SRC";
//   const LOAD_SUCCESS_SRC = "LOAD_SUCCESS_SRC";
//   beforeAll(() => {
//     //模拟图像.prototype.src调用onload或onerror
//     //回调,具体取决于传递给它的src
//     Object.defineProperty(global.Image.prototype, "src", {
//       // Define属性setter
//       set(src) {
//         if (src === imageUrl) {
//           // Call使用setTimeout模拟异步加载
//           setTimeout(() => this.onerror(new Error("mocked error")));
//         } else if (src === imageUrl) {
//           setTimeout(() => this.onload());
//         }
//       },
//     });
//   });
//   it("success", () => {
//     const wrapper = createImageWithUrl();
//     expect(wrapper.emitted().success).toBeTruthy();
//   });
//   it("error", () => {
//     const wrapper = createImageWithUrl();
//     expect(wrapper.emitted().error).toBeTruthy();
//   });
// });
