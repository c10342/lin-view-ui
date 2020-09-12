<template>
  <div class="lin-hls-player-speed">
    <span class="lin-hls-player-speed-label">{{currentSpeed?currentSpeed.label:'倍速'}}</span>
    <ul class="lin-hls-player-speed-list" :style="{top}">
      <li
        @click="setSpeed(index)"
        :class="[{'lin-hls-player-speed-active-label':currenIndex===-1?false:(currenIndex===index)},'lin-hls-player-speed-label']"
        v-for="(item,index) in speedList"
        :key="index"
      >{{item.label}}</li>
      <!-- <li class="lin-hls-player-speed-label">1.2倍</li>
      <li class="lin-hls-player-speed-label">1.2倍</li>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: "LinHlsPlayerSpeed",
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  data() {
    return {
      currentSpeed: null,
      currenIndex: -1,
    };
  },
  computed: {
    video() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.video;
      }
      return null;
    },
    speedList() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.speedList;
      }
      return [];
    },
    top() {
      if (!this.speedList.length) {
        return 0;
      }
      const t = (20 + 10) * this.speedList.length + 10;
      return `${-t}px`;
    },
  },
  methods: {
    setSpeed(index) {
      //         1.0 正常速度
      // 0.5 半速（更慢）
      // 2.0 倍速（更快）
      // -1.0 向后，正常速度
      // -0.5 向后，半速
      this.currentSpeed = this.speedList[index];
      this.currenIndex = index;
      if (this.video) {
        this.video.playbackRate = this.currentSpeed.value;
      }
    },
  },
};
</script>

<style lang="scss">
.lin-hls-player-speed {
  margin-right: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  position: relative;
  &:hover {
    .lin-hls-player-speed-list {
      display: block;
    }
  }
}
.lin-hls-player-speed-label {
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  padding: 5px 10px;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
}
.lin-hls-player-speed-list {
  list-style: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 5px 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: none;
  .lin-hls-player-speed-label {
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}

.lin-hls-player-speed-active-label {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>