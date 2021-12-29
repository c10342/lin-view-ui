declare module '*.vue' {
  import type { DefineComponent,App } from 'vue'
  const component: DefineComponent<{}, {}, any> & { install:(app:App)=>void}
  export default component
}
