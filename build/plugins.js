const { babel } = require("@rollup/plugin-babel");

const extensions = [".ts", ".js", ".tsx", ".jsx"];

const babelPlugin = () => {
  return babel({ babelHelpers: "bundled", extensions });
};

module.exports = {
  babelPlugin
};
