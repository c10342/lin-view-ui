# 运行开发环境

```bash
npm run dev
```

# 运行组件库文档

```bash
npm run docs:dev
```

# 打包组件库文档

```bash
npm run docs:build
```

# 打包组件库

```bash
npm run build
```

# 执行单元测试

```bash
npm run test
```

# 生成测试报告

```bash
npm run coverage
```

# 开发指南

以新增一个`button`组件为例：

## 新增组件目录

在`packages/components`文件夹下新增如下目录：

```
|- components
|   |- button
|       |- __tests__
|           |- button.test.ts         # 组件单元测试
|   |- src                            # 编写组件代码目录
|       |- button.ts                  # 定义组件所需要的属性、事件、以及ts类型
|       |- button.vue                 # 开发组件
|   |- index.ts                       # 统一导出组件的所有东西
```

## 定义组件的属性和事件类型

`packages\components\button\src\button.ts`

```typescript
import { ExtractPropTypes, PropType } from "vue";

// 原生 button type 属性
export type ButtonNativeType = "button" | "submit" | "reset";

// 按钮属性
export const buttonProps = {
  //   原生 type 属性
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: "button"
  }
  // ...
} as const; // 只读

// 按钮事件
export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent
  // ...
};

// 按钮属性 ts 类型
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

// 按钮事件 ts 类型
export type ButtonEmits = typeof buttonEmits;
```

## 定义组件的模板文件

`packages\components\button\src\button.vue`

```vue
<template>
  <button :nativeType="nativeType" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { buttonEmits, buttonProps } from "./button";

// 定义组件名称，必须的定义
defineOptions({ name: "ZButton" });
// 定义组件事件
const emits = defineEmits(buttonEmits);
// 定义组件属性
defineProps(buttonProps);

const onClick = (e: MouseEvent) => {
  emits("click", e);
};
</script>
```

## 统一导出组件的所有东西

`packages\components\button\index.ts`

```typescript
import { withInstall } from "@packages/utils";
import _Button from "./src/button.vue";

const Button = withInstall(_Button);

// 可以通过app.use使用，也可以通过单独import来使用
export default Button;

export * from "./src/button";
```

## components 入口文件导出

`packages\components\index.ts`

```typescript
export { default as ZButton } from "./button";

export * from "./button";
```

## 全局入口文件导出

`packages\index.ts`

```typescript
import { ZButton } from "./components";

const components = {
  ZButton
  // ...
};

// ...
```

## 定义全局类型声明文件

`global.d.ts`

```typescript
declare module "vue" {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ZButton: (typeof import("z-ui"))["ZButton"];
  }
}

export {};
```

## 测试开发代码

在`play\pages`中新建一个`button.vue`文件，在该文件内，测试编写的组件功能

## 编写组件文档

在`docs\components\basic`中新建`button.md`文件，如下：

```md
# Button 按钮

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

:::preview
demo-preview=../../examples/basic/button/base.vue
:::
```

在`docs\examples\basic\button`中新建`base.vue`文件，编写demo示例代码，如下：

```vue
<template>
  <div>
    <z-button>button</z-button>
  </div>
</template>

<script setup lang="ts">
// todo
</script>

<style lang="scss" scoped>
// todo
</style>
```

在`docs\.vitepress\config.mts`文件中添加菜单配置，如下：

```typescript
export default defineConfig({
  themeConfig: {
    sidebar: {
      // 组件菜单
      "/components/": [
        {
          text: "Basic 基础组件",
          items: [
            // 添加如下内容
            { text: "Button 按钮", link: "/components/basic/button.md" }
            // ...
          ]
        }
      ]
    }
  }
});
```

## 编写测试用例

`packages\components\button\__tests__\button.test.ts`

```typescript
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
```
