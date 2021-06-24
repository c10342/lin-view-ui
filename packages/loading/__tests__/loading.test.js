import { mount } from "@vue/test-utils";
import Loading from "../index.js";
import Vue, { nextTick } from "vue";
import { sleep } from "@lin-view-ui/test-utils";

function destroyLoadingInstance(loadingInstance) {
  if (!loadingInstance) return;
  loadingInstance.close();
  loadingInstance.$el &&
    loadingInstance.$el.parentNode &&
    loadingInstance.$el.parentNode.removeChild(loadingInstance.$el);
}

Vue.use(Loading);

describe("Loading", () => {
  let loadingInstance;

  afterEach(() => {
    destroyLoadingInstance(loadingInstance);
  });

  test("create directive", async () => {
    const wrapper = mount({
      template: `<div v-loading="loading"></div>`,
      data() {
        return {
          loading: true
        };
      }
    });

    await nextTick();

    const maskWrapper = wrapper.find(".lin-loading-mask");
    expect(maskWrapper.exists()).toBeTruthy();
    wrapper.vm.loading = false;

    await sleep(100);
    expect(wrapper.find(".lin-loading-mask").exists()).toBeFalsy();
  });

  test("unmounted directive", async () => {
    const wrapper1 = mount({
      template: `<div v-if="show" v-loading="loading"></div>`,
      data() {
        return {
          show: true,
          loading: true
        };
      }
    });

    const wrapper2 = mount({
      template: `<div v-if="show" v-loading="loading"></div>`,
      data() {
        return {
          show: true,
          loading: true
        };
      }
    });

    await nextTick();
    const vm1 = wrapper1.vm;
    const vm2 = wrapper2.vm;

    vm1.loading = false;
    vm2.loading = false;

    await nextTick();
    vm1.show = false;
    vm2.show = false;

    await nextTick();
    expect(document.querySelector(".lin-loading-mask")).toBeFalsy();
  });

  test("body directive", async () => {
    const wrapper = mount({
      template: `<div v-loading.body="loading"></div>`,
      data() {
        return {
          loading: true
        };
      }
    });
    await nextTick();
    const mask = document.querySelector(".lin-loading-mask");
    expect(mask.parentNode).toBe(document.body);
    wrapper.vm.loading = false;
    document.body.removeChild(mask);
  });

  test("fullscreen directive", async () => {
    const wrapper = mount({
      template: `<div v-loading.fullscreen="loading"></div>`,
      data() {
        return {
          loading: true
        };
      }
    });
    await nextTick();
    const mask = wrapper.find(".lin-loading-mask");
    expect(mask.classes()).toContain("lin-loading-is-fullscreen");
    wrapper.vm.loading = false;
  });

  test("lock directive", async () => {
    const wrapper = mount({
      template: `<div v-loading.fullscreen.lock="loading"></div>`,
      data() {
        return {
          loading: true
        };
      }
    });
    await nextTick();
    expect(wrapper.classes()).toContain("lin-loading-lock");
    wrapper.vm.loading = false;
  });

  test("text directive", async () => {
    const wrapper = mount({
      template: `<div v-loading="loading" lin-loading-text="loading..."></div>`,
      data() {
        return {
          loading: true
        };
      }
    });
    await nextTick();
    expect(wrapper.find(".lin-loading-text").text()).toEqual("loading...");
  });

  test("create service", async () => {
    loadingInstance = Loading.service.open();
    expect(document.querySelector(".lin-loading-mask")).toBeTruthy();
  });

  test("close service", async () => {
    loadingInstance = Loading.service.open();
    loadingInstance.close();
    expect(loadingInstance.visible).toBeFalsy();
  });

  test("target service", async () => {
    const container = document.createElement("div");
    container.className = "loading-container";
    document.body.appendChild(container);

    loadingInstance = Loading.service.open({
      target: ".loading-container",
      fullscreen: false,
      time: 1000
    });
    const mask = container.querySelector(".lin-loading-mask");
    expect(mask).toBeTruthy();
    expect(mask.parentNode).toEqual(container);
    expect(
      container.classList.contains("lin-loading-position-relative")
    ).toBeTruthy();
    Loading.service.close();
    // loadingInstance.close();
    // await nextTick()
    document.body.removeChild(container);
  });

  test("body service", async () => {
    const container = document.createElement("div");
    container.className = "loading-container";
    document.body.appendChild(container);

    loadingInstance = Loading.service.open();
    const mask = document.querySelector(".lin-loading-mask");
    expect(mask).toBeTruthy();
    expect(mask.parentNode).toBe(document.body);
    document.body.removeChild(container);
  });

  test("lock service", async () => {
    loadingInstance = Loading.service.open({ lock: true });
    expect(document.body.classList.contains("lin-loading-lock")).toBeTruthy();
  });

  test("text service", async () => {
    loadingInstance = Loading.service.open({ text: "Loading..." });
    await nextTick();
    const text = document.querySelector(".lin-loading-text");
    expect(text).toBeTruthy();
    expect(text.textContent).toEqual("Loading...");
  });
});
