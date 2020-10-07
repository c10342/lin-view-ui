<template>
  <div class="pg-index">
    <div class="index-container">
      <img src="../assets/img/logo.png" />
      <p>{{message}}</p>
    </div>
    <div class="separate-panel">
      <div class="about">
        <router-link :to="{ name: 'giud' }">{{startToUse}}</router-link>
        <a target="_blank" class="btn-github" href="https://github.com/c10342/lin-view-ui">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import {getLang} from '../utils/lang'
import langConfig from '../i18n/index'
const lang = getLang()
export default {
  data() {
    return {
      height: document.documentElement.clientHeight
    };
  },
  computed:{
    message(){
      return langConfig[lang].index.message
    },
    startToUse(){
      return langConfig[lang].index.startToUse
    }
  }
};
</script>
<style lang="scss">
.pg-index {
  .index-container {
    width: 960px;
    margin: 0 auto;
    text-align: center;
    padding: 100px 0;
    p {
      margin-top: 56px;
      color: #8994c6;
      font-size: 32px;
    }
  }
  .separate-panel {
    position: relative;
    .about {
      position: absolute;
      width: 100%;
      height: 200px;
      top: 20px;
      z-index: 9;
      background: #fff;
      text-align: center;
      a {
        color: #fff;
        background-image: linear-gradient(90deg, #00aeff 0%, #3369e7 100%);
        box-shadow: 0 2px 6px 0 rgba(51, 105, 231, 0.4);
        display: inline-block;
        width: 190px;
        height: 56px;
        margin: 0 35px;
        font-size: 18px;
        line-height: 56px;
        border-radius: 28px;
        transition: all 0.3s;
        cursor: pointer;
      }
      .btn-github {
        color: #316de9;
        border: 1px solid #2f6ee9;
        background: #fff;
        box-shadow: none;
      }
    }
  }
  .separate-panel:after {
    content: "";
    display: block;
    position: absolute;
    top: -80px;
    width: 100%;
    height: 250px;
    background: #fff;
    box-shadow: 0 -4px 30px 0 #dfe1e6;
    transform: skewY(-4deg);
  }
}
</style>
