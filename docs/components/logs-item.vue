<template>
  <div class="logs-container">
    <div class="logs-header">
      <div class="logs-version">{{ log.version }}</div>
      <div class="logs-time">{{ log.time }}</div>
    </div>
    <div class="logs-content" v-if="log.content.length">
      <div v-for="(item, index) in log.content" :key="index">
        <template v-if="item.type === addComponent">
          <h4>{{ item.title }}</h4>
          <ul>
            <li v-for="(msg, idx) in item.list" :key="idx">{{ msg }}</li>
          </ul>
        </template>
        <template v-else>
          <h4>{{ item.title }}</h4>
          <div v-for="(msg, idx) in item.list" :key="idx">
            <h5>{{ msg.subTitle }}</h5>
            <ul>
              <li v-for="(subMsg, subIdx) in msg.subList" :key="subIdx">
                {{ subMsg }}
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>


<script>
import {logsType} from '../config/index'
export default {
  props: {
    log: {
      type: Object,
      default: () => [],
    },
  },
  data(){
      return {
          addComponent:logsType.ADDCOMPONENT
      }
  }
};
</script>

<style lang="scss" scoped>
.logs-container {
  position: relative;
  padding-bottom: 15px;
  line-height: 1.8;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 30px;
  .logs-header {
    margin: 0;
    padding: 15px 30px;
    border-bottom: 1px solid #ddd;
    font-size: 20px;
    color: #333;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .logs-version {
      opacity: 1;
      font-size: 20px;
      float: none;
      margin-left: 0;
      color: #333;
    }
    .logs-time {
      font-size: 14px;
      color: #5e6d82;
      line-height: 1.5em;
    }
  }
  .logs-content {
    padding: 0 30px;
    h4 {
      font-size: 18px;
      font-weight: 700;
    }
    h5 {
      font-size: 16px;
      color: #333;
      font-weight: normal;
    }
  }
}
</style>