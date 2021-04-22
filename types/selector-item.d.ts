import { VNode } from 'vue'
import {LinViewUIComponent} from './component'


export declare class LinSelectorItem extends LinViewUIComponent{
 // 标签内容
 label: string
  // 选项的值	
  value: string
  // 是否禁用	
  disabled: boolean

  $slots:{
    // 自定义标签内容
      '':VNode[]
      default:VNode[]
  }
}