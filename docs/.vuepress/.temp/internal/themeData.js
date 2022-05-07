export const themeData = {
  "navbar": [
    {
      "text": "首页",
      "link": "/"
    },
    {
      "text": "指南",
      "link": "/guide/introduce"
    },
    {
      "text": "组件",
      "link": "/components/basic/button"
    }
  ],
  "sidebarDepth": 0,
  "sidebar": {
    "/guide/": [
      {
        "text": "指南",
        "children": [
          "/guide/introduce",
          "/guide/install"
        ]
      }
    ],
    "/components/": [
      {
        "text": "基础组件",
        "children": [
          "/components/basic/button",
          "/components/basic/icon",
          "/components/basic/layout",
          "/components/basic/alert"
        ]
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "logo": null,
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
