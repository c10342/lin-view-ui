import { shallowMount } from '@vue/test-utils';

import Form from 'packages/form/index.js';

import { createVue } from '../utils.js';

const creatForm = (obj = {}) => {
  return shallowMount(Form, obj);
};

describe('属性', () => {
  it('labelWidth', () => {
    const wrapper = creatForm({ propsData: { labelWidth: '20px', model: {} } });
    expect(wrapper.vm.labelWidth).toEqual('20px');
  });
  it('model', () => {
    const model = { name: '张三', age: 14 };
    const wrapper = creatForm({ propsData: { model } });
    expect(wrapper.vm.model).toEqual(model);
  });
});

describe('插槽', () => {
  it('default', () => {
    const html = '<span>你好</span>';
    const wrapper = creatForm({
      propsData: { model: {} },
      slots: {
        default: html
      }
    });
    expect(wrapper.find('.lin-form').text()).toEqual('你好');
  });
});

describe('组合', () => {
  it('表单校验', async () => {
    const vm = createVue({
      template: `
      <lin-form :model="form1" :rules="rules" ref="loginForm">
      <lin-form-item labelWidth='20px' ref='formitem' label="用户名" prop="userName">
        <lin-input v-model="form1.userName" placeholder="请输入用户名" />
      </lin-form-item>
      <lin-form-item ref='ageFormItem'>
        <lin-input v-model="form1.age" placeholder="请输入年龄" />
      </lin-form-item>
    </lin-form>
      `,
      data() {
        return {
          form1: {
            userName: '',
            age: ''
          },
          rules: {
            userName: [{ required: true, message: '请输入用户名' }]
          }
        };
      },
      methods: {
        validate() {
          return new Promise((resolve) => {
            this.$refs.loginForm.validate((valid) => {
              resolve(valid);
            });
          });
        },
        resetForm() {
          this.$refs.loginForm.clearValidate();
        }
      }
    });
    // 校验表单
    let result = await vm.validate();
    const formitem = vm.$refs.formitem;
    const message = formitem.$el.querySelector('.lin-form-item-errormsg');
    expect(result).toBe(false);
    expect(message).toBeTruthy();
    expect(message.innerHTML).toMatch('请输入用户名');
    // 清空检验
    vm.resetForm();
    expect(formitem.errorMsg).toBe('');
    // 输入值
    vm.form1.userName = '张三';
    // 检验表单
    result = await vm.validate();
    expect(result).toBe(true);

    formitem.validate = function () {
      return new Promise((resolve, reject) => {
        reject(new Error('false'));
      });
    };
    result = await vm.validate();
    expect(result).toBe(false);

    const ageFormItem = vm.$refs.ageFormItem;
    expect(ageFormItem.validate()).toBeFalsy();
    expect(ageFormItem.itemLabelWidth).toBe(0);
  });
});
