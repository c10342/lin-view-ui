<template>
  <div class="lin-hls-player-definition">
    <span class="lin-hls-player-definition-label">{{currentDefinitionVideo?currentDefinitionVideo.label:''}}</span>
    <ul class="lin-hls-player-definition-list" :style="{top}" v-if="definitionList.length>0">
      <li
        @click="setDefinition(item)"
        class="lin-hls-player-speed-label"
        v-for="(item,index) in definitionList"
        :key="index"
      >{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "LinHlsPlayerDefinition",
  inject: {
    hlsPlayer: {
      default: null,
    },
  },
  computed: {
    video() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.video;
      }
      return null;
    },
    videoList() {
      if (this.hlsPlayer) {
        return this.hlsPlayer.videoList;
      }
      return [];
    },
    top() {
      if (!this.definitionList.length) {
        return 0;
      }
      const t = (20 + 10) * this.definitionList.length + 10;
      return `${-t}px`;
    },
    currentDefinitionVideo: {
      get() {
        if (this.hlsPlayer) {
          return this.hlsPlayer.currentDefinitionVideo;
        }
        return null;
      },
      set(value) {
        if (this.hlsPlayer) {
          this.hlsPlayer.currentDefinitionVideo = value;
        }
      },
    },
    definitionList: {
      get() {
        if (this.hlsPlayer) {
          return this.hlsPlayer.definitionList;
        }
        return [];
      },
      set(value) {
        if (this.hlsPlayer) {
          this.hlsPlayer.definitionList = value;
        }
      },
    },
  },
  // mounted() {
  //   if (this.videoList.length > 0) {
  //     const videoList = cloneDeep(this.videoList);
  //     this.currentDefinitionVideo = videoList[0];
  //     this.definitionList = videoList.slice(1);
  //   }
  // },
  methods: {
    setDefinition(data) {
      this.hlsPlayer?.setDefinition(data)
      // const definitionList = cloneDeep(this.definitionList);
      // const index = definitionList.findIndex(
      //   (item) => item.label === data.label && item.url === data.url
      // );
      // if (index > -1) {
      //   definitionList.splice(index, 1);
      //   definitionList.push(this.currentDefinitionVideo);
      //   this.definitionList = definitionList;
      //   this.currentDefinitionVideo = data;
      //   if (this.hlsPlayer) {
      //     this.hlsPlayer.switchPlayerUrl(data);
      //   }
      // }
    },
  },
};
</script>

<style lang="scss">
.lin-hls-player-definition {
  margin-right: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  position: relative;
  &:hover {
    .lin-hls-player-definition-list {
      display: block;
    }
  }
}
.lin-hls-player-definition-label {
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  padding: 5px 10px;
  font-size: 12px;
  white-space: nowrap;
  text-align: center;
}
.lin-hls-player-definition-list {
  list-style: none;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 5px 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: none;
  .lin-hls-player-definition-label {
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>