import { mount } from "@vue/test-utils";

import {{componentName}} from "../index.js";

describe("{{componentName}}", () => {
  test("render test", () => {
    const wrapper = mount({{componentName}});
    expect(wrapper.find(".lin-{{name}}").exists()).toBe(true);
  });
});
