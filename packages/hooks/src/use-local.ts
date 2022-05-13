import { zhCN } from "@packages/locale";
import { computed } from "vue";
import { useGlobalConfig } from "./use-global-config";

export const useLocale = () => {
  const { locale } = useGlobalConfig({
    locale: computed(() => zhCN)
  });

  const t = (path: string) => {
    const arr = path.split(".");
    return arr.reduce((pre: any, cur: any) => {
      return pre[cur];
    }, locale!.value);
  };

  return {
    t
  };
};
