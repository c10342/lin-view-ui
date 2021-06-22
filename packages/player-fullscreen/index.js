import PlayerFullscreen from "./src/player-fullscreen.vue";

PlayerFullscreen.install = Vue =>
  Vue.component(PlayerFullscreen.name, PlayerFullscreen);

export default PlayerFullscreen;
