import { defineComponent } from "vue";
import { zhCN } from "@packages/locale";

export default defineComponent({
  inject: {
    locale: {
      default: zhCN
    }
  },
  methods: {
    t(path: string): string {
      const arr = path.split(".");
      return arr.reduce((pre: any, cur: any) => {
        return pre[cur];
      }, (this as any).locale);
    }
  }
});
