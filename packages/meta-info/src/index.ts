import { VUE_META_KEY_NAME } from "./constant";
import operate from "./operate";
import { isUndefined, isFunction } from "@packages/utils";
import { App } from "vue";

function updateMetaInfo(data: Record<string, any>) {
  const opt = operate();
  opt.removeMetaInfo();
  opt.setMetaInfo(data);
}

const install = (app: App) => {
  app.mixin({
    beforeCreate() {
      const meta = this.$options[VUE_META_KEY_NAME];
      // 如果组件内设置了meta信息
      if (!isUndefined(meta)) {
        // 区分是否存在meta信息
        this.hasMetaInfo = true;

        // 判断组件内是否存在computed对象
        if (isUndefined(this.$options.computed)) {
          this.$options.computed = {};
        }

        // 为组件添加computed对象并返回meta信息
        if (isFunction(meta)) {
          this.$options.computed.$metaInfo = meta;
        } else {
          this.$options.computed.$metaInfo = () => meta;
        }
      }
    },
    beforeMount() {
      //   在组建挂在到dom之前更新meta信息
      if (this.hasMetaInfo) {
        updateMetaInfo(this.$metaInfo);
      }
    },
    mounted() {
      // dom挂载之后，继续监听meta信息。如果发生变化，继续更新
      if (this.hasMetaInfo) {
        this.$watch("$metaInfo", () => {
          updateMetaInfo(this.$metaInfo);
        });
      }
    },
    activated() {
      if (this.hasMetaInfo) {
        // keep-alive组件激活时调用
        updateMetaInfo(this.$metaInfo);
      }
    },
    deactivated() {
      if (this.hasMetaInfo) {
        operate().removeMetaInfo();
      }
    },
    beforeUnmount() {
      if (this.hasMetaInfo) {
        operate().removeMetaInfo();
      }
    }
  });
};

const VueMetaInfo = {
  install
};

export default VueMetaInfo;
