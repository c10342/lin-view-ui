import { VNode } from 'vue'
import {LinViewUIComponent} from './component'


export declare class LinDropdownGroup extends LinViewUIComponent{
    // 分组的组名
    label: string

    $slots:{
        // DropdownItem组件列表
        '':VNode[]
        default:VNode[]
    }
}