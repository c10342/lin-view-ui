<template>
  <div class="lin-video-player-speed" v-if="speedList.length !== 0">
    <span class="lin-video-player-speed-label">{{
      currentSpeed ? currentSpeed.label : t("LinViewUI.VideoPlayer.speed")
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
import LocaleMixin from 'src/mixins/locale.js';
import { cloneDeep } from 'lodash';

export default {
  name: 'LinVideoPlayerSpeed',
  mixins: [LocaleMixin],
  inject: {
    videoPlayer: {
      default: null,
    },
  },
  data() {
    return {
      currentSpeed: null,
      list: [],
    };
  },
  computed: {
    speedList() {
      if (this.videoPlayer) {
        return this.videoPlayer.speedList;
      }
      return [];
    },
    top() {
      if (!this.list.length) {
        return 0;
      }
      const t = (20 + 10) * this.list.length + 10;
      return `${-t}px`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.speedList.length > 0) {
        const speedList = cloneDeep(this.speedList);
        this.currentSpeed = speedList[0];
        this.list = speedList.slice(1);
        this.setSpeed();
      }
    });
  },
  methods: {
    switchSpeed(data) {
      const list = cloneDeep(this.list);
      const index = list.findIndex(
        (item) => item.label === data.label && item.value === data.value,
      );
      list.splice(index, 1);
      list.push(this.currentSpeed);
      this.list = list;
      this.currentSpeed = data;
      this.setSpeed();
    },
    setSpeed() {
      if (this.videoPlayer) {
        const playbackRate = this.currentSpeed.value;
        this.videoPlayer.setSpeed(playbackRate);
      }
    },
  },
};
</script>
