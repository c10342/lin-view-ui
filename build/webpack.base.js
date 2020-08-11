const utils = require("./utils");

const MarkdownItContainer = require("markdown-it-container");

const vueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function() {
      return '<table class="table">';
    };
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(
      MarkdownIt.renderer.rules.fence
    );

    // ```html `` 给这种样式加个class hljs
    //  但是markdown-it 有个bug fence整合attr的时候直接加载class数组上而不是class的值上
    //  markdown-it\lib\renderer.js 71行 这么修改可以修复bug
    //  tmpAttrs[i] += ' ' + options.langPrefix + langName; --> tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    // const fence = MarkdownIt.renderer.rules.fence
    // MarkdownIt.renderer.rules.fence = function(...args){
    //   args[0][args[1]].attrJoin('class', 'hljs')
    //   var a = fence(...args)
    //   return a
    // }

    // ```code`` 给这种样式加个class code_inline
    const code_inline = MarkdownIt.renderer.rules.code_inline;
    MarkdownIt.renderer.rules.code_inline = function(...args) {
      args[0][args[1]].attrJoin("class", "code_inline");
      return code_inline(...args);
    };
    return source;
  },
  use: [
    [
      MarkdownItContainer,
      "demo",
      {
        validate: (params) => params.trim().match(/^demo\s*(.*)$/),
        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

          if (tokens[idx].nesting === 1) {
            var desc = tokens[idx + 2].content;
            const html = utils.convertHtml(
              utils.striptags(tokens[idx + 1].content, "script")
            );
            // 移除描述，防止被添加到代码块
            tokens[idx + 2].children = [];

            return `<demo-block>
                          <div slot="desc">${html}</div>
                          <div slot="highlight">`;
          }
          return "</div></demo-block>\n";
        },
      },
    ],
  ],
};

const handleMD = (config) => {
  config.module
    .rule("md")
    .test(/\.md/)
    .use("vue-loader")
    .loader("vue-loader")
    .end()
    .use("vue-markdown-loader")
    .loader("vue-markdown-loader/lib/markdown-compiler")
    .options({
      raw: true,
      ...vueMarkdown,
    });
};

const handleJs = (config) => {
  // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
  config.module
    .rule("js")
    .include.add(utils.resolve("packages"))
    .end()
    .include.add(utils.resolve("examples"))
    .end()
    .include.add(utils.resolve("docs"))
    .end()
    .include.add(utils.resolve("src"))
    .end()
    .use("babel")
    .loader("babel-loader")
    .tap((options) => {
      // 修改它的选项...
      return options;
    });
};

const handleBuild = (config) => {
  // 这里面主要讲chainWebpack中做了什么事情：
  // 删除splitChunks，在打包组件的时候，并不希望抽离每个组件的公共js出来，而是每个独立打包，于是删除这个配置；
  // 删除copy：不要复制public文件到打包目录；
  // 删除preload以及prefetch，因为删除了html插件，所以这两个也没用；
  // 删除html，只打包组件，不生成html页面；
  // 删除hmr，删除hot-module-reload；
  // 删除自动加上的入口：app
  // 下面的配置fonts这个rule，打包字体的时候，输出到打包目录的static/fonts目录下；
  config.optimization.delete("splitChunks");
  config.plugins.delete("copy");
  config.plugins.delete("preload");
  config.plugins.delete("prefetch");
  config.plugins.delete("html");
  config.plugins.delete("hmr");
  config.entryPoints.delete("app");
};

module.exports = {
  resolve: {
    extensions: [".js", ".vue", ".json", "md"],
    alias: {
      examples: utils.resolve("examples"),
      packages: utils.resolve("packages"),
      "lin-view-ui": utils.resolve("src/index.js"),
      src: utils.resolve("src"),
    },
  },
  vueMarkdown,
  handleMD,
  handleJs,
  handleBuild,
};
