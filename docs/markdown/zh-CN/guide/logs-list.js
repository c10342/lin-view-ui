import { logsType } from '../../../config/index.js';

export default [
  {
    version: '1.1.0',
    time: '2021-01-16',
    content: [
      {
        title: '重构',
        list: [
          '重构打包工具',
          '重构文档',
          '重构单元测试',
          '添加eslint和stylelint规范代码',
          '优化组件代码',
        ],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.26',
    time: '2020-08-28',
    content: [
      {
        title: '新增组件',
        list: ['新增 Message 消息提示组件', '新增 MessageBox 弹框组件'],
        type: logsType.ADDCOMPONENT,
      },
      {
        title: '新特性',
        list: [
          {
            subTitle: 'Dialog',
            subList: ['新增拖拽功能'],
          },
        ],
      },
    ],
  },
  {
    version: '1.0.25',
    time: '2020-08-22',
    content: [
      {
        title: '新增组件',
        list: ['新增 DateAxis 日期轴组件', '新增 ScrollBar 滚动条组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.24',
    time: '2020-08-20',
    content: [
      {
        title: '新增组件',
        list: ['新增 Spinner 旋转组件', '新增 Cascader 级联选择器组件'],
        type: logsType.ADDCOMPONENT,
      },
      {
        title: 'Bug 修复',
        list: [
          {
            subTitle: 'Input',
            subList: ['修复 ie 下无法输入的问题', '清除在 ie 下自带的清除按钮'],
          },
          {
            subTitle: 'LimitTextarea',
            subList: ['修复 ie 下无法输入的问题'],
          },
          {
            subTitle: 'LiveComment',
            subList: ['修复 ie 下无法输入的问题'],
          },
          {
            subTitle: 'VideoPlayer',
            subList: ['修复在 ie 下因为 flv.js 依赖报语法错误'],
          },
          {
            subTitle: 'Tab',
            subList: ['修复在 ie 下无法获取 getBoundingClientRect().x 的值'],
          },
        ],
      },
      {
        title: '新特性',
        list: [
          {
            subTitle: 'Input',
            subList: ['添加 clear 事件'],
          },
          {
            subTitle: 'Button',
            subList: ['新增 loading 功能'],
          },
        ],
      },
    ],
  },
  {
    version: '1.0.23',
    time: '2020-08-15',
    content: [
      {
        title: '新增组件',
        list: [
          '新增 i18n 国际化功能',
          '新增 Link 文字链接组件',
          '新增 Badge 标记组件',
          '新增 Backtop 回到顶部组件',
        ],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.22',
    time: '2020-08-14',
    content: [
      {
        title: '新增组件',
        list: ['新增 Tab 标签页组件', '新增 Skeleton 骨架屏组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.21',
    time: '2020-08-12',
    content: [
      {
        title: '新增组件',
        list: [
          '新增 Dropdown、DropdownItem、DropdownGroup 下拉菜单组件',
          '新增 PageHeader 页头组件',
        ],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.20',
    time: '2020-08-10',
    content: [
      {
        title: '新增组件',
        list: ['新增 ChoiceGroup、ChoiceItem、ChoiceOption 选择器组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.19',
    time: '2020-08-09',
    content: [
      {
        title: '新增组件',
        list: ['新增 CollapseGroup、CollapseItem 折叠面板组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.18',
    time: '2020-08-07',
    content: [
      {
        title: '新增组件',
        list: ['新增 VideoPlayer 播放器组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.17',
    time: '2020-08-06',
    content: [
      {
        title: '新增组件',
        list: ['新增 Pagination 分页组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.16',
    time: '2020-08-03',
    content: [
      {
        title: '新增组件',
        list: ['新增 Table 表格组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.15',
    time: '2020-08-01',
    content: [
      {
        title: '新增组件',
        list: ['新增 Magnifier 放大镜组件', '新增 HoverEffect 悬浮效果组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.14',
    time: '2020-07-23',
    content: [
      {
        title: '新特性',
        list: [
          {
            subTitle: 'Form',
            subList: ['添加表单校验功能'],
          },
        ],
      },
    ],
  },
  {
    version: '1.0.13',
    time: '2020-07-18',
    content: [
      {
        title: '新增组件',
        list: ['新增 Upload 上传组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.12',
    time: '2020-07-15',
    content: [
      {
        title: '新增组件',
        list: ['新增 Tag 标签组件', '新增 Alert 警告组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.11',
    time: '2020-07-10',
    content: [
      {
        title: '新增组件',
        list: ['新增 LiveComment 直播评论组件', '新增 InputNumber 计数器组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.10',
    time: '2020-06-30',
    content: [
      {
        title: '新增组件',
        list: ['新增 Icon 图标组件', '新增 DatePicker 日期选择器组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.9',
    time: '2020-06-25',
    content: [
      {
        title: '新增组件',
        list: ['新增 Tooltip 文字提示组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.8',
    time: '2020-06-21',
    content: [
      {
        title: '新增组件',
        list: ['新增 Selector 选择器组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.7',
    time: '2020-06-20',
    content: [
      {
        title: '新增组件',
        list: ['新增 MetaInfo 三要素组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.6',
    time: '2020-06-14',
    content: [
      {
        title: '新增组件',
        list: ['新增 Progress 进度条组件', '新增 Loading 加载组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.5',
    time: '2020-06-12',
    content: [
      {
        title: '新增组件',
        list: ['新增 ScrollView 滚动加载组件', '新增 Image 图片组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.4',
    time: '2020-06-09',
    content: [
      {
        title: '新增组件',
        list: ['新增 Layout 布局组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.3',
    time: '2020-06-08',
    content: [
      {
        title: '新增组件',
        list: [
          '新增 Checkbox、CheckboxGroup 多选框组件',
          '新增 Form、FormItem 表单组件',
        ],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.2',
    time: '2020-06-02',
    content: [
      {
        title: '新增组件',
        list: ['新增 ShowMore 组显示更多件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.1',
    time: '2020-05-20',
    content: [
      {
        title: '新增组件',
        list: ['新增 Switch 开关组件', '新增 Radio、RadioGroup 单选框组件'],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
  {
    version: '1.0.0',
    time: '2020-05-06',
    content: [
      {
        title: '新增组件',
        list: [
          '新增 Button 按钮组件',
          '新增 Dialog 对话框组件',
          '新增 VideoCard 视频卡片组件',
          '新增 Input 输入框组件',
        ],
        type: logsType.ADDCOMPONENT,
      },
    ],
  },
];
