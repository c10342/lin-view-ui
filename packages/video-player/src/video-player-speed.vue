<template>
  <div class="lin-video-player-speed" v-if="speedList.length !== 0">
    <span class="lin-video-player-speed-label">{{
      currentSpeed ? currentSpeed.label : t('LinViewUI.VideoPlayer.speed')
    }}</span>
    <ul
      class="lin-video-player-speed-list"
      :style="{ top }"
      v-if="list.length > 0"
    >
      <li
        @click="switchSpeed(item)"
        class="lin-video-player-speed-label"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
import {LocaleMixin} from '@lin-view-ui/mixins';
import { cloneDeep } from 'lodash';

export default {
  name: 'LinVideoPlayerSpeed',
  mixins: [LocaleMixin],
  inject: {
    videoPlayer: {
      default: null
    }
  },
  data() {
    return {
      currentSpeed: null,
      list: []
    };
  },
  computed: {
    // 倍数列表
    speedList() {
      if (this.videoPlayer) {
        return this.videoPlayer.speedList;
      }
      return [];
    },
    // 容器top值
    top() {
      if (!this.list.length) {
        return 0;
      }
      const t = (20 + 10) * this.list.length + 10;
      return `${-t}px`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.speedList.length > 0) {
        const speedList = cloneDeep(this.speedList);
        // 当前倍数
        this.currentSpeed = speedList[0];
        // 剩下的倍数
        this.list = speedList.slice(1);
        // 设置倍数
        this.setSpeed();
      }
    });
  },
  methods: {
    // 切换倍数
    switchSpeed(data) {
      const list = cloneDeep(this.list);
      // 查找倍数
      const index = list.findIndex(
        (item) => item.label === data.label && item.value === data.value
      );
      // 先删除后添加
      list.splice(index, 1);
      list.push(this.currentSpeed);
      this.list = list;
      this.currentSpeed = data;
      this.setSpeed();
    },
    // 设置倍数
    setSpeed() {
      if (this.videoPlayer) {
        const playbackRate = this.currentSpeed.value;
        this.videoPlayer.setSpeed(playbackRate);
      }
    }
  }
};
</script>
