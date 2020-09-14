import HlsPlayer from "./src/hls-player.js";

HlsPlayer.install = (Vue) => (Vue.prototype.$HlsPlayer = HlsPlayer);

export default HlsPlayer;
