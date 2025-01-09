# 技术栈

- 组件开发：`vue3`+`typescript`

- 打包构建：`rollup`

- 组件库文档：`vitepress`

# 初始化 package.json

新建一个文件夹，在文件夹的根目录执行如下命令：

```bash
npm initt -y
```

执行完毕后，会在项目的根目录出现`package.json`文件

# 初始化 typescript

1、安装依赖：

```bash
npm i typescript -D
```

2、在项目根目录执行如下命令：

```bash
npx tsc --init
```

命令执行完成后，会在项目的根目录出现`tsconfig.json`文件

3、调整配置

在`tsconfig.json`文件中写入如下内容：

```json
{
  "compilerOptions": {
    // 指定模块解析方式
    "module": "ESNext",
    // 默认不要声明文件
    "declaration": false,
    // 禁止使用any类型
    "noImplicitAny": true,
    // 删除注释
    "removeComments": true,
    // 按照node模块来解析
    "moduleResolution": "node",
    // 支持es6，commonjs模块
    "esModuleInterop": true,
    // 不需要转换jsx
    "jsx": "preserve",
    // 不处理类库
    "noLib": false,
    // 指定编译输出的JavaScript版本
    "target": "ES6",
    "sourceMap": true,
    // 指定编译过程中需要包含的类型定义库
    "lib": ["ESNext", "DOM"],
    // 允许没有导出的模块导入
    "allowSyntheticDefaultImports": true,
    // 装饰器语法
    "experimentalDecorators": true,
    // 区分文件名大小写
    "forceConsistentCasingInFileNames": true,
    // 解析json模块
    "resolveJsonModule": true,
    // 启用严格模式
    "strict": true,
    // 跳过类库检查
    "skipLibCheck": true,
    // 设置解析非相对模块名称的基本目录，相对模块不会受到baseUrl的影响
    "baseUrl": ".",
    // 设置路径别名
    "paths": {
      "@packages/*": ["packages/*"]
    }
  },
  // 排除的文件或者文件夹
  "exclude": ["node_modules", "**/__tests__", "dist/**"]
}
```

# 初始化 vue

1、安装依赖：

```bash
npm i vue -D
```

:::tip 提示
组件库是服务于项目的，所以组件库的`vue`需要依赖于项目中的`vue`。安装在`devDependencies`中是为了让我们能够在开发中使用`vue`
:::

2、在`package.json`文件中写入如下内容：

```json
{
  "peerDependencies": {
    "vue": ">=3.5.13"
  }
}
```

声明使用组件库的项目需要安装的`vue`的最低版本号

# 初始化目录结构
