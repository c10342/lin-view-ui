
// unplugin-vue-components 插件按需加载
export function ZUIResolver() {
  const item = {
    type: "component",
    resolve: (name) => {
      // 组件名称 ZButton、z-button => ZButton
      if (!name.match(/^Z[A-Z]/)) {
        return;
      }
      const pathName = name.slice(1).toLowerCase();
      // import {ZButton} from 'z-ui/es'
      // import z-ui/dist/theme-chalk/src/button.css
      // import z-ui/dist/theme-chalk/src/var.css
      return {
        name: name,
        from: "z-ui/es",
        sideEffects: [
          `z-ui/dist/theme-chalk/src/${pathName}.css`,
          `z-ui/dist/theme-chalk/src/var.css`,
        ],
      };
    },
  };
  return item;
}
