const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const join = path.join;

function resolve(dir) {
  return path.join(__dirname, "../", dir);
}

exports.resolve = resolve;

/**
 * 获取各组件的入口
 */
exports.getComponentEntries = (pathStr) => {
  let files = fs.readdirSync(resolve(pathStr));
  const componentEntries = files.reduce((ret, item) => {
    const itemPath = join(pathStr, item);
    const [name] = item.split(".");
    ret[name] = resolve(`${itemPath}`);
    return ret;
  }, {});
  return componentEntries;
};

/**
 * 增加 hljs 的 classname
 */
exports.wrapCustomClass = (render) => {
  return function(...args) {
    return render(...args)
      .replace('<code class="', '<code class="hljs ')
      .replace("<code>", '<code class="hljs">');
  };
};

/**
 * Format HTML string
 */
exports.convertHtml = (str) => {
  return str.replace(/(&#x)(\w{4});/gi, ($0) =>
    String.fromCharCode(
      parseInt(
        encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, "$2"),
        16
      )
    )
  );
};

/**
 * 转换成DOM字符串
 */
exports.striptags = (str, tags) => {
  const $ = cheerio.load(str, { decodeEntities: false });

  if (!tags || tags.length === 0) {
    return str;
  }

  tags = !Array.isArray(tags) ? [tags] : tags;
  let len = tags.length;

  while (len--) {
    $(tags[len]).remove();
  }

  return $.html();
};
