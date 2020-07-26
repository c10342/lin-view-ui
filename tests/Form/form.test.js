import { shallowMount } from "@vue/test-utils";

import Form from "packages/Form";

const creatForm = (obj = {}) => {
  return shallowMount(Form, obj);
};

describe("属性", () => {
  it("labelWidth", () => {
    const wrapper = creatForm({ propsData: { labelWidth: "20px", model: {} } });
    expect(wrapper.vm.labelWidth).toEqual("20px");
  });
  it("model", () => {
    const model = { name: "张三", age: 14 };
    const wrapper = creatForm({ propsData: { model } });
    expect(wrapper.vm.model).toEqual(model);
  });
});
