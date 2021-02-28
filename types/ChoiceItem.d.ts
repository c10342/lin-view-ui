import { VNode } from 'vue';
import {LinViewUIComponent} from './component'


export type ChoiceItemValue = string | number | Record<string, any>;

export interface ChoiceItemProps{
    label: string
      value: ChoiceItemValue
      disabled: boolean
}

export declare class LinChoiceItem extends LinViewUIComponent{
    // 选项的标签，若不设置则默认与 value 相同
    label: string
    // 选项的值
      value: ChoiceItemValue
    //   是否禁用
    disabled: boolean
    // 插槽
    $slots: {
        '': VNode[],
        default:VNode[]
    }
}