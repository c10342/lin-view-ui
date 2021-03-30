<template>
  <div :class="['docs-demo-wrapper', blockClass]">
    <div class="demo-block">
      <slot name="source"></slot>
    </div>
    <div
      :style="{
        height: isExpand ? 'auto' : '0',
        'border-bottom': isExpand ? '' : 'none',
      }"
      class="demo-container"
    >
      <div v-if="$slots.default" class="description-wrapper">
        <slot></slot>
      </div>
      <div class="docs-demo docs-demo--expand">
        <div class="highlight-wrapper">
          <slot name="highlight"></slot>
        </div>
      </div>
    </div>
    <span class="docs-trans docs-demo__triangle" @click="toggle">{{
      isExpand ? hideText : showText
    }}</span>
  </div>
</template>

<script>
import { getLang } from '../utils/lang.js';
import langConfig from '../i18n/index.js';
import hljs from 'highlight.js';
const lang = getLang();
export default {
  data() {
    return {
      isExpand: false,
    };
  },
  methods: {
    toggle() {
      this.isExpand = !this.isExpand;
    },
  },
  computed: {
    showText() {
      return langConfig[lang].demoBlock.showText;
    },
    hideText() {
      return langConfig[lang].demoBlock.hideText;
    },
    blockClass() {
      return `demo-${this.$route.path.split('/').pop()}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const blocks = this.$el.querySelectorAll('pre code:not(.hljs)');
      Array.prototype.forEach.call(blocks, hljs.highlightBlock);
    });
  },
};
</script>

<style lang="scss">
.docs-demo-wrapper {
  .demo-container {
    // transition: all 0.5s;
    overflow: hidden;
    background-color: #f7f7f7;
    border: 1px solid #e2ecf4;
    border-top: none;
    // border-bottom: none;
  }

  .demo-block {
    padding: 32px;
    margin-top: 16px;
    background-color: #fff;
    border: 1px solid #e2ecf4;
    border-radius: 4px 4px 0 0;
  }

  .docs-demo {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    font-size: 14px;

    pre code {
      font-family: Consolas, Menlo, Courier, monospace;
      line-height: 22px;
      border: none;
    }
  }

  .description-wrapper {
    box-sizing: border-box;
    padding: 20px;
    margin: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    background-color: #fff;
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }

  .docs-trans {
    display: inline-block;
    width: 100%;
    padding: 10px 0;
    font-size: 12px;
    color: #c5d9e8;
    text-align: center;
    cursor: pointer;
    background-color: #fafbfc;

    &:hover {
      color: #409eff;
    }
  }

  .docs-demo__code,
  .highlight-wrapper {
    padding: 0 20px;
    overflow-y: auto;
  }

  .docs-demo__code {
    border-bottom: 1px solid #eee;
  }

  .highlight-wrapper {
    display: none;

    p,
    pre {
      margin: 0;
    }

    .hljs {
      padding: 0;
    }
  }

  .docs-demo.docs-demo--expand .highlight-wrapper {
    display: block;
  }
}
</style>
