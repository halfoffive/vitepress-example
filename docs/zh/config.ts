// import { createRequire } from 'module'
import { defineAdditionalConfig} from 'vitepress';
// const require = createRequire(import.meta.url)
// const pkg = require('vitepress/package.json')

export default defineAdditionalConfig({
    // 语言
    lang: 'zh-Hans',
    title: "Vitepress 例子",
    titleTemplate: 'Vitepress 例子',
    description: "一个由 VitePress 驱动的网站",

    themeConfig: {
        // 上栏
        nav: [
            { text: '主页', link: '/zh' },
            { text: '例子', link: '/zh/markdown-examples' }
        ],

        // 侧边栏
        sidebar: [
            {
                text: '例子',
                items: [
                    { text: 'Markdown 例子', link: '/zh/markdown-examples' },
                    { text: '运行时 API 例子', link: '/zh/api-examples' }
                ]
            }
        ],

        editLink: {
            pattern: 'https://github.com/halfoffive/vitepress-example/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },

        footer: {
            message: '基于 Apache 许可发布',
            copyright: '版权所有 © 2026-至今 author'
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于'
        },

        notFound: {
            title: '页面未找到',
            quote:
                '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
            linkLabel: '前往首页',
            linkText: '带我回首页'
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        skipToContentLabel: '跳转到内容',

        // 搜索
        search: {
            provider: 'local',
            options: {
                locales: {
                    // 本地化
                    root: { // 如果你想翻译默认语言，请将此处设为 `root`
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
        },
    },
})


