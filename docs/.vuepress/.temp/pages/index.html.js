export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "heroImage": "/logo.png",
    "heroText": "hello",
    "tagline": "hello",
    "actionText": "快速上手 →",
    "actionLink": "/guide/introduce",
    "features": [
      {
        "title": 1,
        "details": 1
      },
      {
        "title": 2,
        "details": 2
      },
      {
        "title": 3,
        "details": 3
      }
    ],
    "footer": "MIT Licensed | Copyright © 2021-present"
  },
  "excerpt": "",
  "headers": [],
  "git": {},
  "filePathRelative": "README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
