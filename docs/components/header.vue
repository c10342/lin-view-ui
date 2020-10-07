<template>
  <header
    class="page-header"
    :style="
      $route.name === 'index'
        ? 'box-shadow:none'
        : 'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'
    "
  >
    <div class="header-container">
      <router-link :to="{ name: 'index' }">
        <img src="../assets/img/logo.png" width="100" />
      </router-link>
      <div>
        <router-link :to="{ name: 'giud' }">
          {{ componentTitle }}
        </router-link>
        <lin-dropdown
          @command="handleCommand"
          trigger="click"
          class="doc-dropdown"
        >
          <span class="doc-dropdown-link">
            {{ langTitle }}
            <i class="lin-icon-down"></i>
          </span>
          <lin-dropdown-group slot="dropdown">
            <lin-dropdown-item :command="langType.zh">中文</lin-dropdown-item>
            <lin-dropdown-item :command="langType.en"
              >English</lin-dropdown-item
            >
          </lin-dropdown-group>
        </lin-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { getLang, setLang, langType } from "../utils/lang";
import langConfig from '../i18n/index'
const lang = getLang()
export default {
  data() {
    return {
      // lang: getLang(),
      langType,
    };
  },
  methods: {
    handleCommand(com) {
      if (com === langType.zh && lang !== langType.zh) {
        setLang(langType.zh);
        window.location.reload();
      } else if (com === langType.en && lang !== langType.en) {
        setLang(langType.en);
        window.location.reload();
      }
    },
  },
  computed:{
    componentTitle(){
      return langConfig[lang].header.component
    },
    langTitle(){
      return langConfig[lang].header.langTitle
    }
  }
};
</script>

<style lang="scss">
.page-header {
  background-color: #fff;
  box-shadow: 0 10px 60px 0 rgba(29, 29, 31, 0.07);
  opacity: 0.98;
  position: relative !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  transition: all 0.3s;
  z-index: 100;
  .header-container {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: space-between;
  }
  .doc-dropdown {
    margin-left: 30px;
  }
  .doc-dropdown-link {
    color: #888;
    &:hover {
      color: #409eff;
    }
  }
}
</style>
