import { mount } from "@vue/test-utils";

import { sleep } from "@lin-view-ui/test-utils";

import Backtop from "../index.js";

const _mount = template =>
  mount(
    {
      components: {
        "lin-backtop": Backtop
      },
      template
    },
    { attachTo: document.body }
  );

describe("Backtop", () => {
  test("render", async () => {
    const wrapper = _mount(`
      <div class="target" style="height: 100px; overflow: auto">
        <div style="height: 10000px; width: 100%">
          <lin-backtop target=".target" :visibilityHeight="2000" :right="100" :bottom="200" />
        </div>
      </div>
    `);
    // 一开始是不显示
    expect(wrapper.find(".lin-backtop").exists()).toBe(false);
    // 滚动然后显示
    wrapper.element.scrollTop = 2000;
    await wrapper.trigger("scroll");
    expect(wrapper.find(".lin-backtop").exists()).toBe(true);
    expect(wrapper.find(".lin-backtop").attributes("style")).toBe(
      "right: 100px; bottom: 200px;"
    );
    expect(wrapper.find(".lin-backtop-triangle").exists()).toBe(true);
    // 点击返回顶部
    wrapper.element.scrollTop = 0;
    await wrapper.find(".lin-backtop").trigger("click");
    await wrapper.trigger("scroll");
    // 等待动画执行完毕
    await sleep();
    const backtopComp = wrapper.findComponent(Backtop);
    expect(wrapper.find(".lin-backtop").exists()).toBe(false);
    expect(backtopComp.emitted().click).toBeTruthy();
    expect(backtopComp.emitted().scroll).toBeTruthy();
    expect(backtopComp.emitted().end).toBeTruthy();
    // 销毁
    wrapper.destroy();
  });
  test("init", () => {
    const wrapper = mount(Backtop, { attachTo: document.body });
    expect(wrapper.vm.el).toBe(document.documentElement);
    wrapper.destroy();
  });
  // test("error", () => {
  //   function init() {
  //     mount(Backtop, {
  //       propsData: {
  //         target: "error-target"
  //       },
  //       attachTo: document.body
  //     });
  //   }
  //   expect(() => init()).toThrowError(Error);
  // });
});
