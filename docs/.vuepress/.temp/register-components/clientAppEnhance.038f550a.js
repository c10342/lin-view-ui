    import { defineAsyncComponent } from 'vue'
    
    export default ({ app }) => {    
      app.component("button-base", defineAsyncComponent(() => import("D:/Users/linjiafu/Desktop/demo/vue3-ui/docs/examples/button/base.vue"))),
      app.component("button-disabled", defineAsyncComponent(() => import("D:/Users/linjiafu/Desktop/demo/vue3-ui/docs/examples/button/disabled.vue"))),
      app.component("button-icon", defineAsyncComponent(() => import("D:/Users/linjiafu/Desktop/demo/vue3-ui/docs/examples/button/icon.vue"))),
      app.component("button-loading", defineAsyncComponent(() => import("D:/Users/linjiafu/Desktop/demo/vue3-ui/docs/examples/button/loading.vue"))),
      app.component("button-size", defineAsyncComponent(() => import("D:/Users/linjiafu/Desktop/demo/vue3-ui/docs/examples/button/size.vue"))),
      app.component("icon-base", defineAsyncComponent(() => import("D:/Users/linjiafu/Desktop/demo/vue3-ui/docs/examples/icon/base.vue"))),
      app.component("layout-base", defineAsyncComponent(() => import("D:/Users/linjiafu/Desktop/demo/vue3-ui/docs/examples/layout/base.vue"))),
      app.component("DemoBlock", defineAsyncComponent(() => import("D:/Users/linjiafu/Desktop/demo/vue3-ui/node_modules/vuepress2-plugin-demo-block/src/DemoBlock.vue")))
    }
    