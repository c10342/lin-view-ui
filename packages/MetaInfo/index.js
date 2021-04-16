import { VUE_META_KEY_NAME } from './src/common/constants.js';
import updateMetaInfo from './src/metaOperate/updateMetaInfo.js';

const VueMetaInfo = {};

VueMetaInfo.install = function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      const meta = this.$options[VUE_META_KEY_NAME];
      // 如果组件内设置了meta信息
      if (meta !== undefined) {
        const type = typeof meta;

        // 区分是否存在meta信息
        this._hasMetaInfo = true;

        // 判断组件内是否存在computed对象
        if (typeof this.$options.computed === 'undefined') {
          this.$options.computed = {};
        }

        // 为组件添加computed对象并返回meta信息
        if (type === 'function') {
          this.$options.computed.$metaInfo = meta;
        } else {
          this.$options.computed.$metaInfo = () => meta;
        }
      }
    },
    beforeMount() {
      //   在组建挂在到dom之前更新meta信息
      if (this._hasMetaInfo) {
        updateMetaInfo(this.$metaInfo);
      }
    },
    mounted() {
      // dom挂载之后，继续监听meta信息。如果发生变化，继续更新
      if (this._hasMetaInfo) {
        this.$watch('$metaInfo', () => {
          updateMetaInfo(this.$metaInfo);
        });
      }
    },
    activated() {
      if (this._hasMetaInfo) {
        // keep-alive组件激活时调用
        updateMetaInfo(this.$metaInfo);
      }
    },
    deactivated() {
      if (this._hasMetaInfo) {
        // keep-alive 组件停用时调用。
        updateMetaInfo(this.$metaInfo);
      }
    }
  });
};

export default VueMetaInfo;
