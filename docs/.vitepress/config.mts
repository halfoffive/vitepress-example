import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 语言
  lang: 'en-US',
  title: "Vitepress example",
  titleTemplate: 'Vitepress example',
  description: "A VitePress Site",

  // 最后更新时间
  lastUpdated: true,

  themeConfig: {

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    // 图标
    /*socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ]*/

    // 页脚
    footer: {
      message: 'Released under the Apache License.',
      copyright: 'Copyright © 2026-present author'
    },

    // 搜索
    /*
    search: {
      provider: 'local',
      options: {
        locales: {
          // 本地化

          zh: { // 如果你想翻译默认语言，请将此处设为 `root`
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        }
      }
    },*/
  },
  // 国际化
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      dir: 'ltr',
    },
    zh: {
      label: '简体中文',
      lang: 'zh-Hans',
      dir: 'ltr',
    },

  },
})
