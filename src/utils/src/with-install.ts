
import type {App} from 'vue'


export default function withInstall(component:Record<string,any>){
    component.install = function(app:App){
        app.component(component.name,component)
    }
}