const { babel } = require("@rollup/plugin-babel");

const vue = require("rollup-plugin-vue");

const DefineOptions = require("unplugin-vue-define-options/rollup");

const extensions = [".ts", ".js", ".tsx", ".jsx"];

const babelPlugin = () => {
  return babel({ babelHelpers: "bundled", extensions });
};

const vuePlugin = () => {
  return [DefineOptions(), vue()];
};

module.exports = {
  babelPlugin,
  vuePlugin
};
