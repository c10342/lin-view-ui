const {
  stripScript,
  stripTemplate,
  genInlineComponentText
} = require('./util');
const md = require('./config');

module.exports = function (source) {
  const content = md.render(source);

  const startTag = '<!--lin-demo:';
  const startTagLen = startTag.length;
  const endTag = ':lin-demo-->';
  const endTagLen = endTag.length;

  let componentsString = '';
  let id = 0; // demo 的 id
  const output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart));

    const commentContent = content.slice(
      commentStart + startTagLen,
      commentEnd
    );
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    const demoComponentContent = genInlineComponentText(html, script);
    const demoComponentName = `lin-demo${id}`;
    output.push(`<template slot="source"><${demoComponentName} /></template>`);
    componentsString += `${JSON.stringify(
      demoComponentName
    )}: ${demoComponentContent},`;

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  let pageScript = '';
  if (componentsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componentsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) {
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  return `
    <template>
      <section class="content lin-view-ui-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;
};
