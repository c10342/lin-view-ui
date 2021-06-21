const chalk = require("chalk");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "../packages");

const themeChalkSrc = path.resolve(packageRoot, "./theme-chalk/src");

const argv = process.argv;

const componentName = argv[2];

function toHump(name) {
  const reg = /-(\w)/g;
  if (name.match(reg)) {
    name = name.replace(reg, function(all, letter) {
      return letter.toUpperCase();
    });
  }
  name = name.replace(/^(\w)/, function(all, letter) {
    return letter.toUpperCase();
  });
  return name;
}

// 检查有没有输入组件名
if (!componentName) {
  console.log(chalk.blueBright("请输入组件名"));
  return;
}

const compomentPath = path.resolve(packageRoot, componentName);

// 检查输入的组件名是否已经存在了
if (fs.existsSync(compomentPath)) {
  console.log(chalk.blueBright(`${componentName}组件已经存在了`));
  return;
}

// // 创建组件根目录
fs.mkdirSync(compomentPath);
// // 创建src目录
const compomentSrcPath = path.resolve(compomentPath, "src");
fs.mkdirSync(compomentSrcPath);

function writePakcageTpl() {
  const parmas = {
    name: componentName,
  };
  const tplStr = fs.readFileSync(
    path.resolve(__dirname, "./template/package.tpl"),
    "utf-8"
  );
  const package = handlebars.compile(tplStr)(parmas);
  fs.writeFileSync(path.resolve(compomentPath, "package.json"), package);
}

function writeIndexTpl() {
  const parmas = {
    name: componentName,
    importName: toHump(componentName),
  };
  const tplStr = fs.readFileSync(
    path.resolve(__dirname, "./template/index.tpl"),
    "utf-8"
  );
  const indexStr = handlebars.compile(tplStr)(parmas);
  fs.writeFileSync(path.resolve(compomentPath, "index.js"), indexStr);
}

function writeVueTpl() {
  const parmas = {
    compName: `Lin${toHump(componentName)}`,
  };
  const tplStr = fs.readFileSync(
    path.resolve(__dirname, "./template/vue.tpl"),
    "utf-8"
  );
  const vueStr = handlebars.compile(tplStr)(parmas);
  fs.writeFileSync(
    path.resolve(compomentSrcPath, `${componentName}.vue`),
    vueStr
  );
}

function writeScssTpl() {
  const tplStr = fs.readFileSync(
    path.resolve(__dirname, "./template/scss.tpl"),
    "utf-8"
  );
  fs.writeFileSync(
    path.resolve(themeChalkSrc, `${componentName}.scss`),
    tplStr
  );
  fs.appendFileSync(
    path.resolve(themeChalkSrc, `index.scss`),
    `\n@import './${componentName}.scss';`
  );
}

function writeReadmeTpl() {
  const parmas = {
    name: componentName,
    componentName: toHump(componentName),
  };
  const tplStr = fs.readFileSync(
    path.resolve(__dirname, "./template/readme.tpl"),
    "utf-8"
  );
  const readmeStr = handlebars.compile(tplStr)(parmas);
  fs.writeFileSync(path.resolve(compomentPath, "README.md"), readmeStr);
}

function writeTpl() {
  writePakcageTpl();
  writeIndexTpl();
  writeVueTpl();
  writeScssTpl();
  writeReadmeTpl()
  console.log(chalk.blueBright(`${componentName}模板创建成功`));
}

writeTpl();
