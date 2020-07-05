import Vue from "vue";

import Tooltip from "./tooltip.vue";

const TooltipConstruct = Vue.extend(Tooltip);

TooltipConstruct.prototype.addTip = function(options = {}) {
  this.vm = this.$mount();

  document.body.appendChild(this.vm.$el);
};

TooltipConstruct.prototype.removeTip = function() {
  this.show = false;
  this.$once("after-leave", () => {
    this.vm.$el && document.body.removeChild(this.vm.$el);
  });
};

export default TooltipConstruct;
