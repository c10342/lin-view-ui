<template>
  <div class="side-nav">
    <div v-for="(title, index) in Object.keys(data)" :key="index" class="group-container">
      <p class="side-nav-title">{{ title }}</p>
      <div class="side-nav-items" v-for="nav in data[title]" v-if="nav.desc" :key="nav.name">
        <router-link
          :class="$route.name === nav.name ? 'active' : ''"
          v-if="nav.name"
          :to="{ name: nav.name }"
        >{{ nav.desc }}</router-link>
        <p v-else class="side-nav-group">{{ nav.desc }}</p>
        <div v-for="(item, ix) in nav.items" :key="ix">
          <router-link
            :to="{ name: item.name }"
            :class="$route.name === item.name ? 'active' : ''"
            class="slid-nav-component"
          >{{ item.desc }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zhNavConf from "../nav.config.zh.json";
import enNavConf from "../nav.config.en.json";
import {getLang,langType} from '../utils/lang'
const lang = getLang()
const navConfig = langType.en===lang?enNavConf:zhNavConf
export default {
  data() {
    return {
      data: navConfig
    };
  }
};
</script>

<style lang="scss">
.side-nav {
  display: inline-block;
  // margin: 32px 0;
  box-sizing: border-box;
  padding: 0;
  color: #3f536e;
  background-color: #fff;
  z-index: 99;
  .group-container {
    margin-bottom: 32px;
  }
  .side-nav-title {
    padding: 0 24px 8px;
    padding-left: 0;
    color: #8dabc4;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .side-nav-items {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;
    a {
      display: block;
      position: relative;
      padding: 8px 24px;
      padding-left: 0;
      color: #3f536e;
      font-weight: normal;
      line-height: 1.5;
      cursor: pointer;
    }
    .side-nav-group {
      display: block;
      position: relative;
      padding: 6px 0 6px 24px;
      padding-left: 0;
      color: #2c405a;
      font-weight: bold;
    }
    .slid-nav-component {
      display: block;
      position: relative;
      padding: 6px 24px 6px 8px;
      // padding-left: 0;
      color: #616367;
      font-size: 14px;
    }
    .active {
      color: #3faaf5;
    }
  }
}
</style>