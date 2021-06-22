<template>
  <div class="side-nav beautyScroll">
    <div
      v-for="(title, index) in Object.keys(data)"
      :key="index"
      class="group-container"
    >
      <p class="side-nav-title">{{ title }}</p>
      <template v-for="nav in data[title]">
        <template v-if="nav.desc">
          <div class="side-nav-items" :key="nav.name">
            <router-link
              :class="$route.name === nav.name ? 'active' : ''"
              v-if="nav.name"
              :to="{ name: nav.name }"
              >{{ nav.desc }}</router-link
            >
            <p v-else class="side-nav-group">{{ nav.desc }}</p>
            <div v-for="(item, ix) in nav.items" :key="ix">
              <router-link
                :to="{ name: item.name }"
                :class="$route.name === item.name ? 'active' : ''"
                class="slid-nav-component"
                >{{ item.desc }}</router-link
              >
            </div>
          </div>
        </template>
      </template>
      <!-- <div
        class="side-nav-items"
        v-for="nav in data[title]"
        v-if="nav.desc"
        :key="nav.name"
      >
        <router-link
          :class="$route.name === nav.name ? 'active' : ''"
          v-if="nav.name"
          :to="{ name: nav.name }"
          >{{ nav.desc }}</router-link
        >
        <p v-else class="side-nav-group">{{ nav.desc }}</p>
        <div v-for="(item, ix) in nav.items" :key="ix">
          <router-link
            :to="{ name: item.name }"
            :class="$route.name === item.name ? 'active' : ''"
            class="slid-nav-component"
            >{{ item.desc }}</router-link
          >
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import zhNavConf from "../nav.config.zh.json";
import enNavConf from "../nav.config.en.json";
import { getLang, langType } from "../utils/lang.js";
const lang = getLang();
const navConfig = langType.en === lang ? enNavConf : zhNavConf;
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
  z-index: 99;
  // margin: 32px 0;
  box-sizing: border-box;
  display: inline-block;
  padding: 0;
  color: #3f536e;
  background-color: #fff;

  .group-container {
    margin-bottom: 32px;
  }

  .side-nav-title {
    padding: 0 24px 8px;
    padding-left: 0;
    font-size: 12px;
    font-weight: bold;
    color: #8dabc4;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .side-nav-items {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;

    a {
      position: relative;
      display: block;
      padding: 8px 24px;
      padding-left: 0;
      font-weight: normal;
      line-height: 1.5;
      color: #3f536e;
      cursor: pointer;
    }

    .side-nav-group {
      position: relative;
      display: block;
      padding: 6px 0 6px 24px;
      padding-left: 0;
      font-weight: bold;
      color: #2c405a;
    }

    .slid-nav-component {
      position: relative;
      display: block;
      padding: 6px 24px 6px 8px;
      font-size: 14px;
      // padding-left: 0;
      color: #616367;
    }

    .active {
      color: #3faaf5;
    }
  }
}
</style>
