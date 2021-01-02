import Vue from 'vue';

import Tooltip from './tooltip.vue';

const TooltipConstruct = Vue.extend(Tooltip);

TooltipConstruct.prototype.addTip = function addTip() {
  this.vm = this.$mount();

  document.body.appendChild(this.vm.$el);
};

TooltipConstruct.prototype.removeTip = function removeTip() {
  this.show = false;
  this.$once('after-leave', () => {
    if (this.vm.$el) {
      document.body.removeChild(this.vm.$el);
    }
    // this.vm.$el && document.body.removeChild(this.vm.$el);
  });
};

export default TooltipConstruct;
