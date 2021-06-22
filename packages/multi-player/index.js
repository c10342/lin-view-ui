import MultiPlayer from "./src/multi-player.js";

MultiPlayer.install = Vue => {
  Vue.prototype.$MultiPlayer = MultiPlayer;
};

export default MultiPlayer;
