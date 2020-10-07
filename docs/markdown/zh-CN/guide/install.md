# 安装

---

## 使用 npm 安装

推荐使用 npm 的方式进行开发。通过 npm 安装的模块包，我们可以轻松的使用 import 或者 require 的方式引用

```bash
npm install lin-view-ui --save
```

## CDN

目前可以通过 [unpkg.com/lin-view-ui](https://unpkg.com/browse/lin-view-ui/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

### 全量引入

```javascript
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/browse/lin-view-ui/lib/style.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/browse/lin-view-ui/lib/index.js"></script>
```

### 按需引入

```javascript
<!-- 引入Button组件样式 -->
<link rel="stylesheet" href="https://unpkg.com/browse/lin-view-ui/lib/Button/style.css">
<!-- 引入Button组件 -->
<script src="https://unpkg.com/browse/lin-view-ui/lib/Button/index.js"></script>
```

我们建议使用 CDN 引入 lin-view-ui 的用户在链接地址上锁定版本，以免将来 lin-view-ui 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com/)。
