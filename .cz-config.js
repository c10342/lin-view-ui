module.exports = {
  types: [
    { value: "feat", name: "feat：新增功能" },
    { value: "fix", name: "fix：bug 修复" },
    { value: "docs", name: "docs：文档更新" },
    {
      value: "build",
      name: "build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交"
    },
    {
      value: "ci",
      name: "ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交"
    },
    { value: "perf", name: "perf：性能优化" },
    {
      value: "refactor",
      name: "refactor：重构代码(既没有新增功能，也没有修复 bug)"
    },
    {
      value: "style",
      name: "style：不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)"
    },
    { value: "test", name: "test：测试" },
    { value: "revert", name: "revert：回滚某个更早之前的提交" },
    { value: "chore", name: "chore：不属于以上类型的其他类型(日常事务)" }
  ],
  // 步骤
  messages: {
    type: "请选择提交类型：",
    customScope: "请输入修改的范围（可选）：",
    subject: "请简要描述提交（必填）：",
    body: "请输入详细描述（可选）：",
    footer: "请输入要关闭的issue（可选）：",
    confirmCommit: "确认要使用以上信息提交？(y/n)："
  },
  // 默认长度
  subjectLimit: 72,
  // 跳过步骤
  skipQuestions: ["body", "footer"]
};
