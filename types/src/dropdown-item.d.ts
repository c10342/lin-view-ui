import { VNode } from 'vue'
import {LinViewUIComponent} from './component'


export declare class LinDropdownItem extends LinViewUIComponent{
// 是否禁用
disabled:boolean
  // 是否显示分割线
  divided: boolean
  // 指令
  command: any
  // 图标类名
  icon: string

  $slots:{
      '':VNode[]
      default:VNode[]
  }
}