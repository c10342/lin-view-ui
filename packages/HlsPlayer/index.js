import HlsPlayer from "./src/hls-player.js";

HlsPlayer.install = (Vue) => Vue.component(HlsPlayer.name, HlsPlayer);

export default HlsPlayer;
