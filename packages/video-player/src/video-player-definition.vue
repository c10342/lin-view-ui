<template>
  <div class="lin-video-player-definition">
    <span class="lin-video-player-definition-label">{{
      currentDefinitionVideo ? currentDefinitionVideo.label : ""
    }}</span>
    <ul
      class="lin-video-player-definition-list"
      :style="{ top }"
      v-if="definitionList.length > 0"
    >
      <li
        @click="setDefinition(item)"
        class="lin-video-player-definition-label"
        v-for="(item, index) in definitionList"
        :key="index"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LinVideoPlayerDefinition",
  inject: {
    videoPlayer: {
      default: null
    }
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
    // 视频清晰度列表距离顶部距离
    top() {
      if (!this.definitionList.length) {
        return 0;
      }
      const t = (20 + 10) * this.definitionList.length + 10;
      return `${-t}px`;
    },
    // 当前清晰度视频
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
      }
    },
    // 剩下的清晰度列表
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
      }
    }
  },
  methods: {
    // 设置清晰度视频
    setDefinition(data) {
      this.videoPlayer?.setDefinition(data);
    }
  }
};
</script>
