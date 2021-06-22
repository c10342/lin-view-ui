const Config = require("markdown-it-chain");

const anchorPlugin = require("markdown-it-anchor");

const taskLists = require("markdown-it-task-lists");

const markdownItTableOfContents = require("markdown-it-table-of-contents");

const containers = require("./containers.js");

const overWriteFenceRule = require("./fence.js");

const getPinyin = require("./pinyin.js");

const config = new Config();

function getLink(link) {
  let py = getPinyin(decodeURIComponent(link).replace(/\s+/g, ""));
  py = py[0] ? py[0] : link;
  return py.toUpperCase().replace(/[^a-zA-Z]/g, "");
}

config.options
  .html(true)
  .linkify(true)
  .end()
  .plugin("anchor")
  .use(anchorPlugin, [
    {
      level: 2,
      permalink: false,
      // permalinkBefore: true,
      // permalinkHref: function(link) {
      //   return "#" + getLink(link);
      // },
      slugify: getLink
    }
  ])
  .end()
  .plugin("toc")
  .use(markdownItTableOfContents, [
    {
      includeLevel: [2],
      // containerHeaderHtml: `<div class="toc-container-header">Catalog</div>`,
      transformLink(link) {
        return `#${getLink(link)}`;
      }
    }
  ])
  .end()
  .plugin("containers")
  .use(containers)
  .end()
  .plugin("taskLists")
  .use(taskLists)
  .end();

const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;
