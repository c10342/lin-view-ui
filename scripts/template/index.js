const fs = require("fs");

const path = require("path");

const handlebars = require("handlebars");

const {
  toHump,
  resolvePackages,
  mkdirsSync,
  resolve,
  resolveRoot
} = require("./utils");

function writeIndexTpl(name) {
  const params = {
    name,
    componentName: toHump(name)
  };
  const tplStr = fs.readFileSync(
    path.resolve(__dirname, "./tpl/index.tpl"),
    "utf-8"
  );
  const result = handlebars.compile(tplStr)(params);
  const dir = resolvePackages(name);
  mkdirsSync(dir);
  fs.writeFileSync(resolve(dir, "index.ts"), result);
}

function writeVueTpl(name) {
  const params = {
    name,
    componentName: toHump(name)
  };
  const tplStr = fs.readFileSync(
    path.resolve(__dirname, "./tpl/vue.tpl"),
    "utf-8"
  );
  const dir = resolvePackages(`./${name}/src`);
  mkdirsSync(dir);
  const result = handlebars.compile(tplStr)(params);
  fs.writeFileSync(resolve(dir, "index.vue"), result);
}

function writeScssTpl(name) {
  const params = {
    name,
    componentName: toHump(name)
  };
  const tplStr = fs.readFileSync(
    path.resolve(__dirname, "./tpl/scss.tpl"),
    "utf-8"
  );
  const dir = resolvePackages(`./theme-chalk/src`);
  mkdirsSync(dir);
  const result = handlebars.compile(tplStr)(params);
  fs.writeFileSync(resolve(dir, `${name}.scss`), result);
  fs.appendFileSync(
    resolvePackages("./theme-chalk/index.scss"),
    `@import "./src/${name}.scss";`
  );
}

function createDocsExamplesDir(name) {
  const dir = resolveRoot(`./docs/examples/${name}`);
  mkdirsSync(dir);
  fs.writeFileSync(resolve(dir, "base.vue"), "");
}

const writeTpl = () => {
  const argv = process.argv;

  const name = argv[2];
  // 检查有没有输入组件名
  if (!name) {
    console.log("请输入组件名");
    return;
  }
  // 组件存放路径
  const componentDir = resolvePackages(name);

  // 检查输入的组件名是否已经存在了
  if (fs.existsSync(componentDir)) {
    console.log(`${name}组件已经存在了`);
    return;
  }

  writeIndexTpl(name);
  writeVueTpl(name);
  writeScssTpl(name);
  createDocsExamplesDir(name);
  console.log(`${name}模板创建成功`);
};

writeTpl();
