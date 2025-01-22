import { expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import ZButton from "../index";

test("renders slot", async () => {
  const wrapper = mount(ZButton, {
    slots: {
      default: "123"
    }
  });

  // 断言组件渲染出的文本
  expect(wrapper.text()).toContain("123");
});
