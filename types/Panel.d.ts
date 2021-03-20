import { LinViewUIComponent } from "./component";

import { CascaderOption } from "./Cascader";

export declare class LinPanel extends LinViewUIComponent {
  // 可选项数据源
  options: CascaderOption[];
  // 面板所在的层级，就是第几个面板
  level: number;
}
