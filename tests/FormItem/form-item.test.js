import { shallowMount } from "@vue/test-utils";

import FormItem from "packages/FormItem";

describe("属性", () => {
  it("label,provide", () => {
    const wrapper = shallowMount(FormItem, {
      propsData: {
        label: "label",
      },
      provide: {
        Form: {
          labelWidth: "20px",
        },
      },
    });
    const label = wrapper.find(".l-form-item-label");
    expect(label.text()).toBe("label");
    expect(label.element.style.width).toBe("20px");
    expect(wrapper.vm.Form.labelWidth).toEqual("20px");
  });
});
