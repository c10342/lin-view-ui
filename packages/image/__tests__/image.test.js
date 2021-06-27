import { expect, describe, test } from "@jest/globals";

import { mount } from "@vue/test-utils";

import { IMAGE_SUCCESS, IMAGE_FAIL } from "@lin-view-ui/test-utils";

import Image from "../index.js";

describe("Image", () => {
  test("render test", () => {
    const wrapper = mount(Image);
    expect(wrapper.find(".lin-image").exists()).toBe(true);
  });

  test("load success", async () => {
    const wrapper = mount(Image, {
      propsData: {
        imgUrl: IMAGE_SUCCESS
      }
    });
    const image = wrapper.find(".lin-image-img");
    await image.trigger("load");
    expect(image.exists()).toBe(true);
    expect(wrapper.find(".lin-image-error").exists()).toBe(false);
    expect(wrapper.emitted().success).toBeTruthy();
  });

  test("load fail", async () => {
    const wrapper = mount(Image, {
      propsData: {
        imgUrl: IMAGE_FAIL
      }
    });
    await wrapper.find(".lin-image-img").trigger("error");
    expect(wrapper.find(".lin-image-img").exists()).toBe(false);
    expect(wrapper.find(".lin-image-error").exists()).toBe(true);
    expect(wrapper.emitted().error).toBeTruthy();
  });

  test("load array imageurl success", async () => {
    const wrapper = mount(Image, {
      propsData: {
        imgUrl: [IMAGE_FAIL, IMAGE_SUCCESS]
      }
    });
    await wrapper.find(".lin-image-img").trigger("error");
    expect(wrapper.emitted().error).toBeTruthy();
    await wrapper.find(".lin-image-img").trigger("load");
    expect(wrapper.find(".lin-image-img").exists()).toBeTruthy();
    expect(wrapper.emitted().success).toBeTruthy();
  });

  test("load array imageurl error", async () => {
    const wrapper = mount(Image, {
      propsData: {
        imgUrl: ["", IMAGE_FAIL, IMAGE_FAIL, ""]
      }
    });
    await wrapper.find(".lin-image-img").trigger("error");
    await wrapper.find(".lin-image-img").trigger("error");

    expect(wrapper.find(".lin-image-img").exists()).toBeFalsy();
    expect(wrapper.emitted().error.length).toBe(2);
  });

  test("preview image", async () => {
    const wrapper = mount(Image, {
      propsData: {
        imgUrl: IMAGE_SUCCESS,
        preview: true
      }
    });

    await wrapper.find(".lin-image-img").trigger("click");

    expect(wrapper.find(".lin-image-mask").exists()).toBeTruthy();

    await wrapper.find(".lin-image-mask").trigger("click");

    expect(wrapper.find(".lin-image-mask").exists()).toBeFalsy();
  });
});
