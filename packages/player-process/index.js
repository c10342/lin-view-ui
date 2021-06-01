import PlayerProcess from './src/player-process.js';

PlayerProcess.install = (Vue) =>
  Vue.component(PlayerProcess.name, PlayerProcess);

export default PlayerProcess;
