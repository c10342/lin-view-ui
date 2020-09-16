import VideoPlayer from "./src/video-player.js";

VideoPlayer.install = (Vue) => (Vue.prototype.$VideoPlayer = VideoPlayer);

export default VideoPlayer;
