<template>
  <div class="lin-video-player-definition">
    <span class="lin-video-player-definition-label">{{currentDefinitionVideo?currentDefinitionVideo.label:''}}</span>
    <ul class="lin-video-player-definition-list" :style="{top}" v-if="definitionList.length>0">
      <li
        @click="setDefinition(item)"
        class="lin-video-player-speed-label"
        v-for="(item,index) in definitionList"
        :key="index"
      >{{item.label}}</li>
    </ul>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "LinVideoPlayerDefinition",
  inject: {
    videoPlayer: {
      default: null,
    },
  },
  computed: {
    video() {
      if (this.videoPlayer) {
        return this.videoPlayer.video;
      }
      return null;
    },
    videoList() {
      if (this.videoPlayer) {
        return this.videoPlayer.videoList;
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
        if (this.videoPlayer) {
          return this.videoPlayer.currentDefinitionVideo;
        }
        return null;
      },
      set(value) {
        if (this.videoPlayer) {
          this.videoPlayer.currentDefinitionVideo = value;
        }
      },
    },
    definitionList: {
      get() {
        if (this.videoPlayer) {
          return this.videoPlayer.definitionList;
        }
        return [];
      },
      set(value) {
        if (this.videoPlayer) {
          this.videoPlayer.definitionList = value;
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
      this.videoPlayer?.setDefinition(data)
      // const definitionList = cloneDeep(this.definitionList);
      // const index = definitionList.findIndex(
      //   (item) => item.label === data.label && item.url === data.url
      // );
      // if (index > -1) {
      //   definitionList.splice(index, 1);
      //   definitionList.push(this.currentDefinitionVideo);
      //   this.definitionList = definitionList;
      //   this.currentDefinitionVideo = data;
      //   if (this.videoPlayer) {
      //     this.videoPlayer.switchPlayerUrl(data);
      //   }
      // }
    },
  },
};
</script>

