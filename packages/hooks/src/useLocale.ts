import { useGlobalConfig } from "./useGlobalConfig";

export const useLocale = () => {
  const { locale } = useGlobalConfig();

  const t = (path: string) => {
    const arr = path.split(".");
    return arr.reduce((pre: any, cur: any) => {
      return pre[cur];
    }, locale.value);
  };

  return {
    t,
  };
};
